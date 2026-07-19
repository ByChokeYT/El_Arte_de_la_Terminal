// ============================================
// APP.JS - Inicializador y coordinador principal
// ============================================

import { MODULES, BADGES, LEVEL_NAMES }        from './data.js';
import { initConfetti }                         from './confetti.js';
import { state, loadState, saveState,
         resetState, getCurrentLevel,
         getLevelProgress }                     from './state.js';
import { startQuiz, closeModal, nextQuestion,
         showHint, setQuizCallbacks,
         initKeyboardShortcuts }                from './quiz.js';

// ── Arranque ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderModules();
    renderBadges();
    updateUI();
    initConfetti();
    initKeyboardShortcuts();

    setQuizCallbacks({
        onUpdateUI:         updateUI,
        onRenderModules:    renderModules,
        onRenderBadges:     renderBadges,
        onShowNotification: showNotification
    });

    document.getElementById("btn-close-modal")
        .addEventListener("click", closeModal);
    document.getElementById("btn-reset")
        .addEventListener("click", handleReset);
    document.getElementById("btn-hint")
        .addEventListener("click", showHint);
    document.getElementById("btn-next-question")
        .addEventListener("click", nextQuestion);
    document.getElementById("btn-close-notification")
        .addEventListener("click", closeNotification);
});

// ── Render: Módulos ───────────────────────────
function renderModules() {
    const grid = document.getElementById("modules-grid");
    grid.innerHTML = "";

    MODULES.forEach((mod) => {
        const isUnlocked    = state.unlockedModules.includes(mod.id);
        const isCompleted   = state.completedModules.includes(mod.id);
        const progressCount = (state.completedQuestions[mod.id] ?? []).length;

        const card = document.createElement("div");
        card.className = `module-card ${isUnlocked ? "unlocked" : "locked"} ${isCompleted ? "completed" : ""}`;
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
                <button class="btn ${isCompleted ? "btn-secondary" : "btn-primary"} btn-action"
                        ${isUnlocked ? "" : "disabled"}>
                    ${isCompleted
                        ? '<i class="fa-solid fa-rotate-right"></i> Repasar'
                        : '<i class="fa-solid fa-play"></i> Practicar'}
                </button>
            </div>
        `;

        if (isUnlocked) {
            card.querySelector(".btn-action")
                .addEventListener("click", () => startQuiz(mod.id));
        }

        grid.appendChild(card);
    });
}

// ── Render: Logros ────────────────────────────
function renderBadges() {
    const container = document.getElementById("badges-grid");
    container.innerHTML = "";

    BADGES.forEach((badge) => {
        const isUnlocked = state.unlockedBadges.includes(badge.id);
        const item = document.createElement("div");
        item.className = `badge-item ${isUnlocked ? "unlocked" : ""}`;
        item.title     = `${badge.name}: ${badge.description}`;
        item.innerHTML = `
            <div class="badge-icon"><i class="${badge.icon}"></i></div>
            <span class="badge-name">${badge.name}</span>
        `;
        container.appendChild(item);
    });
}

// ── Actualizar cabecera y estadísticas ────────
function updateUI() {
    const level    = getCurrentLevel();
    const progress = getLevelProgress();

    document.getElementById("user-level").innerText          = level;
    document.getElementById("user-xp").innerText             = state.xp;
    document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    document.getElementById("progress-text").innerText       = `${progress}% para Nivel ${level + 1}`;

    document.getElementById("stat-correct").innerText  = state.stats.correct;
    document.getElementById("stat-attempts").innerText = state.stats.attempts;
    document.getElementById("stat-streak").innerText   = `${state.stats.streak} 🔥`;

    // Level-up notification (solo una vez por nivel)
    if (!state.lastNotifiedLevel) state.lastNotifiedLevel = 1;
    if (level > state.lastNotifiedLevel) {
        state.lastNotifiedLevel = level;
        saveState();
        const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
        setTimeout(() => showNotification(
            "¡SUBISTE DE NIVEL!",
            `Nivel ${level}: ${levelName}`,
            "¡Impresionante progreso! Sigues avanzando en el dominio de la terminal. ¡Sigue así!",
            "fa-solid fa-arrow-trend-up",
            "level"
        ), 600);
    }
}

// ── Reiniciar progreso ────────────────────────
function handleReset() {
    if (!confirm("¿Estás seguro de que quieres reiniciar tu progreso? Se borrarán todos tus logros y respuestas correctas."))
        return;
    resetState();
    saveState();
    renderModules();
    renderBadges();
    updateUI();
    closeModal();
}

// ── Overlay de logro / level-up ───────────────
function showNotification(title, name, desc, icon, type) {
    const overlay = document.getElementById("notification-overlay");
    const card    = overlay.querySelector(".notification-card");

    const clone = card.cloneNode(true);
    card.parentNode.replaceChild(clone, card);

    const newCard   = overlay.querySelector(".notification-card");
    const newIcon   = document.getElementById("notification-icon");
    const newCircle = overlay.querySelector(".glow-circle");

    if (type === "level") {
        newCard.style.borderColor  = "var(--yellow)";
        newCard.style.boxShadow    = "0 0 50px rgba(245,158,11,0.45), inset 0 0 20px rgba(245,158,11,0.1)";
        newCircle.style.background = "var(--yellow)";
        newIcon.parentElement.style.background = "linear-gradient(135deg, #f59e0b, #ef4444)";
    } else {
        newCard.style.borderColor  = "";
        newCard.style.boxShadow    = "";
        newCircle.style.background = "var(--cyan)";
        newIcon.parentElement.style.background = "linear-gradient(135deg, var(--primary), var(--cyan))";
    }

    newIcon.className = icon;
    document.getElementById("notification-title").innerText = title;
    document.getElementById("notification-name").innerText  = name;
    document.getElementById("notification-desc").innerText  = desc;

    document.getElementById("btn-close-notification")
        .addEventListener("click", closeNotification);

    overlay.style.display = "flex";
}

function closeNotification() {
    document.getElementById("notification-overlay").style.display = "none";
}
