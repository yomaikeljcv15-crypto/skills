# Sazón Pro — Reglas de datos e Informe detallado por cliente

> **Para Claude (o cualquiera que toque el código o la base de datos de Sazón Pro):**
> lee este archivo COMPLETO antes de cambiar cualquier cosa de sincronización, guardado,
> ventas, pedidos, fiados, clientes o informes. Estas reglas existen porque el 26-oct-2026
> se perdieron datos reales de un negocio. No son sugerencias.

---

## 1. Qué pasó el 26-oct-2026 (para no repetirlo)

Proyecto Supabase: `gqsdnhsvpconhlvttdnf` · Negocio afectado: `YOM-MZXHSX` · App: v35.6

1. Desde las **12:44 hasta las 21:51 UTC**, la RPC `obtener_datos_negocio` respondía **404** en
   cada llamada (la función no coincidía con los parámetros que mandaba la app).
2. `guardar_datos_negocio` exige la versión base de la nube (`p_base_actualizado`). Sin poder leer
   la nube, cada subida terminaba en `conflicto` → la app intentaba bajar la nube para fusionar →
   404 → la subida fallaba. **Todo lo hecho en esas 9 horas quedó solo en el teléfono.**
3. A las 21:51 se corrigió la lectura. La app tomó la copia de la nube (la de la mañana)
   en vez de **fusionarla** con la del teléfono, y a las 22:01 la subió.
   **Resultado:** se perdieron recetas nuevas (p. ej. "Helado de chocolate"), ingredientes nuevos,
   la venta de una olla, ventas directas y al menos un pedido con delivery (`1b40dd6d`, 17:22 UTC).
4. La nube **no tenía historial**: solo un respaldo diario (`datos_respaldos`, 07:10 UTC).
   **No hubo forma de recuperar nada.**

Problemas relacionados que se encontraron:
- **"El pepe"**: un pedido de prueba hecho desde el menú en incógnito y luego cancelado igual
  dejó al cliente en `clientesMenu`. Además, `guardar_datos_negocio` **vuelve a agregar**
  cualquier cliente que esté en la nube y no venga en lo que manda la app, así que el dueño
  **no lo podía borrar**.
- **"Venta directa de 3 brownies"**: no existe. Es el pedido del menú `c642095e`
  (un cliente real, fiado de $6). El informe lo contaba **otra vez** como venta directa.
  Mismo dinero contado dos veces.

---

## 2. Reglas que NO se rompen (datos)

### R1 — Nunca reemplazar datos locales por los de la nube sin fusionar
- Si el teléfono tiene cambios sin subir (`sazonpro_sin_subir_<code>`) **o** su marca local es
  más nueva, **siempre fusionar** (`fusionarDatosNegocio`). Nunca `datos = datosNube`.
- Si la marca `sin_subir` **no existe** (usuarios que vienen de versiones viejas), tratarlo
  como "puede haber cambios": **fusionar**, no adoptar.
- La fusión **nunca borra** un elemento solo porque falte en un lado: lo borra únicamente si su id
  estaba en `_idsBase` (la última versión sincronizada) y el otro lado lo quitó a propósito.

### R2 — Antes de reemplazar algo, guardar una copia
- Antes de cualquier `datos = ...` que venga de la nube, de una fusión o de una importación:
  guardar la versión anterior en IndexedDB (`sazonpro_copias`, clave
  `previo_<code>_<timestamp>`) y conservar las últimas 20.
- En **Perfil → Respaldo**, agregar el botón **"Recuperar una versión anterior de este teléfono"**.

### R3 — Si la nube falla, se dice en pantalla
- Si `obtener_datos_negocio` o `guardar_datos_negocio` fallan (404, 500, `conflicto` sin resolver,
  `no autorizado`), se muestra el aviso fijo `avisoSync` en rojo: **"Tus cambios NO están en la
  nube. No borres la app ni cierres sesión."** Nunca un toast que desaparece.
