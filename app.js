// Modules definition
const MODULES = [
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
        questionsCount: 3,
        icon: "fa-solid fa-code"
    },
    {
        id: "uso-diario",
        title: "Uso diario",
        summary: "Atajos de teclado en Bash, alias, comandos anteriores, subshells y expansion de variables.",
        questionsCount: 3,
        icon: "fa-solid fa-keyboard"
    },
    {
        id: "procesamiento",
        title: "Procesamiento de archivos y datos",
        summary: "Búsqueda avanzada, manipulación de formatos (JSON/CSV), awk, sed y ordenamiento de bytes.",
        questionsCount: 3,
        icon: "fa-solid fa-file-csv"
    },
    {
        id: "depuracion",
        title: "Depuración del sistema",
        summary: "Diagnóstico de red, CPU, memoria, procesos, JSM/JVM, sockets y depuración de llamadas al sistema.",
        questionsCount: 3,
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
        questionsCount: 3,
        icon: "fa-solid fa-rocket"
    }
];

// Questions Database
const QUESTIONS = {
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
        }
    ]
};

// Achievement Badges definition
const BADGES = [
    { id: "badge-iniciado", name: "Iniciado", description: "Resuelve tu primera pregunta correctamente.", icon: "fa-solid fa-baby" },
    { id: "badge-fundamentos", name: "Fundador", description: "Completa el módulo de Fundamentos.", icon: "fa-solid fa-hammer" },
    { id: "badge-diario", name: "Ninja diario", description: "Completa el módulo de Uso diario.", icon: "fa-solid fa-calendar-day" },
    { id: "badge-datos", name: "Maestro Datos", description: "Completa el módulo de Procesamiento de archivos.", icon: "fa-solid fa-database" },
    { id: "badge-depuracion", name: "Sherlock", description: "Completa el módulo de Depuración de sistemas.", icon: "fa-solid fa-magnifying-glass" },
    { id: "badge-moderna", name: "Modernista", description: "Completa el módulo de Terminal Moderna.", icon: "fa-solid fa-shuttle-space" },
    { id: "badge-leyenda", name: "Leyenda", description: "Completa todos los módulos del curso.", icon: "fa-solid fa-crown" }
];

// App State
let state = {
    unlockedModules: ["meta"], // initially only meta is unlocked
    completedModules: [],
    completedQuestions: {}, // module_id: [question_indices]
    xp: 0,
    lastNotifiedLevel: 1, // tracks last level-up already notified
    stats: {
        correct: 0,
        attempts: 0,
        streak: 0
    },
    unlockedBadges: []
};

// Current active quiz details
let currentQuiz = {
    moduleId: null,
    questionIndex: 0,
    attempts: 0,
    hasAnswered: false
};

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderModules();
    renderBadges();
    updateUI();
    initConfetti();
    
    // Bind Event Listeners
    document.getElementById("btn-close-modal").addEventListener("click", closeModal);
    document.getElementById("btn-reset").addEventListener("click", resetProgress);
    document.getElementById("btn-hint").addEventListener("click", showHint);
    document.getElementById("btn-next-question").addEventListener("click", nextQuestion);
    document.getElementById("btn-close-notification").addEventListener("click", closeNotification);
});

// Load state from LocalStorage
function loadState() {
    const saved = localStorage.getItem("terminal_course_state");
    if (saved) {
        try {
            state = JSON.parse(saved);
            // Safety checks
            if (!state.unlockedModules) state.unlockedModules = ["meta"];
            if (!state.completedModules) state.completedModules = [];
            if (!state.completedQuestions) state.completedQuestions = {};
            if (!state.stats) state.stats = { correct: 0, attempts: 0, streak: 0 };
            if (!state.unlockedBadges) state.unlockedBadges = [];
        } catch (e) {
            console.error("Error loading saved state, resetting...", e);
        }
    }
}

// Save state to LocalStorage
function saveState() {
    localStorage.setItem("terminal_course_state", JSON.stringify(state));
}

// Reset entire progress
function resetProgress() {
    if (confirm("¿Estás seguro de que quieres reiniciar tu progreso? Se borrarán todos tus logros y respuestas correctas.")) {
        state = {
            unlockedModules: ["meta"],
            completedModules: [],
            completedQuestions: {},
            xp: 0,
            stats: {
                correct: 0,
                attempts: 0,
                streak: 0
            },
            unlockedBadges: []
        };
        saveState();
        renderModules();
        renderBadges();
        updateUI();
        closeModal();
    }
}

