/* ============================================
   TUTORIAL_CORE.JS - Lógica de Consola para Subpáginas (Wave 3)
   ============================================ */

import { TUTORIAL_BADGES } from './tutorial_data.js?v=3';

// --- Configuración de la Lección ---
const config = window.lessonConfig;
if (!config) {
    console.error("Configuración de lección no encontrada (lessonConfig).");
}

// --- Estado del Curso ---
let state = {
    xp: 0,
    completedSubtopics: {},
    virtualDir: "~",
    virtualFS: {
        "~": ["apuntes.txt", "syslog.log", "config.txt", "script.sh"],
        "~/proyectos": []
    }
};

// --- Cargar progreso ---
function loadProgress() {
    const saved = localStorage.getItem("bash_tutorial_progress_v2");
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Error cargando progreso:", e);
        }
    }
    updateStats();
}

function saveProgress() {
    localStorage.setItem("bash_tutorial_progress_v2", JSON.stringify(state));
}

// --- Niveles de Usuario ---
const LEVEL_NAMES = [
    "Iniciante de Shell", "Aprendiz de Consola", "Navegante de Directorios", 
    "Manipulador de Textos", "Inspector del Sistema", "Administrador de Redes", 
    "Mago del Scripting", "Master de Bash"
];

function getCurrentLevel() {
    return Math.floor(state.xp / 100) + 1;
}

function getLevelProgress() {
    return state.xp % 100;
}

function updateStats() {
    const lvl = getCurrentLevel();
    const lvlName = LEVEL_NAMES[Math.min(lvl - 1, LEVEL_NAMES.length - 1)];
    
    const lvlEl = document.getElementById("user-level");
    const xpEl = document.getElementById("user-xp");
    const fillEl = document.getElementById("progress-bar-fill");
    const txtEl = document.getElementById("progress-text");
    
    if (lvlEl) lvlEl.innerText = `${lvl} (${lvlName})`;
    if (xpEl) xpEl.innerText = state.xp;
    
    const progressPercent = getLevelProgress();
    if (fillEl) fillEl.style.width = `${progressPercent}%`;
    if (txtEl) txtEl.innerText = `${progressPercent}% para nivel ${lvl + 1}`;
    
    // Si ya completó este reto antes, mostrar el botón de siguiente
    if (config && state.completedSubtopics[config.id]) {
        showNextButton();
    }
}

function showNextButton() {
    const nextBtn = document.getElementById("btn-next-lesson");
    if (nextBtn && config) {
        nextBtn.href = config.nextUrl;
        nextBtn.style.display = "inline-flex";
    }
}

// --- Consola Simulada ---
const consoleScreen = document.getElementById("terminal-screen");
const consoleInput = document.getElementById("terminal-input");

function writeToConsole(text, isOutput = false, isError = false) {
    if (!consoleScreen) return;
    const line = document.createElement("div");
    line.className = `terminal-line ${isOutput ? 'terminal-output' : ''} ${isError ? 'red-text' : ''}`;
    line.innerHTML = text;
    consoleScreen.appendChild(line);
    consoleScreen.scrollTop = consoleScreen.scrollHeight;
}

function handleConsoleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;
    
    const currentPrefix = `bychoke@terminal:${state.virtualDir}$`;
    writeToConsole(`${currentPrefix} ${escapeHtml(cmd)}`);
    
    const parts = cmd.replace(/\s+/g, ' ').split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = "";
    let isError = false;
    
    switch (baseCmd) {
        case "help":
            output = `Comandos simulados disponibles:
  pwd               - Imprimir ruta de carpeta actual
  ls                - Listar archivos (ej: ls -la)
  cd <dir>          - Cambiar de carpeta (ej: cd proyectos)
  mkdir <dir>       - Crear nueva carpeta
  clear             - Limpiar la consola
  echo <texto>      - Imprimir texto
  cat <archivo>     - Mostrar contenido (ej: cat syslog.log)
  ping -c 4 <host>  - Enviar pings a un host
  curl -i <url>     - Obtener cabeceras HTTP
  tar -czvf <arch>  - Comprimir una carpeta (tar.gz)
  chmod <perm> <f>  - Cambiar permisos (ej: chmod +x script.sh)`;
            break;
            
        case "clear":
            if (consoleScreen) consoleScreen.innerHTML = "";
            return;
            
        case "pwd":
            output = state.virtualDir === "~" ? "/home/bychoke" : "/home/bychoke/proyectos";
            break;
            
        case "ls":
            const files = state.virtualFS[state.virtualDir] ?? [];
            if (args.includes("-la") || args.includes("-l")) {
                output = files.map(f => {
                    const isDir = f.endsWith("/");
                    const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                    return `${perms}  1 bychoke  staff   512 Jul 19 09:50 ${f}`;
                }).join("\n");
            } else {
                output = files.join("    ");
            }
            break;
            
        case "cd":
            const target = args[0] ?? "~";
            if (target === "~" || target === "..") {
                state.virtualDir = "~";
                const prefixEl = document.getElementById("prompt-prefix");
                if (prefixEl) prefixEl.innerText = "bychoke@terminal:~$";
            } else if (target === "proyectos" && state.virtualDir === "~") {
                state.virtualDir = "~/proyectos";
                const prefixEl = document.getElementById("prompt-prefix");
                if (prefixEl) prefixEl.innerText = "bychoke@terminal:~/proyectos$";
            } else {
                output = `cd: no existe el directorio: ${target}`;
                isError = true;
            }
            break;
            
        case "mkdir":
            const dirName = args[0];
            if (!dirName) {
                output = "mkdir: falta operando";
                isError = true;
            } else {
                const folder = dirName.replace("/", "") + "/";
                const curFiles = state.virtualFS[state.virtualDir] ?? [];
                if (!curFiles.includes(folder)) {
                    curFiles.push(folder);
                    state.virtualFS[state.virtualDir] = curFiles;
                }
            }
            break;
            
        case "echo":
            output = args.join(" ");
            break;
            
        case "cat":
            const file = args[0];
            if (!file) {
                output = "cat: falta especificar archivo";
                isError = true;
            } else if (file === "syslog.log") {
                output = `Jul 19 09:32:02 server backend[894]: ERROR: Falló la conexión con PostgreSQL en 10.0.0.5`;
            } else if (file === "apuntes.txt") {
                output = "El comando de hoy es: 'ls -la' para ver archivos ocultos.";
            } else if (file === "config.txt") {
                output = "port=8080\nhost=localhost";
            } else {
                output = `cat: ${file}: No existe el archivo`;
                isError = true;
            }
            break;
            
        case "ping":
            if (args.includes("google.com")) {
                output = `PING google.com (142.250.74.46): 56 data bytes
64 bytes from 142.250.74.46: icmp_seq=0 ttl=118 time=14.2 ms
64 bytes from 142.250.74.46: icmp_seq=1 ttl=118 time=13.8 ms
--- google.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`;
            } else {
                output = "Uso: ping -c 4 google.com";
                isError = true;
            }
            break;
            
        case "curl":
            if (args.includes("google.com")) {
                output = `HTTP/2 200\ncontent-type: text/html\nserver: gws`;
            } else {
                output = "Uso: curl -I https://google.com";
                isError = true;
            }
            break;
            
        case "tar":
            if (cmd.includes("-czvf")) {
                output = "a src/\na src/index.js\n¡Empaquetado completado!";
                const curFiles = state.virtualFS[state.virtualDir] ?? [];
                if (!curFiles.includes("codigo.tar.gz")) curFiles.push("codigo.tar.gz");
            } else {
                output = "Uso: tar -czvf codigo.tar.gz src/";
                isError = true;
            }
            break;
            
        case "chmod":
            if (!args[0] || !args[1]) {
                output = "chmod: faltan operandos";
                isError = true;
            } else {
                output = `Permisos modificados con éxito para ${args[1]}`;
            }
            break;
            
        case "#!/bin/bash":
            output = "¡Shebang de Bash detectado!";
            break;
            
        default:
            output = `bash: comando no encontrado: ${baseCmd}. Escribe 'help' para ayuda.`;
            isError = true;
    }
    
    if (output) writeToConsole(output, !isError, isError);
    
    // Verificar desafío
    checkChallenge(cmd);
}

