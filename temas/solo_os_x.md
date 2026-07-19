# Solo para OS X

Estos son puntos relevantes *únicamente* para OS X.

- Administración de paquetes con `brew` (Homebrew) y/o `port` (MacPorts). Estos pueden ser utilizados para instalar en OS X muchos de los comandos de arriba.

- Copie la salida de cualquier comando en una aplicación de escritorio con `pbcopy` y pegue una entrada con `pbpaste`.

- Para activar la tecla Option en un OS X Terminal como una tecla alt (tal como se usan en los comandos más arriba como  **alt-b**, **alt-f**, etc.), abre Preferencias -> Perfiles -> Teclado y selecciona "Usa Option como tecla Meta".

- Para abrir un archivo con una aplicación de escritorio, use `open` o `open -a /Applications/Whatever.app`.

- Spotlight: Busque archivos con `mdfind` y liste metadata (tal como información de foto EXIF) con `mdls`.

- Ten en cuenta que OS X está basado en BSD Unix, y muchos comandos (por ejemplo `ps`, `ls`, `tail`, `awk`, `sed`) tiene sutiles variaciones en comparación con Linux, que está en gran parte influenciado por el sistema Unix V-style y herramientas GNU. Comunmente se puede diferenciar al notar que una página man tienen el encabezado "BSD General Commands Manual." En algunos casos versiones GNU pueden ser instaladas también (tales como `gawk` y `gsed` para GNU awk y sed). Si escribe Bash scripts multiplataforma, evite tales comandos (por ejemplo, considere Python o `perl`) o prueba cuidadosamente.

- Para obtener la información de la versión del OS X, usa `sw_vers`.

---
[← Volver al Temario Principal](../README.md)
