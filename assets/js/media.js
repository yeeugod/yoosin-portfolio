/* Images (reserved size, responsive, lazy), hover/tap video, lightbox. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const SZ = window.IMG_SIZES || {};
  const BASE = "assets/img/", VBASE = "assets/video/";

  /* <img> with srcset; the parent reserves the space with aspect-ratio */
  function img(name, alt, o = {}) {
    const s = SZ[name];
    const src = BASE + name + ".jpg";
    const set = s ? `${BASE}${name}-sm.jpg 760w, ${src} ${s[0]}w` : "";
    const wh = s ? ` width="${s[0]}" height="${s[1]}"` : "";
    return `<img src="${src}"${set ? ` srcset="${set}" sizes="${o.sizes || "(max-width: 760px) 100vw, 50vw"}"` : ""}${wh} alt="${esc(alt || "")}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onload="this.classList.add('ok')" onerror="this.classList.add('ok','err');var t=this.closest('.tile');if(t){t.classList.add('imgerr');this.parentNode.dataset.err='${esc(L({ ko: "이미지를 불러오지 못했습니다 · 눌러서 다시 시도", en: "Could not load the image · tap to retry" }))}'}">`;
  }
  function ratio(name, fallback = "4 / 3") { const s = SZ[name]; return s ? `${s[0]} / ${s[1]}` : fallback; }

  /* ───── video: hover to play (desktop), tap to play (touch), button for keyboard ───── */
  const PLAY = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>`;
  const PAUSE = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>`;
  function video(name, poster, alt, o = {}) {
    return `<div class="vwrap" data-video="${name}">
      ${img(poster, alt, o)}
      <video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1" data-src="${VBASE}${name}.mp4"></video>
      <button type="button" class="vbtn" aria-pressed="false" data-vbtn>${PLAY}<span>${esc(L({ ko: "재생", en: "Play" }))}</span></button>
    </div>`;
  }
  const canHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches;
  let io;
  function wireVideos(root) {
    const reduce = YL.reduceMotion();
    if (!io) io = new IntersectionObserver((ents) => ents.forEach((en) => {
      const v = $("video", en.target);
      if (en.isIntersecting && v && !v.src) { v.src = v.dataset.src; v.preload = "metadata"; }
      if (!en.isIntersecting && v && !v.paused) setPlay(en.target, false);
    }), { rootMargin: "300px 0px" });
    $$(".vwrap", root).forEach((w) => {
      if (w.dataset.wired) return; w.dataset.wired = "1";
      io.observe(w);
      const host = w.closest(".tile, .fig") || w;
      if (!reduce) {
        host.addEventListener("mouseenter", () => { if (canHover()) setPlay(w, true); });
        host.addEventListener("mouseleave", () => { if (canHover()) setPlay(w, false); });
      }
      host.addEventListener("click", (e) => {
        if (e.target.closest("[data-vbtn]")) return;
        if (!canHover()) { e.preventDefault(); setPlay(w, !w.classList.contains("playing")); }
      });
      $("[data-vbtn]", w).addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); setPlay(w, !w.classList.contains("playing")); });
    });
  }
  function setPlay(w, on) {
    const v = $("video", w), b = $("[data-vbtn]", w);
    if (!v) return;
    if (on) {
      if (!v.src) v.src = v.dataset.src;
      const p = v.play(); if (p && p.catch) p.catch(() => {});
      w.classList.add("playing"); (w.closest(".tile, .fig") || w).classList.add("playing");
    } else { v.pause(); w.classList.remove("playing"); (w.closest(".tile, .fig") || w).classList.remove("playing"); }
    if (b) { b.setAttribute("aria-pressed", String(on)); b.innerHTML = (on ? PAUSE : PLAY) + `<span>${esc(on ? L({ ko: "일시정지", en: "Pause" }) : L({ ko: "재생", en: "Play" }))}</span>`; }
  }
  function stopAll(root) { $$(".vwrap.playing", root || document).forEach((w) => setPlay(w, false)); }

  /* ───── lightbox ───── */
  const lb = $("#lb");
  const LB = { items: [], i: 0, title: "", desc: "", ret: null };
  function lbRender(dir) {
    const it = LB.items[LB.i];
    const s = SZ[it.img];
    lb.innerHTML = `<button type="button" class="xbtn" data-lbx aria-label="${esc(L({ ko: "닫기", en: "Close" }))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg><span aria-hidden="true">${esc(L({ ko: "닫기", en: "Close" }))}</span></button>
      <div class="lb-stage"><img src="${BASE}${it.img}.jpg" ${s ? `width="${s[0]}" height="${s[1]}"` : ""} alt="${esc(LB.title + " — " + L(it.t))}" class="${dir ? "swap" : ""}" style="--dx:${dir > 0 ? "24px" : dir < 0 ? "-24px" : "0"}"></div>
      <div class="lb-bar"><p><b lang="en">${esc(LB.title)}</b>${esc(L(it.t))}<span class="count" aria-label="${LB.i + 1} / ${LB.items.length}">${LB.i + 1} / ${LB.items.length}</span></p>
      <div class="nav">${LB.items.length > 1 ? `<button type="button" class="xbtn" data-lbp aria-label="${esc(L({ ko: "이전 이미지", en: "Previous image" }))}">←</button><button type="button" class="xbtn" data-lbn aria-label="${esc(L({ ko: "다음 이미지", en: "Next image" }))}">→</button>` : ""}</div></div>`;
    const im = $(".lb-stage img", lb);
    if (dir) requestAnimationFrame(() => requestAnimationFrame(() => im.classList.remove("swap")));
  }
  /* the enlarged view is its own history step: browser back closes it first, then the detail */
  function lbOpen(items, i, title, ret) {
    if (!lb.hidden) lbDismiss();
    LB.items = items; LB.i = i; LB.title = title; LB.ret = ret || document.activeElement;
    lbRender(0); lb.hidden = false;
    LB.inert = ["#home", "#topbar", "#sheet", "#appwin"].map((s) => { const el = $(s); const was = el.inert; el.inert = true; return [el, was]; });
    const st = history.state || {};
    history.pushState(Object.assign({}, st, { yl: (st.yl || 0) + 1, lb: 1 }), "", location.href);
    LB.open = true;
    if (!YL.reduceMotion() && LB.ret && LB.ret.getBoundingClientRect) {
      // grow out of the tile that was selected
      const r = LB.ret.getBoundingClientRect(), im = $(".lb-stage img", lb), sr = $(".lb-stage", lb).getBoundingClientRect();
      const sx = r.width / sr.width, sy = r.height / sr.height;
      im.animate([{ transform: `translate(${r.left + r.width / 2 - (sr.left + sr.width / 2)}px, ${r.top + r.height / 2 - (sr.top + sr.height / 2)}px) scale(${Math.max(sx, sy)})`, opacity: .4 }, { transform: "none", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
    }
    requestAnimationFrame(() => lb.classList.add("in"));
    $("[data-lbx]", lb).focus();
  }
  function lbClose() {
    if (lb.hidden) return;
    if (history.state && history.state.lb) { history.back(); return; } // popstate finishes the close
    lbDismiss();
  }
  // close without touching history (route changes, popstate)
  function lbDismiss() {
    if (lb.hidden) return;
    LB.open = false;
    (LB.inert || []).forEach(([el, was]) => { el.inert = was; }); LB.inert = null;
    // shrink back into the tile it came from
    const im = $(".lb-stage img", lb), st = $(".lb-stage", lb), back = LB.ret;
    if (!YL.reduceMotion() && im && st && back && back.getBoundingClientRect && document.contains(back)) {
      const r = back.getBoundingClientRect(), sr = st.getBoundingClientRect();
      if (r.width && r.bottom > 0 && r.top < innerHeight) im.animate([{ transform: "none" }, { transform: `translate(${r.left + r.width / 2 - (sr.left + sr.width / 2)}px, ${r.top + r.height / 2 - (sr.top + sr.height / 2)}px) scale(${Math.max(r.width / sr.width, r.height / sr.height)})` }], { duration: 260, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    }
    lb.classList.remove("in");
    const fin = () => { if (!LB.open) { lb.hidden = true; lb.innerHTML = ""; } };
    if (YL.reduceMotion()) fin(); else setTimeout(fin, 280);
    const t = LB.ret;
    if (t && document.contains(t)) { t.focus({ preventScroll: true }); const r = t.getBoundingClientRect(); if (r.bottom < 60 || r.top > innerHeight - 40) t.scrollIntoView({ block: "center" }); }
  }
  window.addEventListener("popstate", () => { if (!lb.hidden && !(history.state && history.state.lb)) lbDismiss(); });
  function lbStep(d) { if (LB.items.length < 2) return; LB.i = (LB.i + d + LB.items.length) % LB.items.length; lbRender(d); }
  lb.addEventListener("click", (e) => {
    if (e.target.closest("[data-lbx]")) lbClose();
    else if (e.target.closest("[data-lbp]")) lbStep(-1);
    else if (e.target.closest("[data-lbn]")) lbStep(1);
    else if (e.target === lb) lbClose();
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); lbClose(); }
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "ArrowLeft") lbStep(-1);
  }, true);
  let sx = null;
  lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); sx = null; });
  YL.onLang(() => { if (!lb.hidden) lbRender(0); $$(".vwrap").forEach((w) => { const on = w.classList.contains("playing"); const b = $("[data-vbtn]", w); if (b) b.innerHTML = (on ? PAUSE : PLAY) + `<span>${esc(on ? L({ ko: "일시정지", en: "Pause" }) : L({ ko: "재생", en: "Play" }))}</span>`; }); });

  window.MEDIA = { img, ratio, video, wireVideos, stopAll, lbOpen, lbDismiss, get lbOpenNow() { return !lb.hidden; } };
})();
