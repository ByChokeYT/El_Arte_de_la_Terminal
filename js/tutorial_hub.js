/* ============================================
   TUTORIAL_HUB.JS - Control del Dashboard del Curso de Bash (Wave 3)
   ============================================ */

import { TUTORIAL_MODULES } from './tutorial_data.js?v=3';
console.log("TUTORIAL_MODULES is:", TUTORIAL_MODULES);

// --- Estado Global ---
let state = {
    xp: 0,
    completedSubtopics: {}
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
    updateHubStats();
}

// --- Niveles ---
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

function updateHubStats() {
    const lvl = getCurrentLevel();
    const lvlName = LEVEL_NAMES[Math.min(lvl - 1, LEVEL_NAMES.length - 1)];
    
    document.getElementById("user-level").innerText = `${lvl} (${lvlName})`;
    document.getElementById("user-xp").innerText = state.xp;
    
    const progressPercent = getLevelProgress();
    document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").innerText = `${progressPercent}% para nivel ${lvl + 1}`;
    
    // Contadores del Hero
    let totalCompleted = 0;
    let totalSubtopics = 0;
    console.log("TUTORIAL_MODULES in updateHubStats:", TUTORIAL_MODULES);
    TUTORIAL_MODULES.forEach((mod, idx) => {
        console.log(`Checking mod ${idx}:`, mod);
        if (!mod) {
            console.error(`mod at index ${idx} is undefined!`);
            return;
        }
        if (!mod.subtopics) {
            console.error(`mod ${mod.id} has no subtopics!`, mod);
            return;
        }
        mod.subtopics.forEach(sub => {
            totalSubtopics++;
            if (state.completedSubtopics[sub.id]) totalCompleted++;
        });
    });
    
    document.getElementById("stat-completed-lessons").innerText = `${totalCompleted}/${totalSubtopics}`;
    
    const savedBadgesCount = JSON.parse(localStorage.getItem("bash_tutorial_badges") ?? "[]").length;
    document.getElementById("stat-unlocked-badges").innerText = `${savedBadgesCount}/4`;
}

// --- Renderizar Dashboard (Rejilla de Módulos) ---
function renderDashboard() {
    const container = document.getElementById("tutorial-modules-grid");
    if (!container) return;
    
    container.innerHTML = "";
    
    TUTORIAL_MODULES.forEach(mod => {
        let completedCount = 0;
        mod.subtopics.forEach(sub => {
            if (state.completedSubtopics[sub.id]) completedCount++;
        });
        const totalCount = mod.subtopics.length;
        const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        
        const card = document.createElement("div");
        card.className = "tutorial-mod-card-grid";
        card.innerHTML = `
            <div class="icon-wrapper">
                <i class="${mod.icon}"></i>
            </div>
            <h3>${mod.title}</h3>
            <p>${mod.description}</p>
            <div class="mod-progress-bar">
                <div class="mod-progress-fill" style="width: ${percent}%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-top: 10px; color: var(--color-text-muted);">
                <span>${completedCount}/${totalCount} Lecciones</span>
                <span>${percent}%</span>
            </div>
        `;
        
        card.addEventListener("click", () => {
            showSubtopicsView(mod.id);
        });
        
        container.appendChild(card);
    });
}

// --- Renderizar Listado de Subtemas ---
function showSubtopicsView(moduleId) {
    const mod = TUTORIAL_MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    
    document.getElementById("subtopics-mod-title").innerText = mod.title;
    document.getElementById("subtopics-mod-desc").innerText = mod.description;
    
    const container = document.getElementById("subtopics-grid");
    if (!container) return;
    container.innerHTML = "";
    
    mod.subtopics.forEach(sub => {
        const isCompleted = state.completedSubtopics[sub.id] === true;
        
        const card = document.createElement("div");
        card.className = `subtopic-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="subtopic-card-info">
                <h4>${sub.title}</h4>
                <span>Reto: ${sub.challenge.expectedCommand}</span>
            </div>
            <div class="subtopic-status-icon ${isCompleted ? 'completed' : 'pending'}">
                <i class="${isCompleted ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
            </div>
        `;
        
        card.addEventListener("click", () => {
            window.location.href = sub.markdownFile;
        });
        
        container.appendChild(card);
    });
    
    toggleView("view-subtopics");
}

function toggleView(viewId) {
    document.getElementById("view-dashboard").style.display = viewId === "view-dashboard" ? "block" : "none";
    document.getElementById("view-subtopics").style.display = viewId === "view-subtopics" ? "block" : "none";
}

// --- Comenzar Primera Lección Pendiente ---
function startFirstLesson() {
    for (let mod of TUTORIAL_MODULES) {
        for (let sub of mod.subtopics) {
            if (!state.completedSubtopics[sub.id]) {
                window.location.href = sub.markdownFile;
                return;
            }
        }
    }
    // Si ya completó todo, redirigir a la primera
    window.location.href = TUTORIAL_MODULES[0].subtopics[0].markdownFile;
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    renderDashboard();
    
    const startBtn = document.getElementById("btn-start-first-lesson");
    if (startBtn) {
        startBtn.addEventListener("click", startFirstLesson);
    }
    
    const backBtn = document.querySelector(".btn-back-to-dashboard");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            toggleView("view-dashboard");
        });
    }
});
