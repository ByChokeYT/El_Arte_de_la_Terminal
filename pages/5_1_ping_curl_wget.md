# Conectividad de Red y Descargas (ping, curl, wget)

Aprende a diagnosticar la red, enviar consultas a servidores y APIs, y realizar descargas directas desde la consola.

## Comprobar Conexión (`ping`)
Envía paquetes ICMP para testear si un servidor remoto está en línea y medir su latencia.
```sh
ping -c 4 google.com
# La bandera -c 4 detiene el envío tras 4 paquetes
```

## Transferir Datos y Consumir APIs (`curl`)
Envía y recibe datos a través de URLs. Es la navaja suiza de la conectividad.
* **`curl https://api.github.com`**: Descarga y muestra el JSON directamente.
* **`curl -I https://google.com`**: Muestra únicamente las cabeceras HTTP (código de respuesta, servidor, etc.).
* **`curl -o pagina.html https://ejemplo.com`**: Guarda el contenido en un archivo.

## Descarga Directa (`wget`)
Especializado en descargar archivos de forma directa y silenciosa.
```sh
wget http://releases.ubuntu.com/ubuntu.iso
```
