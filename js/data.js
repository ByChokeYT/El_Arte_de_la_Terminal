// ============================================
// DATA.JS - Constantes de datos del curso
// ============================================

export const MODULES = [
    {
        id: "meta",
        title: "Meta",
        summary: "Alcance y objetivos de la guía, configuración y filosofía de aprendizaje.",
        questionsCount: 3,
        icon: "fa-solid fa-compass"
    },
    {
        id: "fundamentos",
        title: "Fundamentos",
        summary: "Redirecciones, tuberías, administración de trabajos, SSH, permisos y comandos Unix básicos.",
        questionsCount: 4,
        icon: "fa-solid fa-code"
    },
    {
        id: "uso-diario",
        title: "Uso diario",
        summary: "Atajos de teclado en Bash, alias, comandos anteriores, subshells y expansion de variables.",
        questionsCount: 4,
        icon: "fa-solid fa-keyboard"
    },
    {
        id: "procesamiento",
        title: "Procesamiento de archivos y datos",
        summary: "Búsqueda avanzada, manipulación de formatos (JSON/CSV), awk, sed y ordenamiento de bytes.",
        questionsCount: 4,
        icon: "fa-solid fa-file-csv"
    },
    {
        id: "depuracion",
        title: "Depuración del sistema",
        summary: "Diagnóstico de red, CPU, memoria, procesos, JSM/JVM, sockets y depuración de llamadas al sistema.",
        questionsCount: 4,
        icon: "fa-solid fa-bug"
    },
    {
        id: "one-liners",
        title: "One-liners",
        summary: "Comandos combinados potentes para intersección de conjuntos, sumas rápidas y logs de servidores.",
        questionsCount: 3,
        icon: "fa-solid fa-bolt"
    },
    {
        id: "obscuro",
        title: "Obscuro pero útil",
        summary: "Herramientas de nicho como sponge, dd, comm, units, cal, apg y utilidades interesantes.",
        questionsCount: 3,
        icon: "fa-solid fa-ghost"
    },
    {
        id: "moderna",
        title: "Terminal Moderna (Modern Unix)",
        summary: "La generación de herramientas Rust/Go: bat, eza, fd, ripgrep, zoxide y emuladores modernos.",
        questionsCount: 4,
        icon: "fa-solid fa-rocket"
    }
];

