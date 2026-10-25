#!/bin/bash
# uso: marca.sh entrada.mp4 salida.mp4
ffmpeg -v error -y -i "$1" -vf "drawtext=fontfile=/usr/share/fonts/opentype/inter/Inter-Bold.otf:text='@reglatrees':fontsize=30:fontcolor=white@0.6:x=w-tw-36:y=306:shadowcolor=black@0.6:shadowx=2:shadowy=2" -c:v libx264 -preset medium -crf 22 -tune animation -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$2"
