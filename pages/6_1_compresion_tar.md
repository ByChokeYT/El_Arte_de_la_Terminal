# Compresión y Empaquetado (zip, unzip, tar)

Aprende a reducir el tamaño de tus proyectos y a empaquetarlos en un solo archivo para distribuirlos de forma ordenada.

## Manejo de Ficheros ZIP (`zip`, `unzip`)
El formato estándar en Windows y macOS.
* **Comprimir**:
  ```sh
  zip -r codigo.zip proyectos/
  # La bandera -r es recursiva
  ```
* **Descomprimir**:
  ```sh
  unzip codigo.zip -d carpeta_destino/
  ```

## Empaquetar y Comprimir en Linux (`tar`)
En Linux, `tar` (Tape Archive) empaqueta múltiples archivos en un contenedor. Para comprimirlos, se combina con gzip, creando ficheros `.tar.gz` o `.tgz`.
* **Crear respaldo comprimido (`tar.gz`)**:
  ```sh
  tar -czvf codigo.tar.gz src/
  ```
  * `-c`: Crear (Create).
  * `-z`: Comprimir usando gzip.
  * `-v`: Detallado (Verbose).
  * `-f`: Nombre del archivo de salida (File).

* **Descomprimir un `.tar.gz`**:
  ```sh
  tar -xzvf codigo.tar.gz
  ```
  * `-x`: Extraer (Extract).
