# Procesamiento Avanzado de Textos (awk, sed, cut)

Estas tres herramientas conforman el trío dinámico para manipular flujos de datos y formatear respuestas directamente en la consola.

## Extraer Columnas Específicas (`cut`)
`cut` corta secciones de cada línea de un archivo.
```sh
# Obtiene la primera columna (nombres de usuario) delimitada por ":" en /etc/passwd
cut -d: -f1 /etc/passwd
```

## Editor de Flujos (`sed`)
`sed` realiza reemplazos y ediciones sobre flujos de texto sin necesidad de abrir un editor.
```sh
# Reemplaza la primera palabra "fallo" por "exito" en la línea
sed 's/fallo/exito/g' log.txt
```

## Programación por Columnas (`awk`)
`awk` es una potente utilidad orientada al procesamiento de registros por campos.
```sh
# Imprime el tamaño (columna 5) y el nombre (columna 9) de un listado detallado
ls -l | awk '{print $5, $9}'
```
