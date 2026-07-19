# Manuales de Comandos y Alias (man, alias)

Aprende a buscar información sobre los comandos disponibles y a optimizar tu flujo de trabajo creando tus propios atajos de teclado.

## Consultar los Manuales del Sistema (`man`)

El comando `man` abre la ayuda técnica y detallada de prácticamente cualquier comando de la consola.
```sh
man grep
# Abre el manual del buscador de textos
```
* Puedes desplazarte con las flechas de teclado y salir presionando la tecla `q`.

## Crear Atajos Personalizados (`alias`)

Un `alias` te permite asignar un nombre corto a un comando complejo o con muchas opciones que utilizas frecuentemente.
```sh
alias ll="ls -la"
# Ahora escribir "ll" equivale a escribir "ls -la"
```
* Para hacer que tus alias sean permanentes, debes guardarlos en tu archivo de configuración del shell (ej. `~/.bashrc` o `~/.zshrc`).
