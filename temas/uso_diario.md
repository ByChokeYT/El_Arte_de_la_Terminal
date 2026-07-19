# De uso diario

- En Bash, se usa **Tab** para completar los argumentos o lista todos los comandos disponibles y **ctrl-r** para buscar a través del historial de comandos (despues de presionar, escribe la búsqueda, presiona **ctrl-r** repetidamente para hacer un ciclo a través de más coincidencias, presiona **Enter** para ejecurar el comando encontrado, o presiona la flecha derecha para poner el resultado en la línea actual y editar).

- En Bash, se usa **ctrl-w** para borrar la última palabra, y **ctrl-u** para borrar todo hacia atrás hasta el inicio de la línea. Se usa **alt-b** y **alt-f** para moverse entre palabras, **ctrl-a** para mover el cursor al principio de la línea,  **ctrl-e** para mover el cursor al final de la línea,  **ctrl-k** para eliminar hasta el final de la línea, **ctrl-l** para limpiar la pantalla. Ver `man readline` para todos los atajos de teclado por defecto en Bash. Son una gran cantidad. Por ejemplo **alt-.** realiza un ciclo a través de los comandos previos, y **alt-*** expande un glob.

- Alternativamente, si amas los atajos de teclado vi-style, usa `set -o vi`. (y `set -o emacs` para regresar a la anterior).

- Para editar largos comandos, después de configurar to editor (por ejemplo `export EDITOR=vim`), **ctrl-x** **ctrl-e** se abrirá el comando actual en un editor para editar multiples líneas. O en estilo vi, **escape-v**.

- Para ver los últimos comandos, `history`. También existen abreviaciones, tales como, `!$` (último argumento) y `!!` último comando, aunque son fácilmente remplazados con **ctrl-r** y **alt-.**.

- Para volver al directorio principal con `cd`. Accede a los archivos relativos a tu directorio principal con el prefijo `~` (ej. `~/.bashrc`). En scripts refiérete al directorio principal con `$HOME`.

- Para volver al directorio de trabajo previo: `cd -`.

- Si estás a medio camino al escribir un comando pero cambias de opinión, presiona **alt-#** para agregar un `#` al principio y lo agrega como comentario (o usa **ctrl-a**, **#**, **enter**). Luego puedes regresar a este vía comando `history`.

- Usa `xargs` (o `parallel`). Es muy poderoso. Ten en cuenta que puedes controlar cuántos elementos son ejecutados por línea (`-L`), así como el paralelismo (`-P`). Si no estas seguro de que este haga la cosa correcta, usa `xargs echo` primero. También, `-I{}` es útil. Ejemplos:
```bash
      find . -name '*.py' | xargs grep some_function
      cat hosts | xargs -I{} ssh root@{} hostname
```

- `pstree -p` es útil para mostrar el árbol de procesos.

- Usa `pgrep` y `pkill` para encontrar o señalar procesos por su nombre (`-f` es de mucha ayuda).

- Conoce las señales que puedes enviar a los procesos. Por ejemplo, para suspender un proceso usa `kill -STOP [pid]`. Con `man 7 signal` puedes ver la lista completa

- Usa `nohup` o `disown` si quieres que un proceso de fondo se mantenga corriendo para siempre.

- Verifica que procesos están escuchando vía `netstat -lntp` o `ss -plat` (para TCP; agrega `-u` para UDP).

- Consulta también `lsof` para abrir sockets y archivos.

- Consulta `uptime` o `w` para conocer cuánto tiempo el sistema ha estado corriendo.

- Usa `alias` para crear atajos para comandos comúnmente usados. Por ejemplo, `alias ll="ls -latr"` crea el alias `ll`

- En Bash scripts, usa `set -x` (o sus variantes `set -v`, que registra las entradas sin procesar, incluyendo variables sin expandir y comentarios) para depurar la salida. Usa el modo estricto a menos que tengas una buena razón para no hacerlo: Usa `set -e` para abortar en caso de errores (códigos de salida distintos a cero). Usa `set -u` para detectar uso de variables no definidas. Considera `set -o pipefail` también para los errores con pipes (estudiar más sobre esto como un tema delicado). Para scripts más complejos, usa también `trap` en EXIT o ERR. Un hábito útil es comenzar un script como este, el cual detectará y abortará con errores comunes e imprimirá un mensaje:
```bash
    set -euo pipefail
    trap "echo 'error: Falló del Script: ver arriba comando que falló'" ERR
```