function checkChallenge(cmd) {
    if (!config) return;
    if (state.completedSubtopics[config.id]) return; // Ya resuelto
    
    const normalizedCmd = cmd.trim().replace(/\s+/g, ' ');
    const expected = config.expectedCommand.trim().replace(/\s+/g, ' ');
    
    if (normalizedCmd === expected) {
        writeToConsole(`<br><span class="green-text"><i class="fa-solid fa-circle-check"></i> [ÉXITO] ${config.feedback}</span>`);
        
        state.completedSubtopics[config.id] = true;
        state.xp += 20;
        
        saveProgress();
        updateStats();
        checkBadges();
        showNextButton();
    }
}

// --- Sistema de Logros ---
function checkBadges() {
    TUTORIAL_BADGES.forEach(badge => {
        const savedBadges = JSON.parse(localStorage.getItem("bash_tutorial_badges") ?? "[]");
        if (savedBadges.includes(badge.id)) return;
        
        let shouldUnlock = false;
        
        if (badge.id === "tbadge-iniciado" && state.completedSubtopics["primeros_pasos"]) {
            shouldUnlock = true;
        } else if (badge.id === "tbadge-comandos" && 
                   ["ls", "cd_pwd", "mkdir_touch", "cp_mv_rm", "man_alias"].every(id => state.completedSubtopics[id])) {
            shouldUnlock = true;
        } else if (badge.id === "tbadge-procesador" && 
                   ["grep", "awk_sed_cut", "sort_head_tail"].every(id => state.completedSubtopics[id])) {
            shouldUnlock = true;
        } else if (badge.id === "tbadge-scripting" && 
                   ["scripting_introduccion", "condicionales_bucles", "funciones_arrays_cron"].every(id => state.completedSubtopics[id])) {
            shouldUnlock = true;
        }
        
        if (shouldUnlock) {
            savedBadges.push(badge.id);
            localStorage.setItem("bash_tutorial_badges", JSON.stringify(savedBadges));
            showNotification("¡LOGRO DESBLOQUEADO!", badge.name, badge.description, badge.icon);
        }
    });
}

function showNotification(title, name, desc, icon) {
    const titleEl = document.getElementById("notification-title");
    const nameEl = document.getElementById("notification-name");
    const descEl = document.getElementById("notification-desc");
    const iconEl = document.getElementById("notification-icon");
    const overlay = document.getElementById("notification-overlay");
    
    if (titleEl) titleEl.innerText = title;
    if (nameEl) nameEl.innerText = name;
    if (descEl) descEl.innerText = desc;
    if (iconEl) iconEl.className = icon;
    if (overlay) overlay.style.display = "flex";
}

// --- Listeners de Eventos ---
document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    
    if (consoleInput) {
        consoleInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const cmd = consoleInput.value;
                consoleInput.value = "";
                handleConsoleCommand(cmd);
            }
        });
    }
    
    const clearBtn = document.getElementById("btn-clear-console");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (consoleScreen) consoleScreen.innerHTML = "";
        });
    }
    
    const closeNotifBtn = document.getElementById("btn-close-notification");
    if (closeNotifBtn) {
        closeNotifBtn.addEventListener("click", () => {
            const overlay = document.getElementById("notification-overlay");
            if (overlay) overlay.style.display = "none";
        });
    }
});

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}