// Render Modules Grid
function renderModules() {
    const grid = document.getElementById("modules-grid");
    grid.innerHTML = "";
    
    MODULES.forEach((mod) => {
        const isUnlocked = state.unlockedModules.includes(mod.id);
        const isCompleted = state.completedModules.includes(mod.id);
        const progressCount = state.completedQuestions[mod.id] ? state.completedQuestions[mod.id].length : 0;
        
        const card = document.createElement("div");
        card.className = `module-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`;
        card.id = `card-${mod.id}`;
        
        let statusBadge = '';
        if (isCompleted) {
            statusBadge = '<span class="status-badge completed-icon"><i class="fa-solid fa-circle-check"></i></span>';
        } else if (isUnlocked) {
            statusBadge = '<span class="status-badge unlocked-icon"><i class="fa-solid fa-lock-open"></i></span>';
        } else {
            statusBadge = '<span class="status-badge locked-icon"><i class="fa-solid fa-lock"></i></span>';
        }
        
        card.innerHTML = `
            <div class="card-header">
                <span class="module-tag">${mod.id.toUpperCase()}</span>
                ${statusBadge}
            </div>
            <div class="card-body">
                <h3><i class="${mod.icon}"></i> ${mod.title}</h3>
                <p>${mod.summary}</p>
            </div>
            <div class="card-footer">
                <span class="card-progress">${progressCount}/${mod.questionsCount} Desafíos</span>
                <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-action" ${isUnlocked ? '' : 'disabled'}>
                    ${isCompleted ? '<i class="fa-solid fa-rotate-right"></i> Repasar' : '<i class="fa-solid fa-play"></i> Practicar'}
                </button>
            </div>
        `;
        
        if (isUnlocked) {
            card.querySelector(".btn-action").addEventListener("click", () => {
                startQuiz(mod.id);
            });
        }
        
        grid.appendChild(card);
    });
}

// Render Badges / Achievements list
function renderBadges() {
    const container = document.getElementById("badges-grid");
    container.innerHTML = "";
    
    BADGES.forEach((badge) => {
        const isUnlocked = state.unlockedBadges.includes(badge.id);
        const item = document.createElement("div");
        item.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
        item.title = `${badge.name}: ${badge.description}`;
        
        item.innerHTML = `
            <div class="badge-icon">
                <i class="${badge.icon}"></i>
            </div>
            <span class="badge-name">${badge.name}</span>
        `;
        container.appendChild(item);
    });
}

// Level names by level number
const LEVEL_NAMES = [
    "Iniciante", "Script Kiddie", "Shell Warrior", "Pipe Master",
    "Grep Guru", "Awk Artisan", "Sed Sorcerer", "Cron Wizard",
    "Kernel Knight", "Terminal Legend"
];

// Update UI headers & stats
function updateUI() {
    // XP & Level calculations  (100 XP per level)
    const level = Math.floor(state.xp / 100) + 1;
    const currentLevelXP = (level - 1) * 100;
    const progressPercent = Math.min(100, Math.floor(((state.xp - currentLevelXP) / 100) * 100));
    
    document.getElementById("user-level").innerText = level;
    document.getElementById("user-xp").innerText = state.xp;
    document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").innerText = `${progressPercent}% para Nivel ${level + 1}`;
    
    // Stats Update
    document.getElementById("stat-correct").innerText = state.stats.correct;
    document.getElementById("stat-attempts").innerText = state.stats.attempts;
    document.getElementById("stat-streak").innerText = `${state.stats.streak} 🔥`;
    
    // Level-up notification (only fires once per new level)
    if (!state.lastNotifiedLevel) state.lastNotifiedLevel = 1;
    if (level > state.lastNotifiedLevel) {
        state.lastNotifiedLevel = level;
        saveState();
        const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
        // Delay slightly so the XP bar animation plays first
        setTimeout(() => {
            showNotification(
                "¡SUBISTE DE NIVEL!",
                `Nivel ${level}: ${levelName}`,
                `¡Impresionante progreso! Sigues avanzando en el dominio de la terminal. ¡Sigue así!`,
                "fa-solid fa-arrow-trend-up",
                "level"
            );
        }, 600);
    }
}

// Start Quiz Module
function startQuiz(moduleId) {
    currentQuiz.moduleId = moduleId;
    currentQuiz.questionIndex = 0;
    currentQuiz.attempts = 0;
    currentQuiz.hasAnswered = false;
    
    const mod = MODULES.find(m => m.id === moduleId);
    document.getElementById("modal-title").innerText = `terminal - cuestionario: ${mod.title.toLowerCase()}`;
    document.getElementById("quiz-modal").style.display = "flex";
    
    showQuestion();
}