- En Bash scripts, subshells (escritos con paréntesis) son maneras convenientes para agrupar los comandos. Un ejemplo común es temporalmente moverse hacia un directorio de trabajo diferente, Ej.
```bash
      # do something in current dir
      (cd /some/other/dir && other-command)
      # continue in original dir
```

- En Bash, considera que hay muchas formas de expansión de variables. Verificar la existencia de una variable: `${name:?error message}`. Por ejemplo, si un script Bash requiere un único argumento, solo escribe `input_file=${1:?usage: $0 input_file}`. Expansión aritmética: `i=$(( (i + 1) % 5 ))`. Secuencias: `{1..10}`. Reducción de cadenas de texto: `${var%suffix}` y `${var#prefix}`. Por ejemplo si `var=foo.pdf`, entonces `echo ${var%.pdf}.txt` imprime `foo.txt`.

- Utilizando la expansión de corchetes `{`...`}` puede reducir el tener que retipear un texto similar y automatizar combinaciones de elementos. Esto es útil en ejemplos como `mv foo.{txt,pdf} some-dir` (el cual mueve ambos archivos), `cp somefile{,.bak}` (el cual se expandirá a `cp somefile somefile.bak`) o `mkdir -p test-{a,b,c}/subtest-{1,2,3}` (el cual se expandirá en todas las posibles combinaciones y creará un árbol de directorios).

- La salida de un comando puede ser tratado como un archivo por medio de `<(some command)`. Por ejemplo, comparar el `/etc/hosts` local con uno remoto:
```sh
      diff /etc/hosts <(ssh somehost cat /etc/hosts)
```

- Conocer acerca de "here documents" en Bash, como también de `cat <<EOF ...`.

- En Bash, redirecciona ambas la salida estándar y el error estándar, mediante: `some-command >logfile 2>&1` o `some-command &>logfile`. Frecuentemente, para garantizar que un comando no haya dejado abierto un archivo para controlar la entrada estándar vinculada al terminal en el que te encuentras y también como buena práctica puedes agregar `</dev/null`.

- Usa `man ascii` para una buena tabla ASCII con valores hexadecimal y decimales. Para información de codificación general, `man unicode`, `man utf-8`, y `man latin1` son de utilidad.

