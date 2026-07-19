// ============================================
// QUIZ.JS - Lógica del cuestionario interactivo
// ============================================

import { MODULES, QUESTIONS }                          from './data.js';
import { triggerConfetti }                             from './confetti.js';
import { state, saveState, checkModuleBadges,
         unlockBadge, getCurrentLevel,
         getLevelProgress, checkLevelUp }              from './state.js';

// ── Estado local del cuestionario ────────────
let currentQuiz = {
    moduleId:      null,
    questionIndex: 0,
    attempts:      0,
    hasAnswered:   false
};

// ── Callbacks externos ───────────────────────
// Asignados desde app.js para que quiz.js no dependa del DOM de render
let _callbacks = {
    onUpdateUI:        () => {},
    onRenderModules:   () => {},
    onRenderBadges:    () => {},
    onShowNotification:() => {}
};

export function setQuizCallbacks(cbs) {
    _callbacks = { ..._callbacks, ...cbs };
}

// ── Utilidades ───────────────────────────────
function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}

// ── Abrir / cerrar modal ─────────────────────
export function startQuiz(moduleId) {
    currentQuiz.moduleId      = moduleId;
    currentQuiz.questionIndex = 0;
    currentQuiz.attempts      = 0;
    currentQuiz.hasAnswered   = false;

    const mod = MODULES.find(m => m.id === moduleId);
    document.getElementById("modal-title").innerText =
        `terminal - cuestionario: ${mod.title.toLowerCase()}`;
    document.getElementById("quiz-modal").style.display = "flex";
    document.body.classList.add("modal-open");

    showQuestion();
}

export function closeModal() {
    document.getElementById("quiz-modal").style.display = "none";
    document.body.classList.remove("modal-open");
}