// Show active question in the terminal simulator
function showQuestion() {
    const moduleId = currentQuiz.moduleId;
    const questionIndex = currentQuiz.questionIndex;
    const questions = QUESTIONS[moduleId];
    
    if (questionIndex >= questions.length) {
        // Module Completed!
        completeModule();
        return;
    }
    
    currentQuiz.hasAnswered = false;
    currentQuiz.attempts = 0;
    
    const question = questions[questionIndex];
    document.getElementById("question-progress").innerText = `Desafío ${questionIndex + 1} de ${questions.length}`;
    document.getElementById("question-text").innerText = question.text;
    
    // Hide feedback & next button
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("btn-next-question").style.display = "none";
    document.getElementById("btn-hint").style.display = "inline-flex";
    
    // Render Multiple Choice Options
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    question.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
            <span class="option-marker">[${idx + 1}] $</span>
            <span class="option-text">${escapeHtml(opt)}</span>
        `;
        
        btn.addEventListener("click", () => {
            if (!currentQuiz.hasAnswered) {
                checkAnswer(idx, btn);
            }
        });
        
        optionsContainer.appendChild(btn);
    });
}

// Check if selected answer is correct
function checkAnswer(selectedIndex, selectedBtn) {
    currentQuiz.hasAnswered = true;
    state.stats.attempts += 1;
    
    const moduleId = currentQuiz.moduleId;
    const questionIndex = currentQuiz.questionIndex;
    const question = QUESTIONS[moduleId][questionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.style.display = "block";
    
    // Disable all options
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => btn.style.cursor = "not-allowed");
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        feedbackArea.className = "feedback-area success-feedback";
        feedbackArea.innerHTML = `<p class="green-text">[CORRECTO] <i class="fa-solid fa-circle-check"></i></p><p>Has resuelto el desafío con éxito. Se te han otorgado +20 XP.</p>`;
        
        state.stats.correct += 1;
        state.stats.streak += 1;
        state.xp += 20;
        
        // Save question completion
        if (!state.completedQuestions[moduleId]) {
            state.completedQuestions[moduleId] = [];
        }
        if (!state.completedQuestions[moduleId].includes(questionIndex)) {
            state.completedQuestions[moduleId].push(questionIndex);
        }
        
        // Trigger simple confetti
        triggerConfetti(15);
        
        // Check for "Iniciado" badge on first correct answer
        unlockBadge("badge-iniciado");
        
    } else {
        selectedBtn.classList.add("incorrect");
        
        // Highlight correct option
        optionButtons[question.correct].classList.add("correct");
        
        feedbackArea.className = "feedback-area error-feedback";
        feedbackArea.innerHTML = `<p class="red-text">[ERROR] Comando incorrecto. <i class="fa-solid fa-circle-xmark"></i></p><p>Revisa la pista e inténtalo de nuevo.</p>`;
        
        state.stats.streak = 0; // Break streak
    }
    
    // Show next question button
    document.getElementById("btn-next-question").style.display = "inline-flex";
    document.getElementById("btn-hint").style.display = "none";
    
    saveState();
    updateUI();
}

// Next question or complete module
function nextQuestion() {
    currentQuiz.questionIndex += 1;
    showQuestion();
}

// Show hint in feedback area
function showHint() {
    const moduleId = currentQuiz.moduleId;
    const questionIndex = currentQuiz.questionIndex;
    const question = QUESTIONS[moduleId][questionIndex];
    
    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.className = "feedback-area";
    feedbackArea.style.display = "block";
    feedbackArea.innerHTML = `<p class="green-text">[PISTA] <i class="fa-solid fa-lightbulb"></i></p><p>${question.hint}</p>`;
}

// Complete module logic, unlock next module and badges
function completeModule() {
    const moduleId = currentQuiz.moduleId;
    
    if (!state.completedModules.includes(moduleId)) {
        state.completedModules.push(moduleId);
        state.xp += 50; // extra completion XP
    }
    
    // Unlock next module linearly
    const currentIdx = MODULES.findIndex(m => m.id === moduleId);
    if (currentIdx < MODULES.length - 1) {
        const nextMod = MODULES[currentIdx + 1];
        if (!state.unlockedModules.includes(nextMod.id)) {
            state.unlockedModules.push(nextMod.id);
            // Notification or visual effect
            triggerConfetti(100);
        }
    }
    
    // Unlock relevant badges
    checkModuleBadges(moduleId);
    
    // Check if all modules completed
    if (state.completedModules.length === MODULES.length) {
        unlockBadge("badge-leyenda");
    }
    
    saveState();
    renderModules();
    renderBadges();
    updateUI();
    
    // Success overlay or close
    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.style.display = "block";
    feedbackArea.className = "feedback-area success-feedback";
    feedbackArea.innerHTML = `
        <p class="green-text">[COMPLETADO] ¡MÓDULO FINALIZADO! <i class="fa-solid fa-award"></i></p>
        <p>Has completado todos los desafíos del módulo. Se te han sumado +50 XP extras por finalización.</p>
    `;
    
    document.getElementById("btn-next-question").style.display = "none";
    document.getElementById("btn-hint").style.display = "none";
    
    // Change close button to indicate return to home
    setTimeout(() => {
        closeModal();
    }, 2500);
}

// Helper to check and unlock badges based on module completion
function checkModuleBadges(moduleId) {
    if (moduleId === "fundamentos") unlockBadge("badge-fundamentos");
    if (moduleId === "uso-diario") unlockBadge("badge-diario");
    if (moduleId === "procesamiento") unlockBadge("badge-datos");
    if (moduleId === "depuracion") unlockBadge("badge-depuracion");
    if (moduleId === "moderna") unlockBadge("badge-moderna");
}

// Unlock badge with confetti celebration and fullscreen notification
function unlockBadge(badgeId) {
    if (!state.unlockedBadges.includes(badgeId)) {
        state.unlockedBadges.push(badgeId);
        saveState();
        renderBadges();

        // Find badge metadata and show popup
        const badge = BADGES.find(b => b.id === badgeId);
        if (badge) {
            setTimeout(() => {
                triggerConfetti(120);
                showNotification(
                    "¡LOGRO DESBLOQUEADO!",
                    badge.name,
                    badge.description,
                    badge.icon,
                    "badge"
                );
            }, 300);
        }
    }
}

// Show fullscreen achievement/level-up notification
function showNotification(title, name, desc, icon, type) {
    const overlay = document.getElementById("notification-overlay");
    const card    = overlay.querySelector(".notification-card");

    // Re-trigger CSS animation by replacing the node
    const clone = card.cloneNode(true);
    card.parentNode.replaceChild(clone, card);

    // Re-grab references after clone
    const newCard   = overlay.querySelector(".notification-card");
    const newIcon   = document.getElementById("notification-icon");
    const newCircle = overlay.querySelector(".glow-circle");

    // Set colour theme based on notification type
    if (type === "level") {
        newCard.style.borderColor = "var(--yellow)";
        newCard.style.boxShadow   = "0 0 50px rgba(245,158,11,0.45), inset 0 0 20px rgba(245,158,11,0.1)";
        newCircle.style.background = "var(--yellow)";
        newIcon.parentElement.style.background = "linear-gradient(135deg, #f59e0b, #ef4444)";
    } else {
        newCard.style.borderColor = "";
        newCard.style.boxShadow   = "";
        newCircle.style.background = "var(--cyan)";
        newIcon.parentElement.style.background = "linear-gradient(135deg, var(--primary), var(--cyan))";
    }

    // Fill content
    newIcon.className = icon;
    document.getElementById("notification-title").innerText = title;
    document.getElementById("notification-name").innerText  = name;
    document.getElementById("notification-desc").innerText  = desc;

    // Re-bind close button (it was cloned, needs new listener)
    document.getElementById("btn-close-notification")
        .addEventListener("click", closeNotification);

    overlay.style.display = "flex";
}

// Close notification overlay
function closeNotification() {
    document.getElementById("notification-overlay").style.display = "none";
}

// Close Modal dialog
function closeModal() {
    document.getElementById("quiz-modal").style.display = "none";
}

// HTML Escaping Utility
function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}

/* ==========================================
   CANVAS CONFETTI CELEBRATION ENGINE
   ========================================== */
let canvas, ctx, particles = [];
const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

function initConfetti() {
    canvas = document.getElementById("confetti-canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function triggerConfetti(count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 50,
            y: canvas.height / 2 + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 1) * 15 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            alpha: 1
        });
    }
    
    // start loop if not running
    if (particles.length === count) {
        requestAnimationFrame(updateConfetti);
    }
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // drag
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.015; // fade out
        
        if (p.alpha <= 0 || p.y > canvas.height) {
            particles.splice(i, 1);
            continue;
        }
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
    }
    
    if (particles.length > 0) {
        requestAnimationFrame(updateConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