- Usa `screen` o [`tmux`](https://tmux.github.io/) para multiplexar la pantalla, especialmente útil en sesiones ssh remotas y para desconectar y reconectar a una sesión. `byobu` puede mejorar la pantalla o tmux proporcionando mayor información y gestión más sencilla. Una alternativa más minimalista para persistencia de la sesión solo sería `dtach`.

- En ssh, saber cómo hacer un port tunnel con `-L` o `-D` (y de vez en cuando `-R`) es útil, Ej. para acceder a sitios web desde un servidor remoto.

- Puede ser útil hacer algunas optimizaciones a su configuración ssh; por ejemplo, `~/.ssh/config`, contiene la configuración para evitar desconexiones en ciertos entornos de red, utiliza compresión (la cual es útil con scp sobre conexiones con un bajo ancho de banda), y la multiplexión de canales para el mismo servidor con un archivo de control local:
```
      TCPKeepAlive=yes
      ServerAliveInterval=15
      ServerAliveCountMax=6
      Compression=yes
      ControlMaster auto
      ControlPath /tmp/%r@%h:%p
      ControlPersist yes
```

- Algunas otras opciones relevantes a ssh son sensibles en cuanto a seguridad y deben ser usadas con cuidado, Ej. por subnet, host o en redes confiables: `StrictHostKeyChecking=no`, `ForwardAgent=yes`.

- Considera [`mosh`](https://mosh.org/) una alternativa para ssh que utiliza UDP, evitando conexiones caidas y agregando conveniencia en el camino. (require configuración del lado del servidor).

- Para obtener permiso sobre un archivo en forma octal, el cual es útil para la configuración del sistema pero no está disponible con `ls` y fácil de estropear, usa algo como
```sh
      stat -c '%A %a %n' /etc/timezone
```

- Para selección interactiva de valores desde la salida de otro comando, usa [`percol`](https://github.com/mooz/percol) o [`fzf`](https://github.com/junegunn/fzf).

- Para la interacción con archivos basados en la salida de otro comando (como `git`), use `fpp` ([PathPicker](https://github.com/facebook/PathPicker)).

- Para un servidor web sencillo para todos los archivos en el directorio actual (y subdirectorios), disponible para cualquiera en tu red, usa:
`python -m SimpleHTTPServer 7777` (para el puerto 7777 y Python 2) y `python -m http.server 7777` (para 7777 y Python 3).

- Para ejecutar un comando con privilegios, usando `sudo` (para root) o `sudo -u` (para otro usuario). Usa `su` o `sudo bash` para realmente ejecutar un shell como este usuario. Usa `su -` para simular un login fresco como root u otro usuario.

### Productividad Avanzada del Shell e Integración con `fzf`

- **Configuración Avanzada de `fzf`**: Puedes configurar tu terminal para que la búsqueda en el historial de comandos mediante **Ctrl+R** se vuelva interactiva e instantánea usando `fzf` y su módulo de integración en el shell.
  * También puedes usar `fzf` para seleccionar y moverte entre directorios de forma inteligente. Agrega esta función a tu archivo `.bashrc` o `.zshrc` para navegar directorios rápidamente:
    ```sh
    # 'fd' navega interactivamente por los directorios usando fzf y cambia al seleccionado
    fcd() {
      local dir
      dir=$(find ${1:-.} -path '*/.*' -prune -o -type d -print 2> /dev/null | fzf +m) && cd "$dir"
    }
    ```
- **Plugins Modernos de Productividad**: Si usas Zsh, puedes ser un "crack" instalando plugins esenciales que aumentan tu velocidad de escritura en el shell exponencialmente:
  * **zsh-autosuggestions**: Sugiere comandos de forma tenue basados en tu historial a medida que escribes; presiona la flecha derecha para autocompletar.
  * **zsh-syntax-highlighting**: Colorea los comandos en tiempo real, mostrándolos en verde si existen y son válidos, o en rojo si hay algún error de tipografía antes de presionar Enter.

### Manipulación Avanzada de Cadenas (Strings) y Arrays en Bash

Cuando estás escribiendo scripts o procesando variables directamente en la terminal, conocer la manipulación nativa de parámetros te permite resolver tareas sin invocar herramientas externas lentas como `sed` o `awk`:

- **Subcadenas (Slicing)**: Extrae partes de un string mediante la sintaxis `${variable:offset:longitud}`:
  ```sh
  # Extrae los primeros 4 caracteres
  fecha="20260719"
  echo ${fecha:0:4} # Imprime: 2026
  ```
- **Búsqueda y Reemplazo Nativo**: Reemplaza subcadenas directamente usando `${variable/patron/reemplazo}`:
  ```sh
  # Reemplaza la primera coincidencia
  archivo="proyecto_final_v1.txt"
  echo ${archivo/v1/v2} # Imprime: proyecto_final_v2.txt
  # Reemplaza todas las coincidencias usando doble barra
  ruta="js/app.js/js/quiz.js"
  echo ${ruta//js/dist} # Imprime: dist/app.js/dist/quiz.js
  ```
- **Arrays (Arreglos) Indexados**: Bash soporta colecciones de datos directamente:
  ```sh
  # Declaración
  tecnologias=("Docker" "Git" "Bash" "jq")
  # Acceso a un elemento por índice (0-indexado)
  echo ${tecnologias[1]} # Imprime: Git
  # Recorrer todos los elementos en un bucle for
  for tec in "${tecnologias[@]}"; do
    echo "Herramienta: $tec"
  done
  ```

---
[← Volver al Temario Principal](../README.md)
