# Scripting Avanzado y Automatización (Funciones, Arrays, cron)

Aprende a estructurar tu código de forma modular, manejar listas indexadas y programar la ejecución de scripts periódicamente.

## Funciones
Agrupa bloques de código reutilizables.
```bash
respaldar_servidor() {
    local ip=$1
    echo "Respaldando base de datos de: $ip"
}

respaldar_servidor "192.168.1.150"
```

## Arrays (Arreglos)
Colecciona múltiples elementos en una sola variable.
```bash
servidores=("10.0.0.1" "10.0.0.2" "10.0.0.3")
# Leer por índice
echo "Primer servidor: ${servidores[0]}"
```

## Automatización con `cron`
`cron` ejecuta tus scripts en segundo plano de acuerdo a programaciones de tiempo detalladas en un archivo llamado `crontab`.
* Abre el editor del programador: `crontab -e`
* **Formato**:
  ```
  minuto hora dia_mes mes dia_semana /ruta/al/script.sh
  ```
* **Ejemplo**: Ejecuta un script de respaldo cada domingo a la medianoche:
  ```
  0 0 * * 0 /home/bychoke/respaldo_semanal.sh
  ```
