# Ordenar y Ver Partes de Archivos (sort, head, tail)

Aprende a inspeccionar el inicio o fin de archivos de registro gigantes y a ordenar datos alfabéticamente o de forma numérica.

## Ordenar Contenido (`sort`)
* **`sort nombres.txt`**: Ordena las líneas alfabéticamente de A a Z.
* **`sort -n numeros.txt`**: Realiza un ordenamiento numérico correcto (10 irá después de 2, a diferencia del alfabético).
* **`sort -r nombres.txt`**: Invierte el orden (de Z a A).

## Ver el Inicio (`head`)
Muestra por defecto las primeras 10 líneas de un archivo.
```sh
head -n 5 access.log
# Muestra solo las primeras 5 líneas
```

## Ver el Final (`tail`)
Muestra por defecto las últimas 10 líneas. Es la herramienta por excelencia para ver logs activos.
* **`tail -n 20 error.log`**: Muestra las últimas 20 líneas.
* **`tail -f error.log`**: Mantiene el canal abierto y muestra nuevas líneas en tiempo real según las escribe el servidor.
