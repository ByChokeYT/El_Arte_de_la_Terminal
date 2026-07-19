# Depuración del sistema

- Para depuración web, `curl` y `curl -I` son prácticos, o como sus equivalentes `wget`, o el más moderno [`httpie`](https://github.com/jkbrzt/httpie).

- Para conocer el estado del cpu/disco, las clásicas herramientas son `top` (o mejor `htop`), `iostat`, y `iotop`. Usa `iostat -mxz 15` para CPU básicas y estadísticas detalladas y visión de rendimiento por partición del disco.

- Para detalles de la conexión de red, usa `netstat` y `ss`.

- Para una rápida visión general de que esta pasando en un sistema, `dstat` es especialmente útil. Para una visión general más amplia con detalles usa [`glances`](https://github.com/nicolargo/glances).

- Para conocer el estado de la memoria, ejecuta y entiende la salida de `free` y `vmstat`. En particular, ten en cuenta que el valor "cached" es mantenido en memoria por el kernel de Linux como un archivo de cache, por lo que efectivamente cuenta como valor para "free".

- El sistema de depuración de Java es harina de otro costal, pero un truco simple en las JVM de Oracle y otros consiste en que puedes ejecutar `kill -3 <pid>` y una traza completa y un resumen del montículo "heap summary" (incluyendo el detalle de la colección de basura generacional, la cual puede ser altamente informativa) serán descargados al stderr/logs. Las herramientas `jps`, `jstat`, `jstack`, `jmap` del JDK son útiles. [SJK tools](https://github.com/aragozin/jvm-tools) son más avanzadas.

- Usa [`mtr`](http://www.bitwizard.nl/mtr/) como un mejor traceroute para identificar los problemas en la red.

- Para examinar por qué el disco está lleno, [`ncdu`](https://dev.yorhel.nl/ncdu) ahorra tiempo en comparación con los comandos usuales como `du -sh *`.

- Para encontrar cual socket o proceso está utilizando el ancho de banda, prueba [`iftop`](http://www.ex-parrot.com/~pdw/iftop/) o [`nethogs`](https://github.com/raboof/nethogs).

- La herramienta `ab` (viene con Apache) es útil para una verificación rápida del rendimiento de un servidor web. Para pruebas de carga más complejas prueba `siege`.

- Para una depuración mas seria de redes, [`wireshark`](https://wireshark.org/), [`tshark`](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstshark.html), o [`ngrep`](http://ngrep.sourceforge.net/).

- Conoce acerca de `strace` y `ltrace`. Estas puede ser de utilidad si un programa está fallando, suspendido, o colgado, y no sabe por qué, o si quieres tener una idea general del rendimiento. Considera la opción de elaboración de perfiles (`-c`), y la habilidad de adjuntar a un proceso en ejecución (`-p`).

- Conoce acerca `ldd` para verificar librerías compartidas etc.

- Conoce como conectarse a un proceso en ejecución con `gdb` y obtener su traza de pilas.

- Usa `/proc`. Es extraordinariamente útil algunas veces cuando se depuran problemas en vivo. Ejemplos: `/proc/cpuinfo`, `/proc/xxx/cwd`, `/proc/meminfo`, `/proc/cmdline`, `/proc/xxx/exe`, `/proc/xxx/fd/`, `/proc/xxx/smaps` (donde `xxx` es el id o pid del proceso).

- Cuando se depura porque algo salió mal en el pasado, [`sar`](http://sebastien.godard.pagesperso-orange.fr/) puede ser muy útil. Este muestra la estadística histórica en CPU, memoria, red, etc.

- Para sistemas y análisis de rendimiento de mayor profundidad, examina `stap` ([SystemTap](https://sourceware.org/systemtap/wiki)), [`perf`](https://en.wikipedia.org/wiki/Perf_(Linux)), y [`sysdig`](https://github.com/draios/sysdig).

- Comprueba en que OS se encuentra con `uname` o `uname -a` (información general en Unix/kernel) o `lsb_release -a` (información en Linux distro).

- Usa `dmesg` siempre que algo actúe raro (esto podría ser problemas con el hardware o driver).

### Diagnóstico de APIs y Latencia de Red con `curl`

Para depurar APIs y servidores web de forma detallada, `curl` posee opciones de diagnóstico de red avanzadas usando la opción de formateo de salida `-w` (`--write-out`):

- **Medición de Latencias de Red**: Puedes aislar el tiempo exacto que tarda cada fase de una conexión HTTP/S (resolución DNS, handshake TCP, negociación SSL/TLS, latencia del servidor y tiempo de transferencia):
  ```sh
  curl -s -o /dev/null -w "\
  DNS: %{time_namelookup}s\n\
  TCP Connect: %{time_connect}s\n\
  SSL Handshake: %{time_appconnect}s\n\
  TTFB (Time to First Byte): %{time_starttransfer}s\n\
  Total Time: %{time_total}s\n" \
  https://httpbin.org/delay/1
  ```
- **Reanudación de Descargas Interrumpidas**: Si estás descargando un archivo pesado y la conexión falla, no empieces de nuevo; dile a `curl` que reanude desde donde se quedó:
  ```sh
  curl -C - -O https://releases.ubuntu.com/24.04/ubuntu-24.04-desktop-amd64.iso
  ```

---
[← Volver al Temario Principal](../README.md)
