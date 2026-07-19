# Solo para Windows

Estos son puntos relevantes *únicamente* para Windows.

- En Windows 10, puedes usar [Bash de Ubuntu en Windows](https://msdn.microsoft.com/commandline/wsl/about) que proporciona un entorno familiar con la línea de comandos en Unix. Por el lado positivo, este permite a los programas de Linux ejecutarse en Windows. Por otro lado, este no soporta ejecutar programas de Windows desde la línea de comandos Bash.
- Accede al poder del shell de Unix en Microsoft Windows instalando [Cygwin](https://cygwin.com/). La mayoría de las cosas descritas en este documento funcionaran en su configuración por defecto.

- Instala programas adicionales de Unix con el gestor de paquetes de Cygwin.

- Usa `mintty` como tu línea de comando.

- Accede al portapapeles de Windows a través de `/dev/clipboard`.

- Ejecuta `cygstart` para abrir un archivo arbitrario a través de su aplicación registrada.

- Accede al registro de Windows con `regtool`.

- Ten en cuenta que la ruta `C:\` del disco Windows se transforma en `/cygdrive/c` en Cygwin, y que Cygwin `/` aparece en `C:\cygwin` en Windows. Convierte entre Cygwin y rutas de archivos estilo Windows con `cygpath`. Este es el más útil de los scripts que invocan programas de Windows.

- Puedes ejecutar y hacer scripts de la mayoría de las tareas administrativas del sistema de Windows desde la línea de comandos aprendiendo y usando `wmic`.

- Otra opción para obtener la apariencia y sensación de Unix en Windows es [Cash](ttps://github.com/dthree/cash). Ten en cuenta que muy pocos comandos de Unix y opciones de la línea de comandos están disponibles en este entorno.

- Una opción alternativa para tener herramientas de desarrollo GNU (algo como GCC) en windows es [MinGW](http://www.mingw.org/) y [MSYS](http://www.mingw.org/wiki/msys) su paquete, que proporciona utilidades tales como bash, gawk, make y grep. MSYS no tiene todas las características al compararse con Cygwin. MinGW es particularmente útil para crear ejecutables nativos de Windows de las herramientas Unix.

---
[← Volver al Temario Principal](../README.md)