- **Prohibido** decirle al usuario "cierra sesión", "borra caché", "reinstala" o "formatea"
  mientras haya cambios sin subir. Primero se sube o se exporta un `.json`.

### R4 — Cambios de RPC = compatibles hacia atrás
- No se cambian los parámetros de una RPC que la app ya usa. Se crea la nueva y se deja la vieja
  funcionando hasta que todas las versiones de la app hayan migrado.
- Después de tocar una RPC, probarla **con la app real** (no solo con SQL). Un 404 en
  `/rest/v1/rpc/...` significa que la firma no coincide.

### R5 — Historial en el servidor en cada guardado
- Trigger `trg_historial_datos_clientes` (BEFORE UPDATE en `datos_clientes`): copia la versión
  **anterior** a `datos_historial`. Se conservan las últimas 300 por negocio y todo lo de 7 días.
  (SQL en la sección 5.)
- Para recuperar: `select id, version, actualizado, guardado_en from datos_historial where code = '<code>' order by id desc;`
  y luego restaurar **fusionando**, nunca pisando lo que haya hoy.

### R6 — Antes de borrar o corregir datos de un negocio (soporte)
1. Copia en `datos_respaldos` (o `datos_historial`) **en la misma transacción**.
2. Borrar **todo el rastro**, no solo una parte. Para un pedido del menú:
   `datos.pedidos`, `pagosPedidosMenu`, `ventasMenuRegistradas`, `ventasMenuReparadas`, fiados con
   ese `pedidoMenuIds`, facturas ligadas, `fidelidad_sellos`, `delivery_links`, `delivery_ubicacion`,
   `delivery_mensajes` y los contadores de `lotes_entrega_menu`.
3. Verificar con un `select` que no quedó nada y decírselo al dueño.

### R7 — Clientes de prueba / pedidos cancelados
- Un pedido **cancelado** no deja al cliente registrado si ese cliente no tiene otros pedidos
  activos o entregados.
- `guardar_datos_negocio` **no debe volver a agregar** a un cliente que el dueño borró. Usar una
  lista `clientesMenuBorrados` (teléfonos) que el servidor respete.

### R8 — Una venta se cuenta UNA sola vez
- Cada venta tiene un único origen: `directa`, `menu`, `fiado`, `comanda` o `catalogo`.
- Un pedido del menú que se convierte en factura o fiado **es la misma venta**: se enlaza por
  `pedidoMenuIds` / `facturaId` y en el informe aparece **una vez**, con todos sus orígenes indicados.
- Prohibido sumar `pedidos` + `facturas` + `fiados` sin quitar los duplicados por esos enlaces.

---

## 3. Informe detallado por cliente (lo que pidió el dueño)

### 3.1 Qué se guarda en CADA venta, venga de donde venga
Toda venta (directa, menú, fiado, comanda, catálogo) guarda un bloque `cliente` **completo y
congelado en el momento de la venta** (si el cliente cambia después sus datos, la venta conserva
los que tenía ese día):

| Campo | Obligatorio | Nota |
|---|---|---|
| `nombre` | sí | |
| `apellido` | sí (puede ir vacío solo si el cliente se niega) | hoy el menú lo deja en `null`: pedirlo |
| `telefono` | sí | normalizado (58…) para cruzar con fidelidad/wallet |
| `cedula` | recomendado | |
| `direccion` / `lugarEntrega` | si hay entrega | texto + link de Google Maps si existe |
| `ubicacion` | si hay | `{lat, lng}` |

Y además, por venta:
- `id`, `folio`, `origen` (directa / menu / fiado / comanda / catalogo), `pedidoMenuId` si aplica.
- `creadoEn` (fecha **y hora** exacta) y quién la registró (dueño, empleado, cliente por menú).
- `items`: producto, cantidad, precio unitario, subtotal.
- Total en USD y en Bs, con la tasa usada.
- Método de pago, referencia, captura si existe, estado (pagado / pendiente / fiado / cancelado).
- Delivery: repartidor, horas (asignado, recogido, en camino, entregado) y si el cliente confirmó.
- Venta directa sin cliente identificado: se permite **solo** marcando "Cliente de mostrador"
  explícitamente. Nunca venta sin cliente por defecto.

