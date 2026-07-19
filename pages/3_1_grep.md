# Búsqueda de Texto y Patrones (grep)

El comando `grep` es una de las utilidades más famosas de Linux. Permite buscar cadenas de texto o expresiones regulares dentro de uno o más archivos.

## Ejemplos de Uso Diario

* **`grep "error" syslog.log`**: Muestra las líneas que contienen la palabra exacta "error".
* **`grep -i "error" syslog.log`**: Ignora mayúsculas y minúsculas durante la búsqueda.
* **`grep -v "info" syslog.log`**: Invierte la búsqueda; muestra solo las líneas que **no** contienen la palabra "info".
* **`grep -r "main" src/`**: Realiza una búsqueda de la palabra "main" de forma recursiva en todos los archivos de la carpeta `src/`.
* **`grep -n "todo" notas.txt`**: Muestra las coincidencias junto con su número de línea correspondiente.
