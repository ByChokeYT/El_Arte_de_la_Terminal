# Entender el Sistema de Permisos de Linux

Linux es un sistema robusto y seguro debido a su estricto sistema de control de accesos por usuario y permisos.

## Concepto del Propietario, Grupo y Otros
Si ejecutas `ls -l` sobre un archivo, verás una cadena de 10 caracteres:
```
-rwxr-xr--
```
* **Primer carácter**: Tipo de archivo (`-` = archivo, `d` = directorio).
* **Bloque 1 (u - usuario)**: `rwx` (Lectura, Escritura y Ejecución). Permisos del creador del archivo.
* **Bloque 2 (g - grupo)**: `r-x` (Lectura y Ejecución). Permisos de los miembros del grupo asignado al archivo.
* **Bloque 3 (o - otros)**: `r--` (Solo Lectura). Permisos de cualquier otra cuenta de usuario del sistema.

## Valores numéricos (Octal)
Cada permiso posee un valor numérico fijo para facilitar la asignación en bloque:
* **Lectura (`r`)**: `4`
* **Escritura (`w`)**: `2`
* **Ejecución (`x`)**: `1`
* **Sin permisos (`-`)**: `0`

Ejemplo: `rwxr-xr-x` equivale a `755` (4+2+1 / 4+0+1 / 4+0+1).
