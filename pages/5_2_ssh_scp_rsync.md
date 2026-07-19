# Acceso Remoto y Sincronización (ssh, scp, rsync)

Domina la conexión a servidores y la sincronización de carpetas de forma segura usando cifrado SSH.

## Conexión SSH (`ssh`)
Inicia sesión en una terminal remota de forma totalmente segura.
```sh
ssh usuario@192.168.1.100
```

## Copia Segura de Archivos (`scp`)
Copia archivos de un host a otro a través de la red cifrada de SSH.
* **Subir archivo**:
  ```sh
  scp index.html root@servidor:/var/www/html/
  ```
* **Descargar archivo**:
  ```sh
  scp root@servidor:/var/log/syslog.log .
  ```

## Sincronización Profesional (`rsync`)
Sincroniza directorios locales o remotos transfiriendo únicamente los bytes modificados de los archivos. Muy veloz y eficiente para copias de seguridad.
```sh
rsync -avz --delete carpeta_local/ usuario@servidor:/respaldos/
# Sincroniza y elimina del destino lo que ya no existe localmente
```
* `-a`: Modo archivo (mantiene enlaces, permisos, fechas).
* `-v`: Verbose (muestra detalles).
* `-z`: Comprime los datos durante el envío.
