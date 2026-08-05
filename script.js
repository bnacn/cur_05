/* ==========================================================================
   script.js — Motor de la actividad interactiva SGCN
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. ESTADO Y ESTRUCTURA DE NAVEGACIÓN
     --------------------------------------------------------------------- */

  // Aplana módulos/pasos en una lista secuencial para navegación lineal.
  // Los módulos marcados con scrollGroup se aplanan en UN solo paso que
  // contiene todas sus secciones, renderizadas en una página continua.
  const flatSteps = [];
  CONTENT.modules.forEach((mod, mIdx) => {
    if (mod.scrollGroup) {
      flatSteps.push({ moduleIdx: mIdx, module: mod, isGroup: true, subSteps: mod.steps });
    } else {
      mod.steps.forEach((step, sIdx) => {
        flatSteps.push({ moduleIdx: mIdx, stepIdx: sIdx, module: mod, step });
      });
    }
  });

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const state = {
    current: 0,               // índice dentro de flatSteps
    visited: new Set(),       // ids de pasos visitados
    completedSteps: new Set(),// pasos con interacción mínima resuelta
    matching: {},             // { "2-3": { matchedLetters:Set, currentIdx:0 } }
    classification: {},       // { "3-2": { answers: {caseIdx: optionLabel} } }
    simulation: {},           // { "4-2": { answers: {decisionId: optionId}, decisionIdx:0, showAnalysis:false } }
    onFinalScreen: false
  };

  /* ---------------------------------------------------------------------
     2. REFERENCIAS DOM
     --------------------------------------------------------------------- */
  const el = {
    intro: document.getElementById("screen-intro"),
    btnStart: document.getElementById("btn-start"),
    app: document.getElementById("app"),
    sidebar: document.getElementById("sidebar"),
    moduleNav: document.getElementById("module-nav"),
    progressLabel: document.getElementById("progress-label"),
    progressPct: document.getElementById("progress-pct"),
    progressFill: document.getElementById("progress-fill"),
    stepContent: document.getElementById("step-content"),
    mainScroll: document.getElementById("main-scroll"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    footerDots: document.getElementById("footer-dots"),
    transition: document.getElementById("module-transition"),
    transitionEyebrow: document.getElementById("transition-eyebrow"),
    transitionTitle: document.getElementById("transition-title"),
    mobileToggle: document.getElementById("mobile-nav-toggle"),
    screenFinal: document.getElementById("screen-final"),
    finalCode: document.getElementById("final-code")
  };

  /* ---------------------------------------------------------------------
     3. ARRANQUE
     --------------------------------------------------------------------- */
  el.btnStart.addEventListener("click", () => {
    el.intro.hidden = true;
    el.app.hidden = false;
    buildSidebar();
    goTo(0, { silent: true });
  });

  el.btnPrev.addEventListener("click", () => step(-1));
  el.btnNext.addEventListener("click", () => step(1));
  el.mobileToggle.addEventListener("click", () => toggleSidebar());

  document.addEventListener("keydown", (e) => {
    if (el.app.hidden) return;
    if (e.key === "ArrowRight" && !el.btnNext.disabled) step(1);
    if (e.key === "ArrowLeft" && !el.btnPrev.disabled) step(-1);
  });

  /* ---------------------------------------------------------------------
     4. SIDEBAR
     --------------------------------------------------------------------- */
  function buildSidebar() {
    el.moduleNav.innerHTML = "";
    CONTENT.modules.forEach((mod, mIdx) => {
      const wrap = document.createElement("div");
      wrap.className = "nav-module";
      wrap.dataset.moduleIdx = mIdx;
      const flatIdxForModule = flatSteps.findIndex(f => f.moduleIdx === mIdx);

      const btn = document.createElement("button");
      btn.className = "nav-module-btn";
      btn.innerHTML = `
        <span class="nav-module-num">${mod.id}</span>
        <span class="nav-module-btn-label">${mod.title}</span>
        <svg class="nav-module-chev" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      btn.addEventListener("click", () => {
        wrap.classList.toggle("is-open");
      });

      const stepsWrap = document.createElement("div");
      stepsWrap.className = "nav-steps";
      mod.steps.forEach((s, sIdx) => {
        const sBtn = document.createElement("button");
        sBtn.className = "nav-step-btn";
        const fi = mod.scrollGroup ? flatIdxForModule : flatSteps.findIndex(f => f.moduleIdx === mIdx && f.stepIdx === sIdx);
        sBtn.dataset.flatIndex = fi;
        if (mod.scrollGroup) sBtn.dataset.anchor = s.id;
        sBtn.innerHTML = `<span class="nav-step-dot"></span><span>${s.navLabel}</span>`;
        sBtn.addEventListener("click", () => {
          const targetIdx = parseInt(sBtn.dataset.flatIndex, 10);
          if (mod.scrollGroup) {
            if (state.current !== targetIdx) {
              goTo(targetIdx);
              requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(s.id)));
            } else {
              scrollToSection(s.id);
              toggleSidebar(false);
            }
          } else {
            goTo(targetIdx);
          }
        });
        stepsWrap.appendChild(sBtn);
      });

      wrap.appendChild(btn);
      wrap.appendChild(stepsWrap);
      el.moduleNav.appendChild(wrap);
    });
  }

  function refreshSidebar() {
    const cur = flatSteps[state.current];
    document.querySelectorAll(".nav-module").forEach((wrap) => {
      const mIdx = parseInt(wrap.dataset.moduleIdx, 10);
      const modDef = CONTENT.modules[mIdx];
      wrap.classList.toggle("is-active", mIdx === cur.moduleIdx);
      if (mIdx === cur.moduleIdx) wrap.classList.add("is-open");

      const allVisited = modDef.steps.every((s) => state.visited.has(s.id));
      wrap.classList.toggle("is-complete", allVisited);

      wrap.querySelectorAll(".nav-step-btn").forEach((sBtn) => {
        if (modDef.scrollGroup) {
          sBtn.classList.toggle("is-visited", state.visited.has(sBtn.dataset.anchor));
          // is-current para scrollGroup lo maneja highlightSubNav() vía scrollspy
        } else {
          const fi = parseInt(sBtn.dataset.flatIndex, 10);
          const sid = flatSteps[fi].step.id;
          sBtn.classList.toggle("is-current", fi === state.current);
          sBtn.classList.toggle("is-visited", state.visited.has(sid));
        }
      });
    });
  }

  /* ---- Scrollspy para módulos de scroll continuo (2 y 3) ---- */
  let sectionObserver = null;
  function setupScrollSpy() {
    if (sectionObserver) sectionObserver.disconnect();
    const sections = document.querySelectorAll(".scroll-section");
    if (!sections.length) return;
    sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = en.target.dataset.sectionId;
          state.visited.add(id);
          highlightSubNav(id);
        }
      });
    }, { root: el.mainScroll, rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  function highlightSubNav(id) {
    document.querySelectorAll(".nav-step-btn[data-anchor]").forEach((btn) => {
      const active = btn.dataset.anchor === id;
      btn.classList.toggle("is-current", active);
    });
  }

  function scrollToSection(id) {
    const target = document.getElementById(`section-${id}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSidebar(force) {
    const open = force !== undefined ? force : !el.sidebar.classList.contains("is-open");
    el.sidebar.classList.toggle("is-open", open);
    let scrim = document.querySelector(".sidebar-scrim");
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "sidebar-scrim";
      scrim.addEventListener("click", () => toggleSidebar(false));
      document.body.appendChild(scrim);
    }
    scrim.classList.toggle("is-visible", open);
  }

  /* ---------------------------------------------------------------------
     5. NAVEGACIÓN PRINCIPAL
     --------------------------------------------------------------------- */
  function step(dir) {
    const next = state.current + dir;
    if (next < 0) return;
    if (next >= flatSteps.length) { showFinalScreen(); return; }

    const leaving = flatSteps[state.current];
    const entering = flatSteps[next];
    if (dir > 0 && leaving.moduleIdx !== entering.moduleIdx) {
      playTransition(entering.module, () => goTo(next));
    } else {
      goTo(next);
    }
  }

  function playTransition(mod, cb) {
    el.transitionEyebrow.textContent = `Módulo ${mod.id}`;
    el.transitionTitle.textContent = mod.title;
    el.transition.classList.add("is-active");
    setTimeout(() => {
      cb();
      setTimeout(() => el.transition.classList.remove("is-active"), 250);
    }, 650);
  }

  function goTo(flatIndex, opts) {
    opts = opts || {};
    state.current = flatIndex;
    const entry = flatSteps[flatIndex];

    renderStep(entry);
    updateProgress();

    if (entry.isGroup) {
      setupScrollSpy();
      state.visited.add(entry.subSteps[0].id);
      highlightSubNav(entry.subSteps[0].id);
    } else {
      state.visited.add(entry.step.id);
    }

    refreshSidebar();
    toggleSidebar(false);
    el.mainScroll.scrollTop = 0;

    el.btnPrev.disabled = flatIndex === 0;
    el.btnNext.textContent = flatIndex === flatSteps.length - 1 ? "Finalizar actividad" : "Siguiente";
    updateNextButton();
  }

  function updateProgress() {
    const total = flatSteps.length;
    const pct = Math.round(((state.current + 1) / total) * 100);
    el.progressLabel.textContent = `Paso ${state.current + 1} de ${total}`;
    el.progressPct.textContent = `${pct}%`;
    el.progressFill.style.width = pct + "%";
    el.footerDots.textContent = `${flatSteps[state.current].module.title}`;
  }

  function updateNextButton() {
    el.btnNext.disabled = !isStepComplete(flatSteps[state.current]);
  }

  function isStepComplete(entry) {
    if (entry.isGroup) return entry.subSteps.every(isStepCompleteSingle);
    return isStepCompleteSingle(entry.step);
  }

  function isStepCompleteSingle(s) {
    if (s.type === "matching") {
      const st = state.matching[s.id];
      return st && st.matchedLetters.size === s.pairs.length;
    }
    if (s.type === "classification") {
      const st = state.classification[s.id];
      return st && Object.keys(st.answers).length === s.cases.length;
    }
    if (s.type === "simulation") {
      const st = state.simulation[s.id];
      return st && st.showAnalysis;
    }
    return true; // pasos de lectura / exploración libre
  }

  /* ---------------------------------------------------------------------
     6. RENDER — despachador por tipo de paso
     --------------------------------------------------------------------- */
  const RENDERERS = {
    story: renderStory,
    flipcards: renderFlipcards,
    "intro-text": renderIntroText,
    explorer: renderExplorer,
    matching: renderMatching,
    "comparison-table": renderComparisonTable,
    classification: renderClassification,
    infographic: renderInfographic,
    simulation: renderSimulation
  };

  function renderStep(entry) {
    const container = document.createElement("div");
    if (entry.isGroup) {
      renderScrollGroup(container, entry);
    } else {
      (RENDERERS[entry.step.type] || renderFallback)(container, entry.step);
    }
    el.stepContent.innerHTML = "";
    el.stepContent.appendChild(container);
  }

  function renderScrollGroup(root, entry) {
    entry.subSteps.forEach((sub, i) => {
      const section = document.createElement("section");
      section.className = "scroll-section";
      section.id = `section-${sub.id}`;
      section.dataset.sectionId = sub.id;
      (RENDERERS[sub.type] || renderFallback)(section, sub);
      root.appendChild(section);
      if (i < entry.subSteps.length - 1) {
        const divider = document.createElement("div");
        divider.className = "scroll-divider";
        root.appendChild(divider);
      }
    });
  }

  function renderFallback(root, s) {
    root.innerHTML = `<h2 class="step-title">${s.title}</h2><p>Contenido no disponible.</p>`;
  }

  /* ---- M1: Historia ilustrada ---- */
  const STORY_ICONS = {
    power: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
    alert: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 3.86 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.86a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
    link: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 1 1 0 10h-2M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    flag: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 21V4m0 1h13l-3 4.5L18 14H5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`
  };

  function renderStory(root, s) {
    // Agrupa los beats en "capítulos": cada beat con label abre un capítulo,
    // los beats sin label (continuaciones) se acumulan en el capítulo abierto.
    const chapters = [];
    s.beats.forEach((b) => {
      if (b.label) chapters.push({ label: b.label, icon: b.icon, texts: [b.text] });
      else chapters[chapters.length - 1].texts.push(b.text);
    });

    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <div class="story">
        ${chapters.map((ch, i) => {
          const isLast = i === chapters.length - 1;
          return `
          <div class="story-chapter ${isLast ? "is-closing" : ""}" style="animation-delay:${i * 110}ms">
            <div class="story-chapter-head">
              <span class="story-chapter-icon">${STORY_ICONS[ch.icon] || ""}</span>
              <span class="story-chapter-label">${ch.label}</span>
            </div>
            <div class="story-chapter-body">
              ${ch.texts.map(t => `<p>${t}</p>`).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>`;
  }

  /* ---- M2: Flip cards ---- */
  function renderFlipcards(root, s) {
    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <p class="cards-instructions">${s.instructions}</p>
      <div class="flipcards-grid">
        ${s.cards.map((c, i) => `
          <div class="flipcard" data-idx="${i}" role="button" tabindex="0" aria-label="Tarjeta ${c.title}">
            <div class="flipcard-inner">
              <div class="flipcard-face flipcard-front">
                <div>
                  <div class="flipcard-tag">Concepto</div>
                  <div class="flipcard-title">${c.title}</div>
                </div>
                <div class="flipcard-front-text">${c.front}</div>
                <div class="flipcard-hint">Tocar para ver más ↻</div>
              </div>
              <div class="flipcard-face flipcard-back">
                <div>
                  <div class="flipcard-tag">${c.title}</div>
                  <div class="flipcard-back-text">${c.back}</div>
                </div>
                <div class="flipcard-key">${c.key}</div>
              </div>
            </div>
          </div>`).join("")}
      </div>`;

    root.querySelectorAll(".flipcard").forEach((card) => {
      const flip = () => card.classList.toggle("is-flipped");
      card.addEventListener("click", flip);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    });
  }

  /* ---- Texto introductorio simple ---- */
  function renderIntroText(root, s) {
    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <div class="intro-text">${s.paragraphs.map(p => `<p>${p}</p>`).join("")}</div>`;
  }

  /* ---- M8: Exploración interactiva ---- */
  function renderExplorer(root, s) {
    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <p class="explorer-intro">${s.intro}</p>
      <div class="explorer-layout">
        <div class="explorer-list">
          ${s.components.map((c, i) => `
            <button class="explorer-node ${i === 0 ? "is-active" : ""}" data-idx="${i}">
              <span class="explorer-node-dot"></span>${c.name}
            </button>`).join("")}
        </div>
        <div class="explorer-detail" id="explorer-detail"></div>
      </div>
      <div class="explorer-closing">${s.closing}</div>`;

    function paintDetail(idx) {
      const c = s.components[idx];
      root.querySelector("#explorer-detail").innerHTML = `
        <div class="explorer-detail-title">${c.name}${c.full ? ` <span style="color:var(--ink-300);font-weight:500;font-size:15px;">— ${c.full}</span>` : ""}</div>
        <div class="explorer-detail-block">
          <div class="explorer-detail-label">Objetivo</div>
          <div class="explorer-detail-text">${c.objective}</div>
        </div>
        <div class="explorer-detail-block">
          <div class="explorer-detail-label">Explicación</div>
          <div class="explorer-detail-text">${c.explanation}</div>
        </div>
        <div class="explorer-detail-block" style="margin-bottom:0;">
          <div class="explorer-detail-label">Relación con el sistema</div>
          <div class="explorer-relation">${c.relation}</div>
        </div>`;
    }
    paintDetail(0);

    root.querySelectorAll(".explorer-node").forEach((btn) => {
      btn.addEventListener("click", () => {
        root.querySelectorAll(".explorer-node").forEach(b => { b.classList.remove("is-active"); b.classList.add("is-visited"); });
        btn.classList.add("is-active");
        paintDetail(parseInt(btn.dataset.idx, 10));
      });
    });
  }

  /* ---- M3: Relacionar conceptos ---- */
  function renderMatching(root, s) {
    if (!state.matching[s.id]) {
      const shuffled = shuffle(s.listB);
      const rows = s.pairs.map((pair, i) => ({
        component: pair.component,
        letter: pair.letter,
        correct: pair.correct,
        incorrect: pair.incorrect,
        pos: i % shuffled.length,
        locked: false,
        wrongLetter: null
      }));
      state.matching[s.id] = { shuffled, rows, matchedLetters: new Set() };
    }
    const st = state.matching[s.id];

    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <p class="matching-instructions">${s.instructions}</p>
      <p class="matching-warning">${s.warning}</p>
      <div class="matching-grid" id="matching-grid"></div>
      <div id="matching-summary"></div>`;

    paint();

    function paint() {
      const grid = root.querySelector("#matching-grid");
      grid.innerHTML = st.rows.map((row, i) => {
        const opt = st.shuffled[row.pos];
        const rowClass = row.locked ? "is-correct" : (row.wrongLetter ? "is-incorrect" : "");
        const feedbackMsg = row.locked
          ? row.correct
          : (row.wrongLetter ? (s.distractors[row.wrongLetter] || row.incorrect) : "");
        return `
          <div class="matching-row ${rowClass}">
            <div class="matching-row-component">${row.component}</div>
            <div class="matching-row-selector">
              <button class="matching-arrow" data-dir="-1" data-row="${i}" ${row.locked ? "disabled" : ""} aria-label="Opción anterior">‹</button>
              <div class="matching-row-option"><strong>${opt.letter}.</strong> ${opt.text}</div>
              <button class="matching-arrow" data-dir="1" data-row="${i}" ${row.locked ? "disabled" : ""} aria-label="Opción siguiente">›</button>
            </div>
            <div class="matching-row-footer">
              ${row.locked
                ? `<span class="matching-row-check">✓ Relación correcta</span>`
                : `<button class="btn btn-ghost matching-verify" data-row="${i}">Verificar</button>`}
            </div>
            ${feedbackMsg ? `<div class="matching-row-feedback ${row.locked ? "is-correct" : "is-incorrect"}">${feedbackMsg}</div>` : ""}
          </div>`;
      }).join("");

      const summary = root.querySelector("#matching-summary");
      summary.innerHTML = st.matchedLetters.size === s.pairs.length
        ? `<div class="matching-feedback is-correct"><span class="matching-feedback-title">¡Actividad completa!</span>${s.closing}</div>`
        : "";

      grid.querySelectorAll(".matching-arrow").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = parseInt(btn.dataset.row, 10);
          const dir = parseInt(btn.dataset.dir, 10);
          const row = st.rows[i];
          row.pos = (row.pos + dir + st.shuffled.length) % st.shuffled.length;
          row.wrongLetter = null;
          paint();
        });
      });
      grid.querySelectorAll(".matching-verify").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = parseInt(btn.dataset.row, 10);
          const row = st.rows[i];
          const opt = st.shuffled[row.pos];
          if (opt.letter === row.letter) {
            row.locked = true;
            row.wrongLetter = null;
            st.matchedLetters.add(row.letter);
          } else {
            row.wrongLetter = opt.letter;
          }
          paint();
          updateNextButton();
        });
      });
    }
  }

  /* ---- Cuadro comparativo ---- */
  function renderComparisonTable(root, s) {
    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <div class="comp-table-scroll">
        <table class="comp-table">
          <thead><tr><th></th><th>Incidente</th><th>Disrupción</th><th>Crisis</th></tr></thead>
          <tbody>
            ${s.rows.map(r => `
              <tr>
                <th>${r.question}</th>
                <td class="comp-col-incidente">${r.incidente}</td>
                <td class="comp-col-disrupcion">${r.disrupcion}</td>
                <td class="comp-col-crisis">${r.crisis}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }

  /* ---- Clasificación de escenarios ---- */
  function renderClassification(root, s) {
    if (!state.classification[s.id]) state.classification[s.id] = { answers: {} };
    const st = state.classification[s.id];

    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <p class="classif-instructions">${s.instructions}</p>
      <p class="matching-warning">${s.warning}</p>
      <div class="classif-list">
        ${s.cases.map((c, idx) => `
          <div class="classif-case-card" data-idx="${idx}">
            <p class="classif-case-index">Situación ${idx + 1}</p>
            <p class="classif-case-text">${c.text}</p>
            <div class="classif-options">
              ${s.options.map(opt => `<button class="classif-option" data-opt="${opt}" data-idx="${idx}">${opt}</button>`).join("")}
            </div>
            <div class="classif-feedback-wrap" id="classif-fb-${idx}"></div>
          </div>`).join("")}
      </div>`;

    s.cases.forEach((c, idx) => { if (st.answers[idx]) paintFeedback(idx, st.answers[idx]); });

    root.querySelectorAll(".classif-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (st.answers[idx]) return;
        const choice = btn.dataset.opt;
        st.answers[idx] = choice;
        paintFeedback(idx, choice);
        updateNextButton();
      });
    });

    function paintFeedback(idx, choice) {
      const c = s.cases[idx];
      const card = root.querySelector(`.classif-case-card[data-idx="${idx}"]`);
      card.querySelectorAll(".classif-option").forEach((b) => {
        b.disabled = true;
        if (b.dataset.opt === choice) b.classList.add("is-selected", choice === c.correct ? "is-correct" : "is-incorrect");
        if (b.dataset.opt === c.correct && choice !== c.correct) b.classList.add("reveal-correct");
      });
      const isCorrect = choice === c.correct;
      card.querySelector(`#classif-fb-${idx}`).innerHTML = `
        <div class="classif-feedback ${isCorrect ? "is-correct" : "is-incorrect"}">
          <span class="classif-feedback-title">${isCorrect ? "Correcto" : "Para tener en cuenta"}</span>
          ${isCorrect ? c.correctFeedback : c.incorrectFeedback}
        </div>`;
    }
  }

  /* ---- M10: Infografía ---- */
  function renderInfographic(root, s) {
    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      <div class="infographic-intro">${s.intro.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="timeline">
        ${s.stages.map(st => `
          <div class="timeline-stage">
            <div class="timeline-dot">${st.n}</div>
            <div class="timeline-card">
              <div class="timeline-name">${st.name}</div>
              <div class="timeline-obj"><strong>Objetivo:</strong> ${st.objective}</div>
              <div class="timeline-key">${st.key}</div>
            </div>
          </div>`).join("")}
      </div>`;
  }

  /* ---- M5: Simulación de decisiones ---- */
  function renderSimulation(root, s) {
    if (!state.simulation[s.id]) {
      state.simulation[s.id] = { answers: {}, decisionIdx: 0, showAnalysis: false };
    }
    const st = state.simulation[s.id];

    root.innerHTML = `
      <h2 class="step-title">${s.title}</h2>
      ${s.contextImage ? `<div class="sim-hero"><img src="${s.contextImage}" alt="" loading="lazy"></div>` : ""}
      <div class="sim-context">${s.context.map(p => `<p>${p}</p>`).join("")}</div>
      <div id="sim-body"></div>`;

    paint();

    function paint() {
      const body = root.querySelector("#sim-body");
      if (st.showAnalysis) { paintAnalysis(body); return; }

      const d = s.decisions[st.decisionIdx];
      const already = st.answers[d.id];
      body.innerHTML = `
        <p class="matching-progress">Decisión ${st.decisionIdx + 1} de ${s.decisions.length}</p>
        <div class="sim-decision-head">
          ${d.image ? `<img class="sim-decision-image" src="${d.image}" alt="" loading="lazy">` : ""}
          <div>
            <div class="sim-decision-title">${d.title}</div>
            <p class="sim-decision-prompt">${d.prompt}</p>
          </div>
        </div>
        <div class="sim-options">
          ${d.options.map(o => `<button class="sim-option ${already === o.id ? "is-selected" : ""}" data-opt="${o.id}">${o.label}</button>`).join("")}
        </div>
        <div style="text-align:right;margin-top:22px;" id="sim-continue-wrap"></div>`;

      if (already) showContinue();

      body.querySelectorAll(".sim-option").forEach(btn => {
        btn.addEventListener("click", () => {
          st.answers[d.id] = btn.dataset.opt;
          body.querySelectorAll(".sim-option").forEach(b => b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          showContinue();
        });
      });

      function showContinue() {
        const wrap = body.querySelector("#sim-continue-wrap");
        const isLast = st.decisionIdx === s.decisions.length - 1;
        wrap.innerHTML = `<button class="btn btn-primary" id="sim-continue">${isLast ? "Ver análisis de mis decisiones" : "Continuar"}</button>`;
        wrap.querySelector("#sim-continue").addEventListener("click", () => {
          if (isLast) { st.showAnalysis = true; }
          else { st.decisionIdx += 1; }
          paint();
          updateNextButton();
        });
      }
    }

    function paintAnalysis(body) {
      body.innerHTML = `
        <div class="sim-analysis-section">
          <h3 style="font-size:20px;margin-bottom:18px;">Análisis de las decisiones seleccionadas</h3>
          ${s.decisions.map(d => {
            const chosen = st.answers[d.id];
            const a = d.analysis[chosen];
            return `
              <div class="sim-analysis-decision">
                <div class="sim-analysis-heading">
                  ${d.image ? `<img class="sim-analysis-thumb" src="${d.image}" alt="">` : ""}
                  <span>${d.title}</span>
                </div>
                <div class="sim-analysis-row">
                  <div class="sim-analysis-label">Elegiste</div>
                  <span class="sim-elegiste-chip">${a.elegiste}</span>
                </div>
                <div class="sim-analysis-row">
                  <div class="sim-analysis-label">Consecuencia</div>
                  <div class="sim-analysis-text">${a.consecuencia}</div>
                </div>
                <div class="sim-analysis-row" style="margin-bottom:0;">
                  <div class="sim-analysis-label">Concepto asociado</div>
                  <div class="sim-analysis-text">${a.concepto}</div>
                </div>
              </div>`;
          }).join("")}
        </div>
        <div class="sim-closing">
          <h3 style="font-size:18px;margin-bottom:14px;">Cierre de la simulación</h3>
          <ul class="sim-closing-list">
            ${s.closingPoints.map(p => `<li>${p}</li>`).join("")}
          </ul>
          <p style="font-size:14.5px;line-height:1.65;color:var(--ink-700);margin-bottom:14px;">${s.closingText}</p>
          <div class="sim-key-idea"><b>Idea clave.</b> ${s.keyIdea}</div>
        </div>`;
    }
  }

  /* ---------------------------------------------------------------------
     7. PANTALLA FINAL
     --------------------------------------------------------------------- */
  function generateCode() {
    const year = new Date().getFullYear();
    const useShort = Math.random() < 0.5;
    const digits = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");
    return useShort ? `SGCN-${digits(5)}` : `CN-${year}-${digits(5)}`;
  }

  function showFinalScreen() {
    document.getElementById("final-text1").textContent = CONTENT.final.text1;
    document.getElementById("final-text2").textContent = CONTENT.final.text2;
    document.getElementById("final-text3").textContent = CONTENT.final.text3;
    document.getElementById("final-instructions").textContent = CONTENT.final.codeInstructions;
    el.finalCode.textContent = generateCode();
    el.app.hidden = true;
    el.screenFinal.hidden = false;
    window.scrollTo(0, 0);
  }

})();
