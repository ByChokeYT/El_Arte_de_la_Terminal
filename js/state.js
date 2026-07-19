// ============================================
// STATE.JS - Estado global y persistencia
// ============================================

import { MODULES, BADGES, LEVEL_NAMES } from './data.js';
import { triggerConfetti }               from './confetti.js';

// ── Estado de la aplicación ─────────────────
export let state = {
    unlockedModules:    ["meta"],
    completedModules:   [],
    completedQuestions: {},
    xp:                 0,
    lastNotifiedLevel:  1,
    stats: { correct: 0, attempts: 0, streak: 0 },
    unlockedBadges:     []
};

// ── Persistencia ────────────────────────────
export function loadState() {
    const saved = localStorage.getItem("terminal_course_state");
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        // Garantizar que todos los campos existan
        state.unlockedModules    = parsed.unlockedModules    ?? ["meta"];
        state.completedModules   = parsed.completedModules   ?? [];
        state.completedQuestions = parsed.completedQuestions ?? {};
        state.xp                 = parsed.xp                 ?? 0;
        state.lastNotifiedLevel  = parsed.lastNotifiedLevel  ?? 1;
        state.stats              = parsed.stats              ?? { correct: 0, attempts: 0, streak: 0 };
        state.unlockedBadges     = parsed.unlockedBadges     ?? [];
    } catch (e) {
        console.error("Error al cargar el estado guardado, reiniciando…", e);
    }
}

export function saveState() {
    localStorage.setItem("terminal_course_state", JSON.stringify(state));
}

export function resetState() {
    state.unlockedModules    = ["meta"];
    state.completedModules   = [];
    state.completedQuestions = {};
    state.xp                 = 0;
    state.lastNotifiedLevel  = 1;
    state.stats              = { correct: 0, attempts: 0, streak: 0 };
    state.unlockedBadges     = [];
}

// ── Niveles ──────────────────────────────────
export function getCurrentLevel() {
    return Math.floor(state.xp / 100) + 1;
}

export function getLevelProgress() {
    const level           = getCurrentLevel();
    const currentLevelXP  = (level - 1) * 100;
    return Math.min(100, Math.floor(((state.xp - currentLevelXP) / 100) * 100));
}

// ── Logros ───────────────────────────────────
export function unlockBadge(badgeId, { onUnlock } = {}) {
    if (state.unlockedBadges.includes(badgeId)) return;

    state.unlockedBadges.push(badgeId);
    saveState();

    const badge = BADGES.find(b => b.id === badgeId);
    if (badge && typeof onUnlock === "function") {
        setTimeout(() => {
            triggerConfetti(120);
            onUnlock(badge);
        }, 300);
    }
}

export function checkModuleBadges(moduleId, callbacks) {
    const map = {
        "fundamentos":  "badge-fundamentos",
        "uso-diario":   "badge-diario",
        "procesamiento":"badge-datos",
        "depuracion":   "badge-depuracion",
        "moderna":      "badge-moderna"
    };
    if (map[moduleId]) unlockBadge(map[moduleId], callbacks);
}

// ── Notificación de level-up ─────────────────
export function checkLevelUp(level, { onLevelUp } = {}) {
    if (!state.lastNotifiedLevel) state.lastNotifiedLevel = 1;
    if (level > state.lastNotifiedLevel) {
        state.lastNotifiedLevel = level;
        saveState();
        const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
        setTimeout(() => {
            if (typeof onLevelUp === "function") onLevelUp(level, levelName);
        }, 600);
    }
}
