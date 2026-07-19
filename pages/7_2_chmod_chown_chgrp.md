# Modificar Permisos y Propietarios (chmod, chown, chgrp)

Aprende a ajustar la seguridad de tus archivos cambiando quién es el propietario y qué accesos tienen permitidos los usuarios del sistema.

## Cambiar Permisos (`chmod`)
* **Notación Simbólica**:
  ```sh
  chmod +x script.sh       # Agrega permisos de ejecución a todos
  chmod u-w notas.txt      # Quita permisos de escritura al dueño
  ```
* **Notación Octal**:
  ```sh
  chmod 755 script.sh      # rwxr-xr-x (dueño lee/escribe/ejecuta, resto lee/ejecuta)
  chmod 600 config.txt     # rw------- (solo el dueño lee/escribe)
  ```

## Cambiar Propietario (`chown`)
Cambia el usuario y/o grupo al que le pertenece el archivo.
* **Cambiar de usuario**:
  ```sh
  sudo chown www-data index.html
  ```
* **Cambiar de usuario y grupo a la vez**:
  ```sh
  sudo chown www-data:www-data index.html
  ```

## Cambiar Grupo Propietario (`chgrp`)
Cambia el grupo propietario de un archivo o carpeta de forma rápida.
```sh
sudo chgrp desarrolladores modulo.js
```