### 3.2 Pantalla en Informes
**Lista "Ventas por cliente"** (filtros: hoy / semana / mes / rango; búsqueda por nombre, teléfono
o cédula; filtro por origen y estado):

```
Nombre Apellido · 0412-0000000                      22-oct 11:53 a. m.
3 × Brownies · $6,00 · Menú → Fiado (vence 06-nov) · Lugar de entrega
```

**Al tocar una venta → ficha completa / factura:**
- Datos del cliente (nombre, apellido, teléfono, cédula), con botones **Llamar** y **WhatsApp**.
- Fecha y hora de la venta, del pago y de la entrega.
- Lugar de entrega + mapa.
- Productos, cantidades, precios, total en USD y Bs, tasa.
- Pago: método, referencia, captura (ver imagen), abonos si es fiado.
- Recorrido del delivery (línea de tiempo) y chat con el repartidor si lo hubo.
- Botón **Ver factura** (PDF / compartir) y **Historial del cliente** (todas sus compras).
- Si la venta fue anulada o corregida: quién, cuándo y por qué (no se borra en silencio).

**Al tocar un cliente → historial del cliente:** todas sus compras, total gastado, deuda de
fiado, sellos de fidelidad y último pedido.

### 3.3 Para qué sirve (la regla de negocio)
El dueño debe poder confirmar **en segundos** si un pedido salió hacia donde no correspondía:
quién lo pidió, qué llevó, a qué hora, a dónde fue y quién lo entregó. Si un dato falta,
la ficha dice **"dato no registrado"**; nunca inventa ni rellena con otro cliente.

---

## 4. Lista de pruebas antes de publicar cualquier versión que toque datos
- [ ] Teléfono sin internet → hago 3 cambios → la nube recibe un pedido del menú →
      vuelvo a tener internet → **están los 3 cambios Y el pedido.**
- [ ] `obtener_datos_negocio` devuelve error → aparece el aviso rojo fijo y no se pierde nada.
- [ ] Actualizar desde la versión anterior **con cambios sin subir** → no se pierde nada.
- [ ] Dos teléfonos editan a la vez → ambos cambios quedan.
- [ ] Pedido de prueba en incógnito + cancelado → el cliente **no** queda registrado.
- [ ] Borro un cliente → no vuelve a aparecer.
- [ ] Pedido del menú convertido en fiado → en el informe aparece **una sola vez**.
- [ ] Cada venta del informe abre su ficha con nombre, apellido, teléfono, hora, lugar y productos.
- [ ] `datos_historial` recibe una fila nueva en cada guardado.

---

## 5. Pendiente en la base de datos (aprobado por el dueño el 26-oct-2026)

Estos cambios están **autorizados** por el dueño. Se intentaron aplicar desde Claude pero la
confirmación de Supabase no llegó a mostrarse. Se pueden pegar en **Supabase → SQL Editor**.

### 5.1 Historial en cada guardado (regla R5)
```sql
create table if not exists public.datos_historial (
  id bigint generated always as identity primary key,
  code text not null,
  version bigint,
  actualizado timestamp without time zone,
  datos jsonb not null,
  guardado_en timestamptz not null default now()
);
create index if not exists datos_historial_code_id on public.datos_historial (code, id desc);
alter table public.datos_historial enable row level security;
revoke all on public.datos_historial from anon, authenticated;

create or replace function public._historial_datos_clientes()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if old.datos is distinct from new.datos then
    insert into public.datos_historial (code, version, actualizado, datos)
    values (old.code, old.version, old.actualizado, old.datos);
    delete from public.datos_historial h
     where h.code = old.code
       and h.guardado_en < now() - interval '7 days'
       and h.id < (select min(id) from (select id from public.datos_historial
                                         where code = old.code order by id desc limit 300) t);
  end if;
  return new;
end $$;

drop trigger if exists trg_historial_datos_clientes on public.datos_clientes;
create trigger trg_historial_datos_clientes
  before update on public.datos_clientes
  for each row execute function public._historial_datos_clientes();

insert into public.datos_historial (code, version, actualizado, datos)
select code, version, actualizado, datos from public.datos_clientes where datos is not null;
```