export const QUESTIONS = {
    meta: [
        {
            text: "¿Cuál es el alcance principal de esta guía en cuanto a sistemas operativos?",
            options: [
                "Está escrita estrictamente para servidores Windows Server y Powershell.",
                "Está escrita principalmente para Linux, con secciones breves sobre Windows y OS X.",
                "Está escrita exclusivamente para FreeBSD y servidores Solaris Unix antiguos."
            ],
            correct: 1,
            hint: "La terminal de Linux es el centro de atención, pero incluye dos pequeñas secciones finales para otros sistemas."
        },
        {
            text: "¿Qué sitio web externo se recomienda en la guía para analizar detalladamente la estructura de comandos complejos?",
            options: [
                "explainshell.com",
                "manpages.org",
                "shellcheck.net"
            ],
            correct: 0,
            hint: "Es una herramienta web visual muy famosa que desglosa opciones y tuberías (pipes)."
        },
        {
            text: "¿Con qué comandos builtin de Bash puedes obtener ayuda en línea directamente en la terminal sin conexión?",
            options: [
                "man y info",
                "help y help -d",
                "bash-help y --help"
            ],
            correct: 1,
            hint: "Se mencionan explícitamente como comandos builtins de Bash, ideales para referencias rápidas de comandos internos."
        }
    ],
    fundamentos: [
        {
            text: "¿Cómo se redirige la salida estándar (stdout) para añadir contenido al final de un archivo existente sin sobrescribirlo?",
            options: [
                "Usando el operador de redirección '>'",
                "Usando el operador de tubería '|'",
                "Usando el operador de redirección '>>'"
            ],
            correct: 2,
            hint: "El operador simple '>' sobrescribe, mientras que el duplicado añade al final."
        },
        {
            text: "¿Qué atajo de teclado se utiliza para suspender (pausar) temporalmente el proceso que está corriendo en primer plano?",
            options: [
                "Ctrl-C",
                "Ctrl-Z",
                "Ctrl-D"
            ],
            correct: 1,
            hint: "Luego de pausarlo, puedes usar 'bg' para mandarlo a segundo plano o 'fg' para regresarlo."
        },
        {
            text: "¿Qué comando se utiliza para mostrar el tamaño total ocupado por una carpeta de forma resumida y legible para humanos?",
            options: [
                "du -hs *",
                "df -h",
                "ls -l"
            ],
            correct: 0,
            hint: "Se utiliza el comando de 'disk usage' con la opción '-h' (human-readable) y '-s' (summary)."
        },
        {
            text: "¿Cómo puedes verificar rápidamente si un puerto de red (por ejemplo, google.com:80) está abierto usando únicamente Bash sin herramientas como netcat o telnet?",
            options: [
                "Usando la redirección virtual 'exec 3<>/dev/tcp/google.com/80'",
                "Con el comando nativo 'ping -p 80 google.com'",
                "Abriendo el puerto mediante 'ssh -p 80 google.com'"
            ],
            correct: 0,
            hint: "El sistema de archivos virtual de Bash mapea `/dev/tcp/host/port` directamente a sockets TCP."
        }
    ],
    "uso-diario": [
        {
            text: "¿Qué combinación de teclado te permite buscar a través del historial de comandos previamente ejecutados?",
            options: [
                "Ctrl-R",
                "Ctrl-E",
                "Ctrl-A"
            ],
            correct: 0,
            hint: "Presiónalo repetidamente para navegar de forma inversa en el historial de comandos ejecutados."
        },
        {
            text: "Para el alias ll=\"ls -latr\", ¿qué hace exactamente la opción '-t'?",
            options: [
                "Muestra los archivos ordenándolos por fecha de modificación.",
                "Muestra los archivos ocultos también.",
                "Muestra los archivos en formato de árbol."
            ],
            correct: 0,
            hint: "'t' viene de time (tiempo/fecha)."
        },
        {
            text: "Si estás a medio camino al escribir un comando pero cambias de opinión, ¿cómo lo guardas en el historial como comentario?",
            options: [
                "Presionas Ctrl-C y luego Enter.",
                "Presionas Alt-# para poner un '#' al inicio de la línea.",
                "Presionas Ctrl-D."
            ],
            correct: 1,
            hint: "Pone el carácter '#' al principio de tu comando interactivo en Bash."
        },
        {
            text: "¿Cómo puedes implementar una búsqueda interactiva y fuzzy para moverte rápidamente por los directorios de tu sistema usando fzf?",
            options: [
                "Creando un alias cd=\"fzf\"",
                "Creando una función personalizada en tu shell que busque directorios con 'find' y pase el resultado a 'fzf +m' para luego hacer cd",
                "Usando el comando integrado cd-fuzzy nativo de Unix"
            ],
            correct: 1,
            hint: "Mediante una función de shell puedes pasar la lista de directorios encontrados por 'find' a 'fzf' y ejecutar cd con el resultado seleccionado."
        }
    ],
    procesamiento: [
        {
            text: "¿Qué comando es ideal para contar de forma rápida el número de líneas de un archivo de texto?",
            options: [
                "wc -l",
                "wc -c",
                "wc -w"
            ],
            correct: 0,
            hint: "El comando es Word Count ('wc') y la opción para líneas es '-l'."
        },
        {
            text: "Para reemplazar la palabra 'old' por 'new' en múltiples archivos de texto de forma interactiva e instantánea usando Perl, ¿cuál es la sintaxis correcta?",
            options: [
                "perl -pi.bak -e 's/old/new/g' archivos.txt",
                "perl replace(old, new) archivos.txt",
                "perl -s/old/new/ archivos.txt"
            ],
            correct: 0,
            hint: "Usa las flags '-pi.bak' para realizar el reemplazo in-place y guardar un archivo de respaldo."
        },
        {
            text: "¿Qué comando nativo de Linux se usa para mezclar o seleccionar líneas aleatorias de un archivo?",
            options: [
                "rand",
                "shuf",
                "sort -r"
            ],
            correct: 1,
            hint: "Viene de la palabra 'shuffle' (mezclar)."
        },
        {
            text: "Si tienes una respuesta de API JSON y quieres extraer solo las propiedades 'id' y 'name' formateadas como un nuevo objeto por cada elemento, ¿cuál filtro de jq utilizarías?",
            options: [
                "jq '.[] | {id: .id, name: .name}'",
                "jq --extract=id,name",
                "jq '.id + .name'"
            ],
            correct: 0,
            hint: "Utilizas la proyección de llaves {prop: .prop} iterando con el operador .[]"
        }
    ],
    depuracion: [
        {
            text: "¿Qué comando rápido te permite monitorear de forma dinámica el consumo de disco, red, memoria y CPU combinados en una sola pantalla interactiva?",
            options: [
                "dstat",
                "top",
                "free"
            ],
            correct: 0,
            hint: "Es muy útil para ver de un vistazo qué subsistema está fallando bajo carga."
        },
        {
            text: "¿Cuál es el propósito del comando lsof?",
            options: [
                "Limpiar el espacio libre del disco duro.",
                "Listar descriptores de archivos y sockets abiertos por procesos.",
                "Listar todas las librerías dinámicas del sistema."
            ],
            correct: 1,
            hint: "Su nombre viene de 'List Open Files'."
        },
        {
            text: "¿En qué archivo virtual de /proc se puede inspeccionar en vivo el modelo de procesador, núcleos y frecuencia de tu CPU?",
            options: [
                "/proc/cpuinfo",
                "/proc/cmdline",
                "/proc/meminfo"
            ],
            correct: 0,
            hint: "Es el archivo que contiene información detallada sobre la CPU."
        },
        {
            text: "¿Qué comando curl usarías para auditar de forma precisa la latencia de una API desglosando los tiempos de DNS, handshake TLS y el TTFB?",
            options: [
                "curl -v -t latency https://api.com",
                "curl -s -o /dev/null -w \"DNS: %{time_namelookup}s\\nTTFB: %{time_starttransfer}s\\n\" https://api.com",
                "curl --profile-time=all https://api.com"
            ],
            correct: 1,
            hint: "Utilizas la opción `-w` (write-out) pasando variables de tiempo formateadas como `%{time_namelookup}` y `%{time_starttransfer}`."
        }
    ],
    "one-liners": [
        {
            text: "Suponiendo que 'a' y 'b' son archivos de texto únicos, ¿cuál es la tubería para obtener la INTERSECCIÓN (elementos en común) entre ambos?",
            options: [
                "cat a b | sort | uniq > c",
                "cat a b | sort | uniq -d > c",
                "cat a b b | sort | uniq -u > c"
            ],
            correct: 1,
            hint: "Usa 'uniq -d' para mostrar únicamente las líneas duplicadas (las que aparecen en ambos)."
        },
        {
            text: "¿Cómo se obtiene la DIFERENCIA DE CONJUNTOS (líneas que están en 'a' pero NO en 'b') usando sort y uniq?",
            options: [
                "cat a b b | sort | uniq -u > c",
                "cat a b | sort | uniq -d > c",
                "cat a b | sort | uniq > c"
            ],
            correct: 0,
            hint: "Concatenas 'a' con dos copias de 'b', de modo que lo que estaba en 'b' queda duplicado/triplicado, y al filtrar con 'uniq -u' (únicas) se elimina, dejando solo lo exclusivo de 'a'."
        },
        {
            text: "¿Cómo se monitorean continuamente los cambios de archivos en un directorio ejecutando un comando de forma repetitiva?",
            options: [
                "Usando el comando 'watch' delante del comando a repetir",
                "Usando el comando 'tail -f'",
                "Usando un script en bucle 'while true'"
            ],
            correct: 0,
            hint: "Permite ejecutar un comando cada N segundos resaltando las diferencias."
        }
    ],
    obscuro: [
        {
            text: "¿Para qué sirve el comando sponge?",
            options: [
                "Para limpiar los cachés del kernel de Linux.",
                "Para leer todas las entradas antes de escribir al archivo de salida, permitiendo leer y escribir en el mismo archivo sin truncarlo.",
                "Para comprimir archivos binarios pesados."
            ],
            correct: 1,
            hint: "Evita que un comando como 'grep -v algo file.txt > file.txt' destruya/trunque el archivo antes de leerlo."
        },
        {
            text: "¿Qué comando te permite saber el tipo de archivo (ej. JPEG, script Bash, binario ELF) analizando su contenido y no su extensión?",
            options: [
                "stat",
                "type",
                "file"
            ],
            correct: 2,
            hint: "Analiza los 'magic numbers' al inicio del archivo para identificar su tipo real."
        },
        {
            text: "¿Qué comando abre una calculadora de precisión arbitraria en tu terminal?",
            options: [
                "bc",
                "expr",
                "calc"
            ],
            correct: 0,
            hint: "Es la calculadora básica interactiva clásica en los sistemas Unix."
        }
    ],
    moderna: [
        {
            text: "¿Qué herramienta moderna escrita en Rust reemplaza a cat ofreciendo resaltado de sintaxis e integración con Git?",
            options: [
                "eza",
                "bat",
                "fd"
            ],
            correct: 1,
            hint: "Su nombre es similar a 'cat' pero empieza con la letra del murciélago en inglés."
        },
        {
            text: "¿Qué herramienta moderna e inteligente actúa como un reemplazo de cd aprendiendo los directorios que visitas con más frecuencia?",
            options: [
                "zoxide",
                "ripgrep",
                "atuin"
            ],
            correct: 0,
            hint: "Permite usar el comando corto 'z' para navegar de manera predictiva."
        },
        {
            text: "¿Cuál es el prompt de terminal ultrarrápido y altamente configurable que se puede instalar en cualquier shell?",
            options: [
                "Kitty",
                "Starship",
                "WezTerm"
            ],
            correct: 1,
            hint: "Tiene como logo una nave espacial y está escrito en Rust."
        },
        {
            text: "¿Qué herramienta moderna basada en texto (TUI) te permite interactuar visualmente con Git para commits, ramas y fusiones sin salir de la terminal?",
            options: [
                "git-gui",
                "lazygit",
                "tig"
            ],
            correct: 1,
            hint: "Es el TUI interactivo más popular actualmente y empieza con 'lazy' (perezoso en inglés)."
        }
    ]
};

