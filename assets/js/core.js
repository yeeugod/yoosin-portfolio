/* Core runtime: language, storage, routing helpers, small UI utilities.
   Everything is plain JS so the site runs from any static host (GitHub Pages subpath included). */
(function () {
  "use strict";
  const LS_LANG = "yl.lang";
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    sget(k, d) { try { const v = sessionStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    sset(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  let lang = store.get(LS_LANG, "ko");
  if (lang !== "ko" && lang !== "en") lang = "ko";
  const listeners = new Set();

  /* L({ko, en}) or L("ko text", "en text") → text in the current language */
  function L(a, b) {
    if (a == null) return "";
    if (typeof a === "object" && !Array.isArray(a)) return a[lang] != null ? a[lang] : (a.ko != null ? a.ko : "");
    if (b !== undefined) return lang === "en" ? b : a;
    return a;
  }
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Remember the element nearest the top of a scroller, so a language switch that changes text length
     can put the same section back where the reader left it. */
  function captureAnchor(scroller) {
    const isWin = !scroller || scroller === window;
    const top = isWin ? 0 : scroller.getBoundingClientRect().top;
    const cands = $$("[data-anchor]", isWin ? document : scroller).filter((el) => !el.querySelector("[data-anchor]")); // innermost anchors only
    let best = null;
    for (const el of cands) {
      const r = el.getBoundingClientRect();
      if (r.height === 0) continue;
      if (r.bottom > top + 8) { best = { id: el.dataset.anchor, off: r.top - top }; break; }
    }
    return best;
  }
  function restoreAnchor(scroller, a) {
    if (!a) return;
    const isWin = !scroller || scroller === window;
    const el = (isWin ? document : scroller).querySelector(`[data-anchor="${CSS.escape(a.id)}"]`);
    if (!el) return;
    const top = isWin ? 0 : scroller.getBoundingClientRect().top;
    const delta = el.getBoundingClientRect().top - top - a.off;
    if (isWin) window.scrollBy(0, delta); else scroller.scrollTop += delta;
  }
  function captureFocus() {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const f = { id: el.id || null, key: el.dataset && (el.dataset.k || el.dataset.focus) || null };
    try { if (typeof el.selectionStart === "number") { f.s = el.selectionStart; f.e = el.selectionEnd; } } catch (e) {}
    return f;
  }
  function restoreFocus(f) {
    if (!f) return;
    let el = f.id ? document.getElementById(f.id) : null;
    if (!el && f.key) el = document.querySelector(`[data-k="${CSS.escape(f.key)}"],[data-focus="${CSS.escape(f.key)}"]`);
    if (!el) return;
    try { el.focus({ preventScroll: true }); if (f.s != null && el.setSelectionRange) el.setSelectionRange(f.s, f.e); } catch (e) {}
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next; store.set(LS_LANG, lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    listeners.forEach((fn) => { try { fn(lang); } catch (e) { console.error(e); } });
    syncLangButtons();
    announce(lang === "ko" ? "한국어로 표시합니다" : "Showing English");
  }
  function onLang(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  /* one button: a globe and the current language code; its accessible name says which language it switches to */
  const GLOBE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 3.8 5.8 3.8 9s-1.2 6.2-3.8 9c-2.6-2.8-3.8-5.8-3.8-9S9.4 5.8 12 3z"/></svg>`;
  const langLabel = () => lang === "ko" ? "Switch to English (영어로 보기)" : "한국어로 보기 (Switch to Korean)";
  function langToggle(extraClass = "") {
    const to = lang === "ko" ? "en" : "ko";
    return `<button type="button" class="lang ${extraClass}" data-lang="${to}" data-focus="lang-${extraClass || "home"}" aria-label="${langLabel()}">${GLOBE}<span class="lang-code" lang="en">${lang === "ko" ? "KOR" : "EN"}</span></button>`;
  }
  function syncLangButtons() {
    $$("button.lang").forEach((b) => { b.dataset.lang = lang === "ko" ? "en" : "ko"; b.setAttribute("aria-label", langLabel()); const c = $(".lang-code", b); if (c) c.textContent = lang === "ko" ? "KOR" : "EN"; });
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (b && b.closest(".lang")) { e.preventDefault(); setLang(b.dataset.lang); }
  });

  /* live region + toast */
  let live;
  function announce(msg) {
    if (!live) { live = document.createElement("div"); live.className = "sr-only"; live.setAttribute("aria-live", "polite"); document.body.appendChild(live); }
    live.textContent = ""; setTimeout(() => { live.textContent = msg; }, 30);
  }
  function toast(msg, kind = "") {
    $$(".toast").forEach((t) => t.remove());
    const t = document.createElement("div"); t.className = "toast " + kind; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("in"));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 220); }, 1800);
  }
  async function copyText(text, btn) {
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { ok = document.execCommand("copy"); } catch (e2) {} ta.remove();
    }
    if (btn) { btn.classList.add(ok ? "done" : "fail"); setTimeout(() => btn.classList.remove("done", "fail"), 1400); }
    toast(ok ? L("복사했습니다", "Copied") : L("복사하지 못했습니다. 글을 직접 선택해 주세요", "Couldn't copy — please select the text"), ok ? "ok" : "err");
    return ok;
  }
  /* Briefly mark elements whose value changed after a re-render */
  function flashChanged(root, prev) {
    const now = {};
    $$("[data-watch]", root).forEach((el) => {
      const k = el.dataset.watch, v = el.textContent.trim(); now[k] = v;
      if (prev && prev[k] != null && prev[k] !== v) { el.classList.remove("changed"); void el.offsetWidth; el.classList.add("changed"); }
    });
    return now;
  }

  const fmt = {
    won(v) {
      if (v == null || isNaN(v)) return "—";
      const a = Math.abs(v);
      if (lang === "en") { if (a >= 1e9) return "₩" + (v / 1e9).toFixed(2) + "B"; if (a >= 1e6) return "₩" + (v / 1e6).toFixed(2) + "M"; if (a >= 1e3) return "₩" + Math.round(v / 1e3).toLocaleString("en-US") + "K"; return "₩" + Math.round(v); }
      if (a >= 1e8) return (v / 1e8).toFixed(2) + "억원"; if (a >= 1e4) return Math.round(v / 1e4).toLocaleString("ko-KR") + "만원"; return Math.round(v).toLocaleString("ko-KR") + "원";
    },
    num(v, d = 0) { return v == null || isNaN(v) ? "—" : Number(v).toLocaleString(lang === "en" ? "en-US" : "ko-KR", { maximumFractionDigits: d, minimumFractionDigits: d }); }
  };

  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  window.YL = { L, esc, $, $$, store, get lang() { return lang; }, setLang, onLang, langToggle, syncLangButtons, toast, copyText, announce,
    captureAnchor, restoreAnchor, captureFocus, restoreFocus, reduceMotion, flashChanged, fmt };
})();
