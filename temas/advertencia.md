# Advertencia y Buenas Prácticas

Con la excepción de tareas muy pequeñas, el código está escrito para que otros puedan leerlo. Con el poder llega la responsabilidad. El hecho de que *puedes* hacer algo en Bash no necesariamente significa que deba hacerlo! ;)

## Scripting Profesional y Defensivo

Cuando escribes scripts en Bash que van a correr en servidores o ser utilizados por otros, debes programar a la defensiva para evitar fallos catastróficos:

- **Detección temprana de errores**: Usa siempre al principio de tus scripts:
  ```bash
  set -euo pipefail
  ```
  * `set -e`: Detiene el script inmediatamente si algún comando falla (retorna un código distinto a 0).
  * `set -u`: Lanza un error y detiene el script si intentas usar una variable que no ha sido definida.
  * `set -o pipefail`: Asegura que si algún comando dentro de una tubería (`|`) falla, toda la tubería devuelva un código de error.

- **Uso seguro de archivos temporales**: Nunca crees archivos temporales fijos como `/tmp/mi_script.txt`, ya que esto genera vulnerabilidades de seguridad y colisiones. Usa siempre `mktemp`:
  ```bash
  # Crea un archivo temporal seguro
  temp_file=$(mktemp)
  # Asegura que el archivo temporal se elimine al terminar o fallar el script
  trap 'rm -f "$temp_file"' EXIT
  ```

- **Manejo de argumentos y ayuda**: Proporciona siempre una validación de parámetros limpia y una función de uso:
  ```bash
  usage() {
    echo "Uso: $0 -d <directorio> -f <archivo>"
    exit 1
  }

  if [ "$#" -lt 2 ]; then
    usage
  fi
  ```

- **Linter automático**: Antes de compartir o ejecutar un script de Bash complejo, analízalo con **`shellcheck`** (`shellcheck mi_script.sh`). Te detectará decenas de malas prácticas de quoting, inyecciones de código y bugs de sintaxis comunes en Bash de forma instantánea.

---
[← Volver al Temario Principal](../README.md)
