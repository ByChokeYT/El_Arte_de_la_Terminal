# One-liners

Algunos ejemplos de comandos reunidos:

- Es notablemente útil en ocasiones que pueda realizar intersección, unión, y diferencia de conjuntos de archivos de texto vía `sort`/`uniq`. Suponga que `a` y `b` como archivos de texto que son únicos. Esto es rápido, y trabaja con archivos de tamaño arbitrario, hasta varios gigabytes. (Sort no está limitado por la memoria, aunque quizás necesite utilizar la opción `-T` si `/tmp` está en una pequeña partición de raíz.) Consulta también la nota acerca de `LC_ALL` y las opciones de `sort`, `-u` (dejado de lado para clarificar más abajo).
```sh
      cat a b | sort | uniq > c   # c es a unido con b
      cat a b | sort | uniq -d > c   # c es a intersectado con b
      cat a b b | sort | uniq -u > c   # c es el conjunto diferencia a - b
```

- Usa `grep . *` para rápidamente examinar el contenido de todos los archivos de un directorio (para que cada línea esté emparejada con el nombre de archivo), o `head -100 *` (para que cada archivo tenga un encabezado). Esto puede ser útil para directorios llenos con ajustes de configuración como aquellos en `/sys`, `/proc`, `/etc`.


- Sumar todos los números en la tercera columna de un archivo de texto (esto es probablemente 3 veces más rápido y 3 veces menos código que el equivalente en Python):
```sh
      awk '{ x += $3 } END { print x }' miarchivo
```

- Consultar tamaños/fechas en un árbol de archivos, esto es como un `ls -l` recursivo pero es más fácil de leer que `ls -lR`:
```sh
      find . -type f -ls
```

- Digamos que tiene un archivo de texto, como un log de un servidor web, y un cierto valor comienza a aparecer en algunas líneas, tales como un parámetro `acct_id` que está presente en la URL. Si quieres un recuento de cuantas peticiones por cada `acct_id`:
```sh
      cat access.log | egrep -o 'acct_id=[0-9]+' | cut -d= -f2 | sort | uniq -c | sort -rn
```

- Para monitorear continuamente los cambios, usa `watch`, Ej. verificar los cambios de archivos en un directorio con `watch -d -n 2 'ls -rt1h | tail'` o para configuraciones de red mientras solucionas problemas con la configuración wifi `watch -d -n 2 ifconfig`.

- Ejecuta esta función para obtener un consejo aleatorio desde este documento (analiza el Markdown y extrae un elemento):
```sh
      function taocl() {
        curl -s https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md |
          pandoc -f markdown -t html |
          xmlstarlet fo --html --dropdtd |
          xmlstarlet sel -t -v "(html/body/ul/li[count(p)>0])[$RANDOM mod last()+1]" |
          xmlstarlet unesc | fmt -80
      }
```

---
[← Volver al Temario Principal](../README.md)
