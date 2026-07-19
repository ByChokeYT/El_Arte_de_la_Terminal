# Procesamiento de archivos y datos

- Para localizar un archivo por nombre en el directorio actual, `find . -iname '*algo*'` (o similar). Para encontrar un archivo en cualquier lado por nombre, usa `locate something` (pero tenga en mente que `updatedb` quizás no haya indexado recientemente los archivos creados).

- Para búsqueda general a través de archivos fuente o de datos (más avanzado que `grep -r`), usa [`ag`](https://github.com/ggreer/the_silver_searcher).

- Para convertir HTML a texto: `lynx -dump -stdin`

- Para Markdown, HTML, y todos los tipos de conversión de documentos, prueba [`pandoc`](http://pandoc.org/).

- Si debe manipular XML, `xmlstarlet` es viejo pero bueno.

- Para JSON usa [`jq`](http://stedolan.github.io/jq/). Algunas recetas avanzadas para el día a día:
  * **Formatear/Colorear**: `cat file.json | jq .`
  * **Filtrar por campos**: Extraer solo los campos 'id' y 'nombre' de una lista: `jq '.[] | {id: .id, name: .name}' API_response.json`
  * **Búsquedas condicionales**: Filtrar elementos por condición: `jq '.[] | select(.status == "active")' usuarios.json`
  * **Modificar valores**: Incrementar una propiedad numérica en su lugar: `jq '.version += 1' package.json`


- Para YAML, usa [`shyaml`](https://github.com/0k/shyaml).

- Para archivos Excel o CSV, [csvkit](https://github.com/onyxfish/csvkit) proporciona `in2csv`, `csvcut`, `csvjoin`, `csvgrep`, etc.

- Para Amazon S3, [`s3cmd`](https://github.com/s3tools/s3cmd) es conveniente y [`s4cmd`](https://github.com/bloomreach/s4cmd) es el más rápido. [`aws`](https://github.com/aws/aws-cli) de Amazon y el mejorado [`saws`](https://github.com/donnemartin/saws) son esenciales para otras tareas relacionadas al AWS.

- Conoce acerca de `sort` y `uniq`, incluyendo las opciones de uniq `-u` y `-d` -- ver one-liners más abajo. Ver también `comm`

- Conoce acerca de `cut`, `paste` y `join` para manipular archivos de texto. Muchas personas usan `cut` pero se olvidan acerca de `join`.

- Conoce acerca de `wc` para contar saltos de línea (`-l`), caracteres (`-m`), palabras (`-w`) y bytes (`-c`).

- Conoce acerca de `tee` para copiar desde el stdin hacia un archivo y también hacia el stdout, al igual que en `ls -al | tee file.txt`.

- Conoce que la localización afecta muchas herramientas de línea de comando en forma delicada, incluyendo el ordenamiento (compaginación) y rendimiento. La mayoría de las instalaciones de Linux configuran `LANG` u otras variables de localización para la configuración local como US English. Pero ten en mente que el ordenamiento puede cambiar si cambia la localización. Y también las rutinas i18n pueden hacer que `sort` u otros comandos se ejecuten más lentamente. En algunas situaciones (tales como la realización de operaciones u operaciones singulares descritas más abajo) puedes ignorar las rutinas i18n por completo y utilizar el sort tradicional basado en bytes, usando `export LC_ALL=C`.

- Conoce los aspectos básicos de `awk` y `sed` para manejo de datos. Por ejemplo, sumar todos lo números en la tercera columna de un archivo de texto: `awk '{ x += $3 } END { print x }'`. Esto es probablemente 3 veces más rápido y 3 veces más corto que su equivalente en Python.

- Para reemplazar todas las ocurrencias de un string en su lugar, en uno o más archivos:
```sh
      perl -pi.bak -e 's/old-string/new-string/g' my-files-*.txt
```

- Para renombrar múltiples y/o buscar y reemplazar dentro de archivos, intenta [`repren`](https://github.com/jlevy/repren). (En algunos casos el comando `rename` también permite múltiples renombres, pero sea cuidadoso ya que esta funcionalidad no es igual en todas las distribuciones de Linux.)
```sh
      # Renombramiento completo de archivos, carpetas y contenidos foo -> bar:
      repren --full --preserve-case --from foo --to bar .
      # Recuperar archivos de respaldo cualquiera.bak -> cualquiera:
      repren --renames --from '.*)\.bak' --to '\1' *.bak
      # Igual que arriba, utilizando rename, si esta disponible:
      rename 's/\.bak$//' *.bak
```

- Como dice la página de man, `rsync` es una muy rápida y extraordinariamente versatil herramienta de copiado. Esta se conoce por la sincronización entre máquinas pero es igualmente útil localmente. Esta también se encuentra entre las [formas más rápidas](https://web.archive.org/web/20130929001850/http://linuxnote.net/jianingy/en/linux/a-fast-way-to-remove-huge-number-of-files.html) para borrar un gran número de archivos:
```sh
mkdir empty && rsync -r --delete empty/ some-dir && rmdir some-dir
```

- Usa `shuf` para mezclar o seleccionar líneas aleatorias de un archivo.

- Conoce las opciones de `sort`. Para números, usa `-n`, o `-h` para manipulación de números humanamente leíbles (Ej. desde `du -h`). Conoce el trabajo principal de (`-t` y `-k`). En particular, esta atento que lo necesitas  escribir`-k1,1` para ordenar por solo el primer campo; `-k1` significa ordenar de acuerdo a toda la línea. Orden estable (`sort -s`) puede ser útil. Por ejemplo, para organizar el primer por el campo 2, entonces secundariamente hacerlo por el campo 1, Puedes usar `sort -k1,1 | sort -s -k2,2`.

- Si alguna vez necesitas escribir un tab literal en una línea de comandos en Bash (Ej. para el argumento -t de ordenar), presiona **ctrl-v** **[Tab]** o escribe `$'\t'` (El último es mejor porque puedes copiarlo/pegarlo).

- Las herramientas estándar para reparar el código fuente son `diff` y `patch`. Consulta también `diffstat` para resumen estadístico de una diff y `sdiff` para un diff puesto lado a lado. Considera `diff -r` para trabajar con directorios por completo. Usa `diff -r tree1 tree2 | diffstat` para el resumen de cambios. Usa `vimdiff` para comparar y editar archivos.

- Para archivos binarios, usa `hd`, `hexdump` o `xxd` para volcados hexadecimales simples y `bvi` o `biew` para edición binaria.

- También para archivos binarios, `strings` (además de `grep`, etc.) permite encontrar fragmentos de texto.

- Para diffs binarias (compresión delta), usa `xdelta3`.

- Para convertir la codificación del texto, prueba `iconv`. O `uconv` para uso más avanzado; este soporta algunos elementos Unicode avanzados. Por ejemplo, este comando coloca en minúsculas y remueve todos los acentos (por su expansión y colocándolos):
```sh
      uconv -f utf-8 -t utf-8 -x '::Any-Lower; ::Any-NFD; [:Nonspacing Mark:] >; ::Any-NFC; ' < input.txt > output.txt
```

- Para dividir archivos en múltiples partes, consulta `split` (para dividir por tamaño) y `csplit` (para dividir por un patrón).

- Para manipular expresiones de fecha y tiempo, usa `dateadd`, `datediff`, `strptime` etc. de [`dateutils`](http://www.fresse.org/dateutils/).

- Usa `zless`, `zmore`, `zcat`, y `zgrep` para operar sobre archivos comprimidos.

- **Paralelización y multiprocesamiento**: Para procesar grandes conjuntos de datos de manera ultra-rápida utilizando todos los núcleos de tu CPU, combina `find` o `cat` con `xargs` usando la opción `-P` (Parallel) y `-n` (número máximo de argumentos por proceso):
  ```sh
  # Procesa imágenes png en paralelo usando un máximo de 8 subprocesos simultáneos
  find . -name "*.png" | xargs -n 1 -P 8 -I {} convert {} -resize 50% resized_{}
  ```

---
[← Volver al Temario Principal](../README.md)
