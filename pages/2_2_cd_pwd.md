# Cambiar de Directorio y Ubicación Actual (cd, pwd)

Para navegar por el árbol de carpetas de tu servidor o computadora, usarás `cd` y `pwd`.

## Imprimir Directorio Actual (`pwd`)

El comando `pwd` (Print Working Directory) devuelve la ruta absoluta desde la raíz del sistema de la carpeta en la que estás posicionado.
```sh
pwd
# Salida: /home/bychoke/proyectos
```

## Cambiar de Directorio (`cd`)

El comando `cd` (Change Directory) cambia tu ubicación actual:
* **`cd ruta`**: Cambia a una ruta absoluta o relativa (ej. `cd proyectos`).
* **`cd ..`**: Sube un nivel en el árbol de carpetas (directorio padre).
* **`cd ~`** (o solo `cd`): Regresa directamente a tu carpeta personal o Home.
* **`cd -`**: Regresa a la carpeta de trabajo anterior antes de tu último movimiento.
