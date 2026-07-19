# Gestión e Inspección de Procesos (ps, top/htop, kill, uptime)

Aprende a diagnosticar qué procesos están consumiendo la CPU del sistema y cómo detener aplicaciones colgadas en segundo plano.

## Listar Procesos Activos (`ps`)
* **`ps`**: Muestra los procesos de la sesión de terminal actual.
* **`ps aux`**: Lista todos los procesos en ejecución del sistema con detalles de propietario y recursos consumidos.

## Monitores Interactivos (`top`, `htop`)
* **`top`**: El inspector de tareas por defecto de Unix.
* **`htop`**: Versión moderna a color con barras de progreso para CPU, memoria RAM y atajos intuitivos.

## Terminar Procesos (`kill`, `pkill`)
Si un proceso no responde, puedes terminarlo usando su Identificador de Proceso (PID):
* **`kill PID`**: Envía una señal de parada normal.
* **`kill -9 PID`**: Envía la señal SIGKILL para forzar el cierre inmediato.
* **`pkill nombre`**: Termina todos los procesos que coincidan con ese nombre (ej. `pkill node`).

## Tiempo de Actividad (`uptime`)
Informa cuánto tiempo lleva encendido el sistema y cuál es la media de carga del procesador.
```sh
uptime
```