// ── Mostrar pregunta ─────────────────────────
function showQuestion() {
    const { moduleId, questionIndex } = currentQuiz;
    const questions = QUESTIONS[moduleId];

    if (questionIndex >= questions.length) {
        completeModule();
        return;
    }

    currentQuiz.hasAnswered = false;
    currentQuiz.attempts    = 0;

    const question = questions[questionIndex];
    document.getElementById("question-progress").innerText =
        `Desafío ${questionIndex + 1} de ${questions.length}`;
    document.getElementById("question-text").innerText = question.text;

    // Reset UI
    document.getElementById("feedback-area").style.display      = "none";
    document.getElementById("btn-next-question").style.display  = "none";
    document.getElementById("btn-hint").style.display           = "inline-flex";

    // Renderizar opciones
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    question.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
            <span class="option-marker">[${idx + 1}] $</span>
            <span class="option-text">${escapeHtml(opt)}</span>
        `;
        btn.addEventListener("click", () => {
            if (!currentQuiz.hasAnswered) checkAnswer(idx, btn);
        });
        container.appendChild(btn);
    });
}

// ── Verificar respuesta ──────────────────────
function checkAnswer(selectedIndex, selectedBtn) {
    currentQuiz.hasAnswered = true;
    state.stats.attempts   += 1;

    const { moduleId, questionIndex } = currentQuiz;
    const question  = QUESTIONS[moduleId][questionIndex];
    const isCorrect = selectedIndex === question.correct;

    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.style.display = "block";

    // Deshabilitar todas las opciones
    document.querySelectorAll(".option-btn").forEach(b => b.style.cursor = "not-allowed");

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        feedbackArea.className = "feedback-area success-feedback";
        feedbackArea.innerHTML = `<p class="green-text">[CORRECTO] <i class="fa-solid fa-circle-check"></i></p>
                                  <p>Has resuelto el desafío con éxito. Se te han otorgado +20 XP.</p>`;

        state.stats.correct += 1;
        state.stats.streak  += 1;
        state.xp            += 20;

        if (!state.completedQuestions[moduleId])
            state.completedQuestions[moduleId] = [];
        if (!state.completedQuestions[moduleId].includes(questionIndex))
            state.completedQuestions[moduleId].push(questionIndex);

        triggerConfetti(15);
        unlockBadge("badge-iniciado", {
            onUnlock: (badge) => _callbacks.onShowNotification(
                "¡LOGRO DESBLOQUEADO!", badge.name, badge.description, badge.icon, "badge"
            )
        });

    } else {
        selectedBtn.classList.add("incorrect");
        document.querySelectorAll(".option-btn")[question.correct].classList.add("correct");
        feedbackArea.className = "feedback-area error-feedback";
        feedbackArea.innerHTML = `<p class="red-text">[ERROR] Comando incorrecto. <i class="fa-solid fa-circle-xmark"></i></p>
                                  <p>Revisa la pista e inténtalo de nuevo.</p>`;
        state.stats.streak = 0;
    }

    document.getElementById("btn-next-question").style.display = "inline-flex";
    document.getElementById("btn-hint").style.display          = "none";

    saveState();
    _callbacks.onUpdateUI();
}

// ── Siguiente pregunta ───────────────────────
export function nextQuestion() {
    currentQuiz.questionIndex += 1;
    showQuestion();
}

// ── Mostrar pista ────────────────────────────
export function showHint() {
    const { moduleId, questionIndex } = currentQuiz;
    const question = QUESTIONS[moduleId][questionIndex];

    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.className     = "feedback-area";
    feedbackArea.style.display = "block";
    feedbackArea.innerHTML     =
        `<p class="green-text">[PISTA] <i class="fa-solid fa-lightbulb"></i></p><p>${question.hint}</p>`;
}

// ── Completar módulo ─────────────────────────
function completeModule() {
    const moduleId = currentQuiz.moduleId;

    if (!state.completedModules.includes(moduleId)) {
        state.completedModules.push(moduleId);
        state.xp += 50;
    }

    // Desbloquear siguiente módulo
    const currentIdx = MODULES.findIndex(m => m.id === moduleId);
    if (currentIdx < MODULES.length - 1) {
        const nextMod = MODULES[currentIdx + 1];
        if (!state.unlockedModules.includes(nextMod.id)) {
            state.unlockedModules.push(nextMod.id);
            triggerConfetti(100);
        }
    }

    // Logros de módulo
    checkModuleBadges(moduleId, {
        onUnlock: (badge) => _callbacks.onShowNotification(
            "¡LOGRO DESBLOQUEADO!", badge.name, badge.description, badge.icon, "badge"
        )
    });

    // Logro de todos los módulos completados
    if (state.completedModules.length === MODULES.length) {
        unlockBadge("badge-leyenda", {
            onUnlock: (badge) => _callbacks.onShowNotification(
                "¡LOGRO DESBLOQUEADO!", badge.name, badge.description, badge.icon, "badge"
            )
        });
    }

    saveState();
    _callbacks.onRenderModules();
    _callbacks.onRenderBadges();
    _callbacks.onUpdateUI();

    // Mensaje final en el terminal
    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.style.display = "block";
    feedbackArea.className     = "feedback-area success-feedback";
    feedbackArea.innerHTML     = `
        <p class="green-text">[COMPLETADO] ¡MÓDULO FINALIZADO! <i class="fa-solid fa-award"></i></p>
        <p>Has completado todos los desafíos del módulo. Se te han sumado +50 XP extras por finalización.</p>
    `;
    document.getElementById("btn-next-question").style.display = "none";
    document.getElementById("btn-hint").style.display          = "none";

    setTimeout(() => closeModal(), 2500);
}

// ── Atajos de teclado ────────────────────────
export function initKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
        const modal = document.getElementById("quiz-modal");
        if (!modal || modal.style.display !== "flex") return;

        // No interferir con inputs de texto
        const tag = document.activeElement.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;

        const key = e.key;

        if (key === "1" || key === "2" || key === "3") {
            const idx     = parseInt(key) - 1;
            const options = document.querySelectorAll(".option-btn");
            if (options[idx] && !currentQuiz.hasAnswered) options[idx].click();

        } else if (key.toLowerCase() === "h") {
            const hintBtn = document.getElementById("btn-hint");
            if (hintBtn && hintBtn.style.display !== "none") showHint();

        } else if (key === "Enter" || key === " ") {
            const nextBtn = document.getElementById("btn-next-question");
            if (nextBtn && nextBtn.style.display !== "none") {
                e.preventDefault();
                nextQuestion();
            }

        } else if (key === "Escape") {
            closeModal();
        }
    });
}
