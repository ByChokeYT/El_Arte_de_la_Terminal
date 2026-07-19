# Crear Archivos y Carpetas (touch, mkdir)

Aprende a crear nuevos contenedores y archivos desde la línea de comandos de forma ágil.

## Crear Carpetas/Directorios (`mkdir`)

El comando `mkdir` (Make Directory) crea nuevas carpetas:
* **`mkdir proyectos`**: Crea una carpeta con ese nombre en tu ubicación actual.
* **`mkdir -p src/js/utils`**: Crea la carpeta `utils` junto con todas las carpetas intermedias (`src` y `js`) de forma automática si no existen.

## Crear Archivos de Texto Vacíos (`touch`)

El comando `touch` tiene dos usos principales:
1. **Crear archivos vacíos**: Si el archivo no existe, lo crea al instante.
   ```sh
   touch log.txt
   ```
2. **Actualizar marcas de tiempo**: Si el archivo ya existe, actualiza su fecha y hora de modificación a la hora actual sin alterar su contenido.
