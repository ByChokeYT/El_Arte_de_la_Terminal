# Introducción al Scripting en Bash (Sintaxis y Variables)

El Shell Scripting es el arte de crear pequeños programas agrupando comandos en ficheros para automatizar tus tareas de forma escalable.

## La Línea Shebang (`#!`)
Todos tus scripts de Bash deben comenzar obligatoriamente en su primera línea con la shebang, especificando la ruta al intérprete de Bash:
```bash
#!/bin/bash
```

## Declarar y Usar Variables
* **Variables Locales**: Se declaran sin espacios alrededor del signo `=`. Para leer su valor, antepones el símbolo `$`:
  ```bash
  nombre="ByChoke"
  echo "Hola, $nombre"
  ```
* **Variables de Entorno**: Se exportan para que estén disponibles en subprocesos:
  ```bash
  export PUERTO=8080
  ```

## Operaciones Aritméticas
Se procesan nativamente dentro de la estructura de doble paréntesis `$(( ))`:
```bash
suma=$((5 + 3))
echo "Resultado: $suma" # Imprime: 8
```
