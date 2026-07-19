# Auditoría de Recursos de Almacenamiento y RAM (df, du, free)

Estas utilidades te permiten saber con precisión cuánto espacio libre queda en el disco y cuánta memoria RAM está disponible.

## Espacio en Disco (`df`)
Muestra el espacio libre de las particiones del sistema.
```sh
df -h
# La bandera -h lo muestra en formato legible (human-readable: GB, MB)
```

## Uso por Carpeta o Archivo (`du`)
Muestra el espacio ocupado por un directorio específico.
```sh
# Muestra el tamaño total resumido (-s) y legible (-h) de una carpeta
du -sh proyectos/
```

## Memoria RAM y Swap (`free`)
Muestra la RAM total, libre, usada y en caché.
```sh
free -h
```
* La memoria "cached" es RAM que el sistema utiliza de forma inteligente como caché de disco, pero se liberará al instante si una aplicación la requiere.