export const BADGES = [
    { id: "badge-iniciado",   name: "Iniciado",      description: "Resuelve tu primera pregunta correctamente.",             icon: "fa-solid fa-baby" },
    { id: "badge-fundamentos",name: "Fundador",       description: "Completa el módulo de Fundamentos.",                     icon: "fa-solid fa-hammer" },
    { id: "badge-diario",     name: "Ninja diario",   description: "Completa el módulo de Uso diario.",                      icon: "fa-solid fa-calendar-day" },
    { id: "badge-datos",      name: "Maestro Datos",  description: "Completa el módulo de Procesamiento de archivos.",        icon: "fa-solid fa-database" },
    { id: "badge-depuracion", name: "Sherlock",       description: "Completa el módulo de Depuración de sistemas.",           icon: "fa-solid fa-magnifying-glass" },
    { id: "badge-moderna",    name: "Modernista",     description: "Completa el módulo de Terminal Moderna.",                 icon: "fa-solid fa-shuttle-space" },
    { id: "badge-leyenda",    name: "Leyenda",        description: "Completa todos los módulos del curso.",                   icon: "fa-solid fa-crown" }
];

export const LEVEL_NAMES = [
    "Iniciante", "Script Kiddie", "Shell Warrior", "Pipe Master",
    "Grep Guru", "Awk Artisan", "Sed Sorcerer", "Cron Wizard",
    "Kernel Knight", "Terminal Legend"
];
