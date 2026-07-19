# Control de Flujo: Condicionales y Bucles en Bash

Controla la ejecución de tus scripts utilizando bifurcaciones condicionales y bucles iterativos.

## Condicionales (`if... elif... else`)
Permiten tomar decisiones de ejecución.
* **Operadores de comparación**:
  * `-eq`: Igual a
  * `-ne`: Distinto de
  * `-gt`: Mayor que
  * `-lt`: Menor que
  * `-d ruta`: Evalúa si existe el directorio.
  * `-f ruta`: Evalúa si existe el archivo.

```bash
#!/bin/bash
limite=90
uso_actual=95

if [ "$uso_actual" -gt "$limite" ]; then
    echo "¡Alerta de disco lleno!"
else
    echo "Uso de disco normal."
fi
```

## Bucle Iterativo `for`
Itera sobre una lista de elementos:
```bash
for color in rojo azul verde; do
    echo "Color seleccionado: $color"
done
```

## Bucle Iterativo `while`
Ejecuta comandos mientras se cumpla una condición:
```bash
contador=1
while [ $contador -le 3 ]; do
    echo "Iteración: $contador"
    contador=$((contador + 1))
done
```