### 5.2 Borrar todo rastro del pedido de Helado (`722b64d8`) y del cliente de prueba "El pepe" (regla R6)
```sql
begin;
insert into datos_respaldos (code, datos, hash)
  select code, datos, md5(datos::text) from datos_clientes where code = 'YOM-MZXHSX';
update datos_clientes set
  datos = jsonb_set(
            jsonb_set(datos, '{pedidos}',
              (select coalesce(jsonb_agg(p order by o), '[]'::jsonb)
                 from jsonb_array_elements(datos->'pedidos') with ordinality t(p,o)
                where p->>'id' <> '722b64d8')),
            '{clientesMenu}',
              (select coalesce(jsonb_agg(c order by o), '[]'::jsonb)
                 from jsonb_array_elements(datos->'clientesMenu') with ordinality t(c,o)
                where c->>'nombre' <> 'El pepe')),
  actualizado = now(), version = coalesce(version, 0) + 1
where code = 'YOM-MZXHSX';
delete from fidelidad_sellos   where code = 'YOM-MZXHSX' and pedido_id = '722b64d8';
delete from delivery_mensajes  where code = 'YOM-MZXHSX' and pedido_id = '722b64d8';
delete from delivery_ubicacion where code = 'YOM-MZXHSX' and pedido_ids = array['722b64d8'];
delete from delivery_links     where code = 'YOM-MZXHSX' and pedido_ids = array['722b64d8'];
update lotes_entrega_menu
   set pedidos_actuales = greatest(pedidos_actuales - 1, 0),
       productos_actuales = greatest(productos_actuales - 1, 0)
 where id = '421775acce19';
commit;

-- Verificación: todo debe dar 0 (y el lote 6/9)
select
  (select count(*) from datos_clientes d, jsonb_array_elements(d.datos->'pedidos') p
    where d.code = 'YOM-MZXHSX' and p::text ilike '%helado%')            as helado_restante,
  (select count(*) from datos_clientes d, jsonb_array_elements(d.datos->'clientesMenu') c
    where d.code = 'YOM-MZXHSX' and c->>'nombre' ilike '%pepe%')          as pepe_restante,
  (select count(*) from fidelidad_sellos where pedido_id = '722b64d8')    as sellos,
  (select count(*) from delivery_links where '722b64d8' = any(pedido_ids)) as links,
  (select pedidos_actuales || '/' || productos_actuales
     from lotes_entrega_menu where id = '421775acce19')                    as lote;
```
> Importante: antes de correr 5.2, abrir la app con internet y esperar a que diga que todo
> está sincronizado. Después de correrlo, cerrar y volver a abrir la app **antes de hacer
> cambios**, para que el teléfono tome la versión sin el helado ni "El pepe" (si el teléfono
> tenía cambios sin subir, la fusión podría devolver a "El pepe" por la regla R7 aún no
> implementada).

---

## 6. Pendiente en el código de la app (`index.html`, v35.6 → v35.7)
1. R1 + R2 + R3 en `cargarDatosCliente` / `sincronizarConNube` / `_subirANube`.
2. R7 en `crear_pedido_menu` (cliente solo al confirmar) y `guardar_datos_negocio` (respetar borrados).
3. R8 + sección 3 completa: "Ventas por cliente" en Informes, con ficha de la venta.
4. Pedir **apellido** en el menú público (hoy llega `null`).
5. Pasar la lista de pruebas de la sección 4 antes de publicar.
