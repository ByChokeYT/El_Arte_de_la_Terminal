// ============================================
// TUTORIAL_DATA.JS - Datos del Curso de Bash (Wave 3)
// ============================================

export const TUTORIAL_MODULES = [
  {
    id: "introduccion",
    title: "1. Introducción",
    description: "Primeros pasos, qué es Bash y estructura de la línea de comandos.",
    icon: "fa-solid fa-compass",
    subtopics: [
      {
        id: "primeros_pasos",
        title: "Conceptos Básicos y CLI",
        markdownFile: "pages/1_1_primeros_pasos.html",
        challenge: {
          instruction: "Escribe el comando para imprimir la ayuda básica de comandos simulados disponibles en este tutorial.",
          expectedCommand: "help",
          feedback: "¡Excelente! 'help' muestra la lista de comandos disponibles en el simulador."
        }
      }
    ]
  },
  {
    id: "comandos_basicos",
    title: "2. Comandos Básicos",
    description: "Navegación y manipulación de archivos y carpetas.",
    icon: "fa-solid fa-folder-open",
    subtopics: [
      {
        id: "ls",
        title: "Listar archivos (ls)",
        markdownFile: "pages/2_1_ls.html",
        challenge: {
          instruction: "Lista el contenido del directorio actual en formato detallado (largo) e incluyendo archivos ocultos.",
          expectedCommand: "ls -la",
          feedback: "¡Perfecto! 'ls -la' combina la vista detallada (-l) y muestra archivos ocultos (-a)."
        }
      },
      {
        id: "cd_pwd",
        title: "Rutas y Navegación (cd, pwd)",
        markdownFile: "pages/2_2_cd_pwd.html",
        challenge: {
          instruction: "Imprime la ruta completa del directorio de trabajo actual.",
          expectedCommand: "pwd",
          feedback: "¡Muy bien! 'pwd' (print working directory) te dice en qué directorio te encuentras."
        }
      },
      {
        id: "mkdir_touch",
        title: "Creación (mkdir, touch)",
        markdownFile: "pages/2_3_mkdir_touch.html",
        challenge: {
          instruction: "Crea una nueva carpeta llamada 'proyectos'.",
          expectedCommand: "mkdir proyectos",
          feedback: "¡Excelente! 'mkdir' (make directory) crea carpetas nuevas en el disco."
        }
      },
      {
        id: "cp_mv_rm",
        title: "Copiar y Mover (cp, mv, rm)",
        markdownFile: "pages/2_4_cp_mv_rm.html",
        challenge: {
          instruction: "Mueve tu ubicación actual a la carpeta 'proyectos' usando cd.",
          expectedCommand: "cd proyectos",
          feedback: "¡Navegación excelente! cd proyectos te mueve al directorio creado."
        }
      },
      {
        id: "man_alias",
        title: "Manuales y Alias (man, alias)",
        markdownFile: "pages/2_5_man_alias.html",
        challenge: {
          instruction: "Define un alias llamado 'c' que sirva para limpiar la pantalla ejecutando 'clear'.",
          expectedCommand: "alias c=clear",
          feedback: "¡Genial! Los alias te ahorran mucho tiempo de escritura de comandos largos."
        }
      }
    ]
  },
  {
    id: "procesamiento_textos",
    title: "3. Procesamiento de Textos",
    description: "Filtrar, ordenar y ver archivos de texto.",
    icon: "fa-solid fa-file-lines",
    subtopics: [
      {
        id: "grep",
        title: "Filtrar patrones (grep)",
        markdownFile: "pages/3_1_grep.html",
        challenge: {
          instruction: "Filtra el archivo 'syslog.log' buscando todas las líneas que contengan la palabra 'ERROR' de forma insensible a mayúsculas/minúsculas.",
          expectedCommand: "grep -i ERROR syslog.log",
          feedback: "¡Así es! 'grep -i' busca palabras o patrones sin importar si están en mayúsculas o minúsculas."
        }
      },
      {
        id: "awk_sed_cut",
        title: "Editores y Flujos (awk, sed, cut)",
        markdownFile: "pages/3_2_awk_sed_cut.html",
        challenge: {
          instruction: "Usa awk para imprimir la primera columna de un listado detallado (usa: ls -l | awk '{print $1}').",
          expectedCommand: "ls -l | awk '{print $1}'",
          feedback: "¡Excelente! awk procesa las salidas estructuradas en columnas de forma fantástica."
        }
      },
      {
        id: "sort_head_tail",
        title: "Extremos y Orden (sort, head, tail)",
        markdownFile: "pages/3_3_sort_head_tail.html",
        challenge: {
          instruction: "Muestra las últimas 20 líneas de un archivo de registro llamado 'syslog.log'.",
          expectedCommand: "tail -n 20 syslog.log",
          feedback: "¡Buen trabajo! 'tail' te muestra el final de un archivo, y '-n 20' especifica la cantidad de líneas."
        }
      }
    ]
  },
  {
    id: "monitoreo_sistema",
    title: "4. Monitoreo del Sistema",
    description: "Control de procesos, recursos, disco y memoria.",
    icon: "fa-solid fa-gauge-high",
    subtopics: [
      {
        id: "ps_top_kill",
        title: "Procesos (ps, top, kill)",
        markdownFile: "pages/4_1_ps_top_kill.html",
        challenge: {
          instruction: "Termina a la fuerza (kill inmediato) el proceso colgado con identificador PID 1234.",
          expectedCommand: "kill -9 1234",
          feedback: "¡Correcto! kill -9 es la forma de forzar la terminación del proceso colgado."
        }
      },
      {
        id: "df_du_free",
        title: "Almacenamiento y RAM (df, du, free)",
        markdownFile: "pages/4_2_df_du_free.html",
        challenge: {
          instruction: "Comprueba el espacio disponible en disco de todas las particiones en formato legible para humanos.",
          expectedCommand: "df -h",
          feedback: "¡Exacto! 'df -h' (disk free human-readable) muestra el almacenamiento disponible en gigabytes y megabytes."
        }
      }
    ]
  },
  {
    id: "redes_conectividad",
    title: "5. Redes y Conectividad",
    description: "Verificación de red, ssh, transferencias y descargas.",
    icon: "fa-solid fa-network-wired",
    subtopics: [
      {
        id: "ping_curl_wget",
        title: "APIs y Conectividad (ping, curl, wget)",
        markdownFile: "pages/5_1_ping_curl_wget.html",
        challenge: {
          instruction: "Realiza una petición web e imprime solo las cabeceras HTTP de respuesta de 'https://google.com'.",
          expectedCommand: "curl -I https://google.com",
          feedback: "¡Correcto! La flag '-I' de curl sirve para auditar cabeceras y códigos de estado sin descargar todo el HTML."
        }
      },
      {
        id: "ssh_scp_rsync",
        title: "Acceso Remoto (ssh, scp, rsync)",
        markdownFile: "pages/5_2_ssh_scp_rsync.html",
        challenge: {
          instruction: "Inicia sesión por SSH de forma remota en la máquina 192.168.1.100 con el usuario 'usuario'.",
          expectedCommand: "ssh usuario@192.168.1.100",
          feedback: "¡Excelente! SSH es el estándar mundial para administrar servidores de forma remota."
        }
      }
    ]
  },
  {
    id: "compresion_empaquetado",
    title: "6. Compresión y Empaquetado",
    description: "Manejo de archivos comprimidos y empaquetados.",
    icon: "fa-solid fa-file-zipper",
    subtopics: [
      {
        id: "compresion_tar",
        title: "Compresión (zip, unzip, tar)",
        markdownFile: "pages/6_1_compresion_tar.html",
        challenge: {
          instruction: "Crea un archivo empaquetado y comprimido con gzip llamado 'codigo.tar.gz' a partir del directorio 'src/'.",
          expectedCommand: "tar -czvf codigo.tar.gz src/",
          feedback: "¡Buenísimo! Las banderas significan: -c (crear), -z (gzip), -v (verbose) y -f (archivo destino)."
        }
      }
    ]
  },
  {
    id: "permisos_archivos",
    title: "7. Permisos de Archivos",
    description: "Propietarios, grupos y permisos de ejecución o lectura.",
    icon: "fa-solid fa-shield-halved",
    subtopics: [
      {
        id: "sistema_permisos",
        title: "Entender Permisos (rwx)",
        markdownFile: "pages/7_1_sistema_permisos.html",
        challenge: {
          instruction: "Ejecuta un listado largo (ls -l) para ver los permisos detallados de los archivos en tu ubicación actual.",
          expectedCommand: "ls -l",
          feedback: "¡Perfecto! 'ls -l' te permite ver la cadena de caracteres de permisos rwx de cada fichero."
        }
      },
      {
        id: "chmod_chown_chgrp",
        title: "Cambiar Permisos (chmod, chown)",
        markdownFile: "pages/7_2_chmod_chown_chgrp.html",
        challenge: {
          instruction: "Concede permisos de ejecución al archivo 'script.sh' para todos los usuarios de forma simbólica.",
          expectedCommand: "chmod +x script.sh",
          feedback: "¡Excelente! 'chmod +x' añade el permiso de ejecución a los bloques de propietario, grupo y otros."
        }
      }
    ]
  },
  {
    id: "shell_scripting",
    title: "8. Shell Scripting",
    description: "Creación de scripts automáticos, variables, condicionales, bucles y cron.",
    icon: "fa-solid fa-wand-magic-sparkles",
    subtopics: [
      {
        id: "scripting_introduccion",
        title: "Sintaxis y Variables",
        markdownFile: "pages/8_1_scripting_introduccion.html",
        challenge: {
          instruction: "Escribe la línea shebang que debe ir al principio de cualquier script de Bash.",
          expectedCommand: "#!/bin/bash",
          feedback: "¡Excelente! El shebang especifica que el script debe interpretarse usando /bin/bash."
        }
      },
      {
        id: "condicionales_bucles",
        title: "Condicionales y Bucles",
        markdownFile: "pages/8_2_condicionales_bucles.html",
        challenge: {
          instruction: "Escribe un bucle simple for que imprima los números 1 y 2 (usa: for n in 1 2; do echo $n; done).",
          expectedCommand: "for n in 1 2; do echo $n; done",
          feedback: "¡Excelente! Has ejecutado una estructura iterativa de una sola línea."
        }
      },
      {
        id: "funciones_arrays_cron",
        title: "Automatización (cron, arrays)",
        markdownFile: "pages/8_3_funciones_arrays_cron.html",
        challenge: {
          instruction: "Imprime el valor del primer elemento de un array llamado servidores (usa: echo ${servidores[0]}).",
          expectedCommand: "echo ${servidores[0]}",
          feedback: "¡Buenísimo! Has accedido de forma indexada al primer elemento (índice 0) de la colección."
        }
      }
    ]
  }
];

export const TUTORIAL_BADGES = [
  { id: "tbadge-iniciado", name: "Recluta de Consola", description: "Completa el módulo de Introducción a Bash.", icon: "fa-solid fa-seedling" },
  { id: "tbadge-comandos", name: "Explorador de Archivos", description: "Completa el módulo de Comandos Básicos.", icon: "fa-solid fa-folder-open" },
  { id: "tbadge-procesador", name: "Filtro Viviente", description: "Completa el módulo de Procesamiento de Textos.", icon: "fa-solid fa-filter" },
  { id: "tbadge-scripting", name: "Automatizador", description: "Completa el curso completo y el script de Bash.", icon: "fa-solid fa-wand-magic-sparkles" }
];
