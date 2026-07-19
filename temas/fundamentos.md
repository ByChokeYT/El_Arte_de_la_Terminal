# Fundamentos

- Aprende conocimientos básicos de Bash, de hecho, escribe `man bash` y al menos échale un vistazo a todo el asunto. Es bastante fácil de seguir y no es tan largo. Alternar entre shells puede ser agradable, pero Bash es poderoso y siempre está disponible (conocer *solo* zsh, fish, etc., aunque resulte tentador en tu propia laptop, Te restringe en muchas situaciones, tales como el uso de servidores existentes).

- Aprende bien al menos un editor de texto, idealmente Vim (`vi`), como no hay realmente una competencia para la edición aleatoria en un terminal (incluso si usa Emacs, un gran IDE, o un editor alternativo (hipster) moderno la mayor parte del tiempo).

- Conoce como leer la documentación con `man` (Para curiosos, `man man` lista las secciones enumeradas, ej. 1 es comandos "regulares", 5 son archivos/convenciones, y 8 para administración). Encuentra las páginas de man `apropos`. Sepa que alguno de los comandos no son ejecutables, pero son Bash builtins, y que puedes obtener ayuda sobre ellos con `help` y `help -d`.

- Aprende sobre redirección de salida `>`, entrada `<` y pipes utilizando `|`. Conozca que `>` sobrescribe el archivo de salida y `>>` añade. Aprende sobre stdout y stderr.
  * **Redirecciones complejas e inusuales**: Puedes abrir sockets TCP/UDP directamente desde Bash usando el descriptor virtual `/dev/tcp`. Por ejemplo, para verificar rápidamente si un puerto de red está abierto sin usar `nc` ni `telnet`:
    ```bash
    # Abre una conexión con google.com en el puerto 80 y la vincula al descriptor de archivo 3
    exec 3<>/dev/tcp/google.com/80
    # Imprimirá 0 si la conexión tuvo éxito (puerto abierto)
    echo $?
    # Cierra el descriptor de archivo
    exec 3>&-
    ```


- Aprende sobre expansión de archivos glob con `*` (y tal vez `?` y `[`...`]`) y quoting y la diferencia entre comillas dobles `"` y simples `'`. (Ver más en expansión de variables más abajo.)

- Familiarízate con la administración de trabajo en Bash: `&`, **ctrl-z**, **ctrl-c**, `jobs`, `fg`, `bg`, `kill`, etc.

- Conoce `ssh` y lo básico de autenticación sin contraseña, vía `ssh-agent`, `ssh-add`, etc.

- Administración de archivos básica: `ls` y `ls -l` (en particular, aprende el significado de cada columna en `ls -l`), `less`, `head`, `tail` y `tail -f` (o incluso mejor, `less +F`), `ln` y `ln -s` (aprene las diferencias y ventajas entre enlaces hard y soft), `chown`, `chmod`, `du` (para un resumen rápido del uso del disco: `du -hs *`). Para administración de archivos de sistema, `df`, `mount`, `fdisk`, `mkfs`, `lsblk`. Aprenda que un inode es `ls -i` or `df -i`).

- Administración básica de redes: `ip` o `ifconfig`, `dig`.

- Aprende y usa un sistema de control de versiones, por ejemplo `git`. Consejos avanzados para sacarle todo el partido a `git` desde la terminal:
  * **Visualizar el árbol completo**: Muestra un gráfico ASCII con ramas y commits:
    ```sh
    git log --graph --oneline --decorate --all
    ```
  * **Limpieza de archivos**: Elimina de forma segura todos los archivos y directorios no rastreados en tu espacio de trabajo:
    ```sh
    # Ejecuta el borrado real de archivos y carpetas
    git clean -fd
    ```
  * **Uso avanzado de stash**: Guarda temporalmente tus cambios con un comentario descriptivo:
    ```sh
    git stash save "Trabajo en progreso sobre redes"
    # Muestra los stash guardados
    git stash list
    # Recupera y aplica el stash más reciente
    git stash pop
    ```


- Conoce bien las expresiones regulares y varias opciones (flags) para `grep`/`egrep`. Las opciones `-i`, `-o`, `-v`, `-A`, `-B` y `-C` son dignas de ser recordadas.

- Aprende el uso de `apt-get`, `yum`, `dnf` o `pacman` (dependiendo de la distribución "distro") para buscar e instalar paquetes. Y asegúrate que tienes `pip` para instalar la herramienta de línea de comando basada en Python (un poco más abajo esta explicado como instalar vía `pip`).

---
[← Volver al Temario Principal](../README.md)
