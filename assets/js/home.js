/* Typographic home: a name on white, a scroll-linked move into a row of outlined project cards,
   cards that widen on hover, card ⇄ detail transition, routing, app window. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const C = window.CONTENT;
  const root = document.documentElement;
  const stage = $("#stage"), view = $("#view"), row = $("#home-grid"), after = $("#after");
  const nm = $("#ty-name"), sl = $("#ty-sub"), dn = $("#ty-down"), foot = $("#ty-foot"), fName = $("#ty-fname"), fSub = $("#ty-fsub");
  const sheet = $("#sheet"), sheetScroll = $("#sheet-scroll"), banner = $("#banner"), bTitle = $("#banner-title"), sheetBody = $("#sheet-body"), sheetCtl = $("#sheet-ctl");
  const appwin = $("#appwin"), appBar = $("#app-bar"), appRoot = $("#app-root"), appScroll = $("#app-scroll");
  const topbar = $("#topbar");
  const HOME = ["montauk", "grown", "makeit", "likethis", "art", "about"]; // reading order of the row: the projects, then About Me at the far right
  const byK = Object.fromEntries(C.cards.map((c) => [c.k, c]));
  // the large set title on each card and in its detail header (project names stay as written)
  const BIG = { montauk: ["Manual for", "Manuals"], grown: ["GROWN", "Recovery Scan"], makeit: ["Make It!"], likethis: ["Like this"], art: ["ART&", "DESIGN:)"], about: ["About Me"] };
  const TT = (c) => { const v = c.title; return !v ? [] : Array.isArray(v) ? v : L(v); };
  const isKo = (s) => /[가-힣]/.test(s);
  // the line under the set title: the Korean name in Korean, the descriptive English name where it adds one
  function nameOf(k) {
    if (k === "about") return "";
    const c = byK[k], t = TT(c).join(" ");
    if (YL.lang === "ko") return isKo(t) ? t : "";
    return k === "grown" ? t : "";
  }
  const SUBLINE = () => ({ a: L({ ko: "SK AIGEN 1기 지원 포트폴리오", en: "Portfolio for SK AIGEN Cohort 1" }), b: L({ ko: "이유신", en: "Yoosin Lee" }) });
  const S = { t: 0, I: 0, H: 0, W: 0, small: false, detail: null, app: false, busy: null, lastFocus: null, active: HOME[0] };
  const els = {};
  let reduce = YL.reduceMotion();
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => { reduce = YL.reduceMotion(); root.classList.toggle("ty-reduce", reduce); layout(); });
  root.classList.toggle("ty-reduce", reduce);

  /* ───── language switch: "EN / KOR", the current one in bold ───── */
  function langGroup(id) {
    const b = (code, label) => `<button type="button" data-lang="${code}" data-focus="lang-${id}-${code}" aria-pressed="${YL.lang === code}" lang="en" aria-label="${code === "ko" ? "한국어로 보기 (Korean)" : "View in English (영어)"}">${label}</button>`;
    return `<div class="lang ty-lang" role="group" aria-label="Language / 언어">${b("en", "EN")}<span aria-hidden="true">/</span>${b("ko", "KOR")}</div>`;
  }

  /* ───── cards ───── */
  function cardHtml(k, i) {
    const c = byK[k], n = String(i + 1).padStart(2, "0");
    return `<span class="pc-n" lang="en" aria-hidden="true">${n}</span>
      <span class="pc-v" lang="en" aria-hidden="true">${esc(BIG[k].join(" "))}</span>
      <span class="pc-w">
        <span class="pc-top"><span class="pc-chip" aria-hidden="true"></span><span class="pc-arr" aria-hidden="true">↗</span></span>
        <span class="pc-t" lang="en">${BIG[k].map((t) => `<span>${esc(t)}</span>`).join("")}</span>
        <span class="pc-k" data-i="k">${esc(nameOf(k))}</span>
        <span class="pc-d" data-i="d">${esc(L(c.desc))}</span>
      </span>`;
  }
  const cardLabel = (k) => `${BIG[k].join(" ")}${nameOf(k) ? " — " + nameOf(k) : ""} — ${L(byK[k].desc)}`;
  HOME.forEach((k, i) => {
    const a = document.createElement("a");
    a.className = "pc"; a.href = "#/" + k; a.dataset.k = k;
    a.style.setProperty("--c", byK[k].color);
    a.innerHTML = cardHtml(k, i); a.setAttribute("aria-label", cardLabel(k));
    row.appendChild(a); els[k] = a;
  });
  // the same five projects as a typographic list (wide screens; on phones the cards already read as a list)
  const list = $("#ty-list"), vt = $("#ty-view"), rowsL = {};
  HOME.forEach((k, i) => {
    const li = document.createElement("li"); li.style.setProperty("--i", i);
    li.innerHTML = `<a class="pl-r" href="#/${k}" data-k="${k}"><span class="pl-n" lang="en" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span class="pl-t" lang="en">${esc(BIG[k].join(" "))}</span><span class="pl-m"><span class="pl-k" data-i="k"></span><span class="pl-d" data-i="d"></span></span><span class="pl-a" aria-hidden="true">↗</span></a>`;
    li.firstChild.style.setProperty("--c", byK[k].color);
    list.appendChild(li); rowsL[k] = li.firstChild;
  });
  S.view = (() => { try { return localStorage.getItem("yl.view") === "list" ? "list" : "cards"; } catch (e) { return "cards"; } })();
  root.classList.toggle("ty-listv", S.view === "list");
  function viewGroup() {
    const b = (v, label) => `<button type="button" data-view="${v}" aria-pressed="${S.view === v}" lang="en">${label}</button>`;
    return `<div class="ty-vt" role="group" aria-label="${esc(L({ ko: "보기 방식", en: "View" }))}">${b("cards", "PROJECTS")}<span aria-hidden="true">/</span>${b("list", "LIST")}</div>`;
  }
  function setView(v) {
    if (v === S.view) return;
    S.view = v;
    try { localStorage.setItem("yl.view", v); } catch (e) {}
    root.classList.toggle("ty-listv", v === "list");
    vt.innerHTML = viewGroup();
  }
  vt.addEventListener("click", (e) => {
    const b = e.target.closest("[data-view]"); if (!b) return;
    setView(b.dataset.view);
    const nb = $(`[data-view="${b.dataset.view}"]`, vt); if (nb) nb.focus({ preventScroll: true });
  });
  function refreshText() {
    HOME.forEach((k) => {
      const a = els[k]; a.setAttribute("aria-label", cardLabel(k));
      const kn = $("[data-i=k]", a); kn.textContent = nameOf(k); kn.hidden = !nameOf(k);
      $("[data-i=d]", a).textContent = L(byK[k].desc);
      const r = rowsL[k]; r.setAttribute("aria-label", cardLabel(k));
      const rk = $("[data-i=k]", r); rk.textContent = nameOf(k); rk.hidden = !nameOf(k);
      $("[data-i=d]", r).textContent = L(byK[k].desc);
    });
    vt.innerHTML = viewGroup();
    const s = SUBLINE();
    sl.innerHTML = `<span class="ty-sa">${esc(s.a)}</span><span class="ty-sb"> / ${esc(s.b)}</span>`;
    fSub.textContent = L({ ko: "SK 아이젠 1기 지원 포트폴리오", en: "Portfolio for SK AIGEN Cohort 1" }); // the footer's right-hand line
    dn.setAttribute("aria-label", L({ ko: "프로젝트 보기", en: "See the projects" }));
    $("#skip-link").textContent = L(C.ui.skip);
    topbar.innerHTML = langGroup("home");
  }

  /* hover / focus: the card under the pointer widens, the others narrow; leaving the row returns to the first */
  const F = { pos: 0, tgt: 0, raf: 0, snapT: 0, from: null };
  function markActive(k) {
    if (S.active === k) return;
    S.active = k;
    HOME.forEach((x) => els[x].classList.toggle("on", x === k));
  }
  function applyFlow() {
    if (S.small) return;
    HOME.forEach((k, i) => {
      const g = Math.max(0, 1 - Math.abs(i - F.pos)), a = els[k];
      a.style.flexGrow = g.toFixed(4);
      a.style.setProperty("--wo", Math.max(0, Math.min(1, (g - 0.5) / 0.5)).toFixed(3)); // the set title shows once a card is mostly open
      a.style.setProperty("--vo", Math.max(0, 1 - g * 2.5).toFixed(3)); // the vertical label lets go early
    });
    markActive(HOME[Math.round(F.pos)]);
  }
  function clearFlow() { HOME.forEach((k) => { const a = els[k]; a.style.flexGrow = ""; a.style.removeProperty("--wo"); a.style.removeProperty("--vo"); }); }
  function tick() {
    F.raf = 0;
    const d = F.tgt - F.pos;
    F.pos = reduce || Math.abs(d) < 0.0008 ? F.tgt : F.pos + d * 0.11;
    applyFlow();
    if (F.pos !== F.tgt) F.raf = requestAnimationFrame(tick);
  }
  function flowTo(v, instant) {
    F.tgt = Math.max(0, Math.min(HOME.length - 1, v));
    if (instant) { cancelAnimationFrame(F.raf); F.raf = 0; F.pos = F.tgt; applyFlow(); return; }
    if (!F.raf) F.raf = requestAnimationFrame(tick);
  }
  function setActive(k, instant) { const i = HOME.indexOf(k); if (i >= 0) flowTo(i, instant); }
  row.addEventListener("focusin", (e) => {
    const a = e.target.closest(".pc"); if (!a) return;
    if (!S.small) setActive(a.dataset.k);
    if (!S.small && S.t < 1 && !S.detail) window.scrollTo({ top: S.I, behavior: reduce ? "auto" : "smooth" }); // keyboard: focusing a card completes the row
  });

  /* ───── measuring ───── */
  const mctx = document.createElement("canvas").getContext("2d");
  function per(lines, weight = 700, track = -0.035) { // width of the longest line at 100px
    mctx.font = `${weight} 100px "Neue Montreal", "Helvetica Neue", Arial, sans-serif`;
    return Math.max(...lines.map((l) => { const s = l.toUpperCase(); return mctx.measureText(s).width + track * 100 * (s.length - 1); })) / 100;
  }

  /* ───── layout ───── */
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const easeIO = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const G = {}; // geometry of the move

  function layout() {
    const W = root.clientWidth, H = window.innerHeight, prevT = S.t;
    S.W = W; S.H = H; S.small = W < 761;
    root.classList.toggle("ty-small", S.small);
    const m = S.small ? 16 : 28;
    root.style.setProperty("--ty-m", m + "px");
    // the row sits inside the pinned view on wide screens; on phones it follows the opening screen as a list
    if (S.small) clearFlow();
    if (S.small && row.parentNode !== after) after.appendChild(row);
    if (!S.small && row.parentNode !== view) view.insertBefore(row, foot);
    S.I = Math.round(H * (S.small ? 0.6 : 1.0));
    // once the projects are reached the opening screen is gone: no scroll range is left to go back into it
    stage.style.height = (S.arrived ? (S.small ? 0 : H) : S.I + H) + "px";
    // phones: the list starts right under the opening screen, so no empty screen scrolls by after the move
    after.style.marginTop = S.small ? (S.arrived ? (H - S.I) : -S.I) + "px" : "";

    // the name: as large as the width allows on the opening screen
    const pn = per(["YOOSIN LEE"]);
    // the name: set clearly, not as a poster; the subline reads as its caption
    const nfs = Math.floor(Math.min((W - 2 * m) * (S.small ? 0.62 : 0.36) / pn, H * 0.12, 112));
    nm.style.fontSize = nfs + "px";
    nm.style.transform = ""; sl.style.transform = "";

    if (!S.small) {
      // the row of cards: one wide, four narrow
      const rw = Math.round(Math.min(W - 2 * m, Math.max(W * 0.7, 880), 1400));
      const fh = foot.offsetHeight || 60;
      const rh = Math.round(Math.min(H * 0.6, rw * 0.6, H - fh - 120));
      const gap = W < 1024 ? 10 : 16, nw = Math.round(clamp(rw * 0.072, 56, 92));
      const ww = rw - (HOME.length - 1) * (nw + gap), p = W < 1024 ? 18 : 24;
      const top = Math.round((H - fh - rh) / 2 + 6);
      Object.assign(row.style, { left: Math.round((W - rw) / 2) + "px", top: top + "px", width: rw + "px", height: rh + "px" });
      root.style.setProperty("--pc-gap", gap + "px"); root.style.setProperty("--pc-nw", nw + "px"); root.style.setProperty("--pc-ww", ww + "px"); root.style.setProperty("--pc-p", p + "px");
      // one title size for every card: the largest that fits the longest name in the wide card
      const lines = HOME.reduce((a, k) => a.concat(BIG[k]), []);
      const ts = Math.floor(Math.min((ww - 2 * p) / per(lines), (rh - 2 * p - 120) / (2 * 0.9), 110));
      root.style.setProperty("--pc-ts", Math.max(24, ts) + "px");
      // the list takes the same box as the row: five rows, one title size that fits the longest name on one line
      Object.assign(list.style, { left: row.style.left, top: row.style.top, width: rw + "px", height: rh + "px" });
      // the title column: the row minus its padding, the number, the name/description column (33%), the arrow, the gaps and the hover shift
      const tcol = rw - 28 - 52 - 36 - 3 * 16 - (rw - 28) * 0.33 - 18;
      const lts = Math.floor(Math.min(rh / HOME.length * 0.46, tcol / per(HOME.map((k) => BIG[k].join(" "))), 64));
      root.style.setProperty("--pl-ts", Math.max(20, lts) + "px");
    } else {
      Object.assign(row.style, { left: "", top: "", width: "", height: "" });
      const p = 16, lines = HOME.reduce((a, k) => a.concat(BIG[k]), []);
      root.style.setProperty("--pc-p", p + "px");
      root.style.setProperty("--pc-ts", Math.max(24, Math.floor(Math.min((W - 2 * m - 2 * p) / per(lines), 46))) + "px");
    }

    // where the name and the subline start (centred) and where they settle (the footer)
    const nh = nm.offsetHeight, nwid = nm.offsetWidth, sh = sl.offsetHeight, swid = sl.offsetWidth;
    const gapNS = S.small ? 14 : 22, blockH = nh + gapNS + sh;
    const y0 = Math.round(H * 0.47 - blockH / 2);
    nm.style.left = Math.round((W - nwid) / 2) + "px"; nm.style.top = y0 + "px";
    sl.style.left = Math.round((W - swid) / 2) + "px"; sl.style.top = (y0 + nh + gapNS) + "px";
    const fr = fName.getBoundingClientRect(), sr = fSub.getBoundingClientRect();
    G.n = { x: (W - nwid) / 2, y: y0, s: parseFloat(getComputedStyle(fName).fontSize) / nfs, tx: fr.left, ty: fr.top };
    const slFs = parseFloat(getComputedStyle(sl).fontSize), fsFs = parseFloat(getComputedStyle(fSub).fontSize);
    G.s = { x: (W - swid) / 2, y: y0 + nh + gapNS, s: fsFs / slFs, tx: sr.left, ty: sr.top };
    if (S.I && !S.arrived) window.scrollTo(0, Math.round(prevT * S.I)); // keep the same state across resizes
    frame(true);
    if (S.detail) layoutBanner();
  }

  let raf = 0;
  function frame(force) {
    raf = 0;
    if (S.detail && !force) return; // the home is frozen under an open detail
    let t = S.arrived || !S.I ? 1 : clamp(window.scrollY / S.I);
    if (reduce) t = t < 0.5 ? 0 : 1; // reduced motion: the two states, without the move between them
    if (!force && Math.abs(t - S.t) < 1e-4) return;
    S.t = t;
    // 1 · the name and the subline travel to the footer
    const e = easeIO(clamp(t / 0.55));
    const n = G.n, s = G.s;
    nm.style.transform = `translate3d(${((n.tx - n.x) * e).toFixed(2)}px, ${((n.ty - n.y) * e).toFixed(2)}px, 0) scale(${lerp(1, n.s, e).toFixed(4)})`;
    if (S.small) {
      // phones: the subline stays behind and fades; the footer only carries the name and About Me
      sl.style.transform = `translate3d(0, ${(-30 * e).toFixed(1)}px, 0)`; sl.style.opacity = String(1 - clamp(t / 0.35));
    } else {
      sl.style.transform = `translate3d(${((s.tx - s.x) * e).toFixed(2)}px, ${((s.ty - s.y) * e).toFixed(2)}px, 0) scale(${lerp(1, s.s, e).toFixed(4)})`;
      sl.style.opacity = "";
    }
    sl.style.setProperty("--sb", String(1 - clamp(t / 0.3))); // " / 이유신" lets go first
    // the bold travelling name hands over to the footer's regular one over the last part of the move
    const x = clamp((e - 0.78) / 0.22);
    nm.style.opacity = String(1 - x); nm.style.visibility = x >= 1 ? "hidden" : "";
    fName.style.visibility = x > 0 ? "visible" : ""; fName.style.opacity = String(x);
    if (!S.small) sl.style.opacity = String(1 - x);
    sl.style.visibility = x >= 1 ? "hidden" : "";
    fSub.style.visibility = x > 0 ? "visible" : ""; fSub.style.opacity = String(x);
    dn.style.opacity = String(1 - clamp(t / 0.15)); dn.style.pointerEvents = t < 0.1 ? "" : "none";
    foot.style.setProperty("--fb", String(clamp((t - 0.5) / 0.4))); // phones: the footer gains its white band
    // 2 · the cards rise out of the middle line, one after another
    if (!S.small) {
      HOME.forEach((k, i) => {
        const p = ease(clamp((t - 0.32 - i * 0.06) / 0.32));
        const a = els[k];
        a.style.transform = p >= 1 ? "" : `scaleY(${Math.max(0.002, p).toFixed(4)})`;
        a.style.opacity = p >= 1 ? "" : String(clamp(p * 5));
        a.style.setProperty("--in", String(clamp((p - 0.7) / 0.3)));
        a.style.pointerEvents = p <= 0.05 ? "none" : "";
        // the list rows come in on the same beat, rising a little
        const li = rowsL[k].parentNode;
        li.style.opacity = p >= 1 ? "" : String(clamp(p * 1.4));
        li.style.transform = p >= 1 ? "" : `translate3d(0, ${(28 * (1 - p)).toFixed(1)}px, 0)`;
      });
      vt.style.opacity = String(clamp((t - 0.6) / 0.4)); vt.style.pointerEvents = t > 0.6 ? "" : "none";
    if (!S.small && t >= 1) applyFlow();
    } else HOME.forEach((k) => { const a = els[k]; a.style.transform = ""; a.style.opacity = ""; a.style.pointerEvents = ""; a.style.setProperty("--in", "1"); });
    root.classList.toggle("assembled", t >= 1);
    if (t >= 1 && !S.arrived && !S.detail) requestAnimationFrame(arrive);
  }
  let lastY = 0;
  window.addEventListener("scroll", () => {
    if (!raf) raf = requestAnimationFrame(() => frame(false));
    // phones: the language switch steps aside while reading down the list, and comes back on the way up
    const y = window.scrollY;
    if (!S.detail) topbar.classList.toggle("tb-hide", S.small && y > (S.arrived ? 40 : S.I * 0.8) && y > lastY);
    lastY = y;
  }, { passive: true });
  topbar.addEventListener("focusin", () => topbar.classList.remove("tb-hide"));
  let rz = 0;
  window.addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(layout); });
  dn.addEventListener("click", () => window.scrollTo({ top: S.I, behavior: reduce ? "auto" : "smooth" }));

  /* ───── arriving at the projects: one way. The opening screen is not scrolled back into. ───── */
  function arrive() {
    if (S.arrived) return;
    const y = window.scrollY;
    S.arrived = true; S.arrivedAt = Date.now(); root.classList.add("arrived");
    const d = S.detail; S.detail = null; layout(); S.detail = d;
    // keep the list where it was on phones; on wider screens the row simply stays pinned in place
    window.scrollTo(0, S.small ? Math.max(0, y - S.I) : 0);
    frame(true);
  }

  /* ───── on the project row, the card under the pointer widens ─────
     One continuous position runs through the five cards and eases toward the hovered one, so moving across
     the row glides through the cards in between; leaving the row returns to the first. */
  const rowMode = () => S.arrived && !S.small && !S.detail && S.view === "cards" && $("#lb").hidden;
  row.addEventListener("pointerover", (e) => { if (e.pointerType !== "mouse" || S.small) return; const a = e.target.closest(".pc"); if (a) setActive(a.dataset.k); });
  row.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !S.detail && !row.contains(document.activeElement)) setActive(HOME[0]); });
  // the name in the footer points at its own card: hovering it opens About Me out (in the list, its row fills in)
  fName.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse" || !S.arrived || S.small || S.detail) return;
    if (S.view === "cards") setActive("about"); else rowsL.about.classList.add("hl");
  });
  fName.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    rowsL.about.classList.remove("hl");
    if (S.view === "cards" && !S.detail && !row.matches(":hover")) setActive(HOME[0]);
  });
  list.addEventListener("focusin", () => { if (!S.small && S.t < 1 && !S.detail) window.scrollTo({ top: S.I, behavior: reduce ? "auto" : "smooth" }); });
  document.addEventListener("keydown", (e) => {
    if (!rowMode() || e.altKey || e.metaKey || e.ctrlKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    const d = { ArrowDown: 1, ArrowRight: 1, PageDown: 1, ArrowUp: -1, ArrowLeft: -1, PageUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const n = clamp(Math.round(F.tgt) + d, 0, HOME.length - 1);
    if (row.contains(document.activeElement)) els[HOME[n]].focus({ preventScroll: true });
    flowTo(n);
  });
  // phones: cards fade up as they come into view
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("seen"); io.unobserve(x.target); } }), { threshold: 0.15 });
    HOME.forEach((k) => io.observe(els[k]));
  } else HOME.forEach((k) => els[k].classList.add("seen"));

  // detail controls: step aside while reading down, come back on the way up (and whenever focused)
  let lastSy = 0;
  sheetScroll.addEventListener("scroll", () => {
    const y = sheetScroll.scrollTop;
    let away = y > 140 && y > lastSy + 2 ? true : y < lastSy - 2 ? false : sheetCtl.classList.contains("away");
    // ART & DESIGN: while the category bar is pinned to the top, the controls stay away in both directions
    const mark = $(".cats-mark", sheetBody);
    if (mark && mark.getBoundingClientRect().top - sheetScroll.getBoundingClientRect().top < sheetCtl.offsetHeight) away = y > 140 ? true : away;
    sheetCtl.classList.toggle("away", away); sheet.classList.toggle("ctl-away", away); lastSy = y;
  }, { passive: true });
  sheetCtl.addEventListener("focusin", () => { sheetCtl.classList.remove("away"); sheet.classList.remove("ctl-away"); });

  /* ───── freeze the home under an open detail ───── */
  function freezeHome(on) {
    if (on) {
      if (root.classList.contains("lock")) return;
      const off = S.small ? 0 : Math.max(0, window.scrollY - S.I);
      if (!S.small) { view.style.position = "fixed"; view.style.top = (-off) + "px"; view.style.left = "0"; view.style.right = "0"; }
      root.classList.add("lock");
    } else {
      root.classList.remove("lock");
      view.style.position = ""; view.style.top = ""; view.style.left = ""; view.style.right = "";
    }
  }

  /* ───── detail sheet: a typographic header in the card's own layout ───── */
  const ctlHtml = () => `<button type="button" class="ty-back" id="sheet-close" aria-label="${esc(L({ ko: "작품 목록으로 돌아가기", en: "Back to all work" }))}"><span aria-hidden="true">←</span><span lang="en">YOOSIN LEE</span></button>${langGroup("sheet")}`;
  const bannerSub = (k) => k === "about" ? L(C.about.sub) : L(byK[k].desc);
  function fillBanner(k) {
    const lines = BIG[k];
    bTitle.className = "b-title ty-bt";
    bTitle.setAttribute("lang", "en");
    bTitle.innerHTML = lines.map((t) => `<span>${esc(t)}</span>`).join("");
    bTitle.setAttribute("tabindex", "-1");
    let meta = $(".ty-meta", banner);
    if (!meta) { meta = document.createElement("div"); meta.className = "ty-meta"; banner.appendChild(meta); }
    const kn = nameOf(k);
    meta.innerHTML = `<span class="ty-chip" aria-hidden="true"></span>${kn ? `<span class="ty-bk">${esc(kn)}</span>` : ""}<span class="b-sub">${esc(bannerSub(k))}</span>`;
  }
  function layoutBanner() {
    const k = S.detail; if (!k) return;
    const bp = S.small ? 16 : 28;
    banner.style.setProperty("--bp", bp + "px");
    // the title spans the same column as the page below it (the banner's side padding follows that column)
    const cs = getComputedStyle(banner);
    const avail = (banner.clientWidth || S.W) - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 4;
    let ts = Math.min(avail / per(BIG[k]), S.small ? 72 : 210, (S.H * (S.small ? 0.3 : 0.42)) / (0.9 * BIG[k].length));
    banner.style.setProperty("--bp", bp + "px");
    banner.style.setProperty("--bts", Math.floor(ts) + "px");
    const tw = bTitle.scrollWidth; if (tw > avail && tw > 0) { ts = ts * avail / tw; banner.style.setProperty("--bts", Math.floor(ts) + "px"); }
    S.bannerTs = Math.floor(ts);
  }
  function fillSheet(k) {
    const c = byK[k];
    sheet.style.setProperty("--c", c.color); sheet.style.setProperty("--ci", c.ink);
    banner.style.setProperty("--c", c.color); banner.style.setProperty("--ci", c.ink);
    fillBanner(k);
    sheet.setAttribute("aria-label", k === "about" ? "About Me" : BIG[k].join(" "));
    sheetCtl.innerHTML = ctlHtml(); sheetCtl.classList.remove("away"); sheet.classList.remove("ctl-away");
    sheetBody.innerHTML = window.DETAIL.render(k);
    window.DETAIL.mount(k, sheetBody, sheetScroll);
    const cats = $(".cats", sheetBody); // a marker at the category bar's own place tells when the bar is pinned
    if (cats) { const mk = document.createElement("div"); mk.className = "cats-mark"; mk.setAttribute("aria-hidden", "true"); cats.before(mk); }
  }
  // the element a detail opens from (and returns to): its card, or the About Me link in the footer
  const listOn = () => S.view === "list" && !S.small;
  const srcOf = (k) => listOn() ? rowsL[k] : els[k];
  function srcBox(k) {
    const el = srcOf(k), r = el.getBoundingClientRect();
    const t = $(".pc-t, .pl-t", el), tr = t.getBoundingClientRect();
    return { r, tx: tr.left - r.left, ty: tr.top - r.top, fs: parseFloat(getComputedStyle(t).fontSize) };
  }
  function makeMorph(k, rect) {
    const m = document.createElement("div");
    m.className = "morph ty-morph" + (k === "about" ? " m-about" : "");
    m.style.setProperty("--c", byK[k].color);
    Object.assign(m.style, { left: rect.left + "px", top: rect.top + "px", width: rect.width + "px", height: rect.height + "px" });
    m.innerHTML = `<h2 class="ty-mt" lang="en">${BIG[k].map((t) => `<span>${esc(t)}</span>`).join("")}</h2>`;
    document.body.appendChild(m);
    return m;
  }
  function settle() {
    if (S.busy) { try { S.busy.forEach((a) => { a.finish(); a.onfinish && a.onfinish(); }); } catch (e) {} }
    S.busy = null;
    $$(".morph").forEach((m) => m.remove());
  }
  // make the card wide at once (no transition), so measuring finds it in its open shape
  function snapActive(k) {
    if (!els[k]) return;
    row.classList.add("notr"); setActive(k, true); void row.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => row.classList.remove("notr")));
  }

  function openDetail(k, opts = {}) {
    settle();
    const fromCard = !!opts.fromCard && !reduce;
    S.lastFocus = srcOf(k);
    if (fromCard && els[k] && !listOn() && S.active !== k) snapActive(k);
    const sb = fromCard ? srcBox(k) : null;
    S.detail = k;
    freezeHome(true); root.classList.add("sheet-open"); $("#home").inert = true; topbar.inert = true;
    sheet.hidden = false; sheet.classList.add("pre"); sheet.classList.remove("out");
    fillSheet(k); layoutBanner();
    sheetScroll.scrollTop = opts.scrollTop || 0;
    let finished = false;
    const done = () => {
      if (finished || S.detail !== k) return; finished = true;
      sheet.classList.remove("pre", "nob");
      $$(".morph").forEach((m) => m.remove());
      if (fromCard) banner.animate([{ backgroundColor: "#fff" }, { backgroundColor: byK[k].color }], { duration: 420, easing: "ease-out" }); // the colour fills in once the outline has opened
      srcOf(k).style.visibility = "";
      S.busy = null;
      if (!opts.noFocus) bTitle.focus({ preventScroll: true });
    };
    if (!fromCard) {
      requestAnimationFrame(() => requestAnimationFrame(() => { sheet.classList.remove("pre"); done(); }));
      return;
    }
    // the outline opens to the full screen; the title travels to its place in the header
    const tr = bTitle.getBoundingClientRect();
    const m = makeMorph(k, sb.r), h = $(".ty-mt", m);
    srcOf(k).style.visibility = "hidden";
    const D = S.small ? 420 : 560, EZ = "cubic-bezier(0.76,0,0.24,1)";
    const a1 = m.animate([
      { left: sb.r.left + "px", top: sb.r.top + "px", width: sb.r.width + "px", height: sb.r.height + "px" },
      { left: "0px", top: "0px", width: S.W + "px", height: S.H + "px" }
    ], { duration: D, easing: EZ, fill: "both" });
    const a2 = h.animate([
      { left: sb.tx + "px", top: sb.ty + "px", fontSize: sb.fs + "px" },
      { left: tr.left + "px", top: tr.top + "px", fontSize: S.bannerTs + "px" }
    ], { duration: D, easing: EZ, fill: "both" });
    S.busy = [a1, a2];
    setTimeout(() => { if (S.detail === k) sheet.classList.replace("pre", "nob"); }, D - 120);
    a1.onfinish = done;
    setTimeout(done, D + 250); // safety net: background tabs may never fire onfinish
  }

  function closeDetail(opts = {}) {
    const k = S.detail; if (!k) return;
    settle();
    if (S.app) closeApp({ instant: true });
    const src = srcOf(k);
    // a detail opened straight from a link: finish the row underneath first, so the header has a card to return to
    if (!S.arrived) { freezeHome(false); S.detail = null; arrive(); S.detail = k; freezeHome(true); }
    const instant = opts.instant || reduce;
    let closed = false;
    const finish = () => {
      if (closed) return; closed = true;
      sheet.hidden = true; sheet.classList.remove("pre", "out", "nob");
      root.classList.remove("sheet-open"); freezeHome(false); $("#home").inert = false; topbar.inert = false;
      $$(".morph").forEach((x) => x.remove());
      src.style.visibility = "";
      sheetBody.innerHTML = "";
      window.DETAIL.unmount && window.DETAIL.unmount();
      S.busy = null; S.detail = null;
      frame(true);
      if (!opts.noFocus) src.focus({ preventScroll: true });
    };
    if (instant) { finish(); return; }
    if (els[k] && !listOn()) snapActive(k);
    S.detail = null; frame(true); S.detail = k;
    const sb = srcBox(k), cr = sb.r;
    const tr = bTitle.getBoundingClientRect();
    // the header has scrolled away, or the card is off screen: a short fade instead of a move nobody can follow
    if (cr.bottom < 0 || cr.top > window.innerHeight || tr.bottom < 0) {
      sheet.classList.add("out", "nob");
      const fa = sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease" });
      S.busy = [fa]; fa.onfinish = finish; setTimeout(finish, 420); return;
    }
    const m = makeMorph(k, { left: 0, top: 0, width: S.W, height: S.H }), h = $(".ty-mt", m);
    sheet.classList.add("out", "nob");
    src.style.visibility = "hidden";
    const D = S.small ? 380 : 480, EZ = "cubic-bezier(0.76,0,0.24,1)";
    const a1 = m.animate([
      { left: "0px", top: "0px", width: S.W + "px", height: S.H + "px" },
      { left: cr.left + "px", top: cr.top + "px", width: cr.width + "px", height: cr.height + "px" }
    ], { duration: D, easing: EZ, fill: "forwards" });
    const a2 = h.animate([
      { left: tr.left + "px", top: tr.top + "px", fontSize: S.bannerTs + "px" },
      { left: sb.tx + "px", top: sb.ty + "px", fontSize: sb.fs + "px" }
    ], { duration: D, easing: EZ, fill: "forwards" });
    const hideT = setTimeout(() => { sheet.style.visibility = "hidden"; }, 60);
    S.busy = [a1, a2];
    const end = () => { clearTimeout(hideT); sheet.style.visibility = ""; finish(); };
    a1.onfinish = end;
    setTimeout(end, D + 250);
  }

  /* ───── app window ───── */
  const mounted = {};
  function appBarHtml(k) {
    const app = window.APPS[k];
    /* every app draws its own header: brand, title, a way back to the portfolio and the language switch */
    const back = `<button type="button" class="ab-back" id="app-back" aria-label="${esc(L(C.ui.backToProject))}"><span class="ab-arr" aria-hidden="true">←</span><span class="ab-bt" aria-hidden="true">${esc(L({ ko: "프로젝트로", en: "To the project" }))}</span></button>`;
    return `<div class="ab ab-${k}">${back}<div class="ab-brand" aria-hidden="true">${app.brand || ""}</div>
      <h2 class="app-title" id="app-title" tabindex="-1">${esc(L(app.title))}</h2>${YL.langToggle("ab-lang")}</div>`;
  }
  function openApp(opts = {}) {
    const k = S.detail; if (!k || !window.APPS[k]) return;
    S.app = true;
    appwin.style.setProperty("--c", byK[k].color); appwin.style.setProperty("--ci", byK[k].ink);
    appwin.dataset.k = k;
    appBar.innerHTML = appBarHtml(k);
    $$(".app-pane", appRoot).forEach((p) => p.hidden = p.dataset.k !== k);
    if (!mounted[k]) {
      const pane = document.createElement("div"); pane.className = "app-pane app-" + k; pane.dataset.k = k;
      appRoot.appendChild(pane); mounted[k] = pane;
      window.APPS[k].mount(pane, { scroller: appScroll });
    } else if (window.APPS[k].show) window.APPS[k].show();
    appScroll.scrollTop = window.APPS[k].scrollTop || 0;
    $$(".demo-video", sheetBody).forEach((v) => v.pause()); // the recording rests while the app itself is open
    appwin.hidden = false; sheet.inert = true;
    appwin.setAttribute("aria-label", L(window.APPS[k].title));
    if (!reduce && !opts.instant) {
      appwin.animate([{ transform: "translateY(24px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 300, easing: "cubic-bezier(.16,1,.3,1)" });
    }
    if (window.TOUR && TOUR.has(k)) TOUR.start(k); // Make It! / Like this open as a guided walk-through
    $("#app-title").focus({ preventScroll: true });
  }
  function closeApp(opts = {}) {
    if (!S.app) return;
    const k = appwin.dataset.k;
    if (window.APPS[k]) window.APPS[k].scrollTop = appScroll.scrollTop;
    S.app = false;
    const fin = () => {
      appwin.hidden = true; sheet.inert = false; if (window.TOUR) TOUR.stop();
      $$(".demo", sheetBody).forEach((d) => { const r = d.getBoundingClientRect(); if (d.dataset.user !== "off" && !reduce && r.bottom > 0 && r.top < innerHeight) { const v = $(".demo-video", d); if (v.src) v.play().catch(() => {}); } });
      if (!opts.noFocus) {
        // back to the launch button that opened the app, at the place it was read
        const all = $$("[data-open-app]", sheetBody), b = all[S.launchIdx || 0] || all[0];
        if (b) { b.focus({ preventScroll: true }); const r = b.getBoundingClientRect(), sr = sheetScroll.getBoundingClientRect(); if (r.top < sr.top + 40 || r.bottom > sr.bottom - 20) b.scrollIntoView({ block: "center" }); }
      }
    };
    if (reduce || opts.instant) { fin(); return; }
    let gone = false; const fin2 = () => { if (gone) return; gone = true; fin(); };
    const a = appwin.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(16px)" }], { duration: 200, easing: "ease" });
    a.onfinish = fin2; setTimeout(fin2, 450);
  }

  /* ───── routing (hash based, works on any static path) ───── */
  const VALID = new Set(C.cards.map((c) => c.k));
  const NO_APP = new Set(["montauk", "grown"]);
  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    const [k, sub] = h.split("/");
    if (!k || !VALID.has(k)) return { k: null };
    // demo-only apps never open on the public site (their code is not shipped); ?rec=1 lets the local recording script open them
    return { k, app: sub === "app" && !!window.APPS[k] && (!NO_APP.has(k) || /[?&]rec=1/.test(location.search)) };
  }
  function apply(route, opts = {}) {
    if (window.MEDIA && MEDIA.lbOpenNow) MEDIA.lbDismiss(); // a route change never leaves the enlarged view behind
    if (!route.k) { if (S.detail) closeDetail(); return; }
    if (S.detail !== route.k) {
      if (S.detail) closeDetail({ instant: true, noFocus: true });
      if (!opts.fromCard) arrive(); // came from a link or reload: the projects are already in place behind the sheet
      openDetail(route.k, { fromCard: opts.fromCard, noFocus: route.app });
    }
    if (route.app && !S.app) openApp({ instant: !opts.fromApp });
    if (!route.app && S.app) closeApp();
  }
  function go(hash, opts) {
    if (location.hash === hash) { apply(parse(), opts || {}); return; }
    history.pushState({ yl: (history.state && history.state.yl || 0) + 1 }, "", hash);
    apply(parse(), opts || {});
  }
  function back(fallback) {
    if (history.state && history.state.yl) history.back();
    else { history.replaceState(null, "", fallback); apply(parse()); }
  }
  window.addEventListener("hashchange", () => apply(parse()));

  /* ───── events ───── */
  function openFrom(e, k) {
    if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab / window: let the browser do it
    e.preventDefault();
    if (S.detail || root.classList.contains("sheet-open")) return; // already opening: ignore repeated clicks
    go("#/" + k, { fromCard: true });
  }
  row.addEventListener("click", (e) => {
    const a = e.target.closest(".pc"); if (!a) return;
    const k = a.dataset.k;
    // a narrow card opens out first, then its detail: the same card widening the row already uses
    if (!S.small && S.active !== k && !(e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
      e.preventDefault(); if (S.detail) return;
      setActive(k);
      setTimeout(() => { if (!S.detail && S.active === k) go("#/" + k, { fromCard: true }); }, reduce ? 0 : 720);
      return;
    }
    openFrom(e, k);
  });
  list.addEventListener("click", (e) => { const a = e.target.closest(".pl-r"); if (a) openFrom(e, a.dataset.k); });
  sheet.addEventListener("click", (e) => {
    if (e.target.closest("#sheet-close")) { back("#/"); return; }
    const o = e.target.closest("[data-open-app]");
    if (o) { S.launchIdx = $$("[data-open-app]", sheetBody).indexOf(o); go(`#/${S.detail}/app`, { fromApp: true }); }
  });
  appwin.addEventListener("click", (e) => { if (e.target.closest("#app-back")) back(`#/${S.detail}`); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!$("#lb").hidden) return; // lightbox handles its own Esc
      // Esc that leaves a full-screen or zoomed recording only leaves that view; the detail stays open
      if (document.fullscreenElement || document.webkitFullscreenElement || $(".demo-stage.zoomed") || Date.now() - (window.__ylFsAt || 0) < 400) return;
      if (S.app) { e.preventDefault(); back(`#/${S.detail}`); }
      else if (S.detail) { e.preventDefault(); back("#/"); }
    }
    if (e.key === "Tab") trap(e);
  });
  function trap(e) {
    const box = !$("#lb").hidden ? $("#lb") : S.app ? appwin : S.detail ? sheet : null;
    if (!box) return;
    const f = $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),video[controls]', box).filter((x) => x.offsetParent !== null || x === document.activeElement);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  }

  /* ───── language ───── */
  YL.onLang(() => {
    const f0 = YL.captureFocus();
    refreshText();
    { const d = S.detail; S.detail = null; layout(); S.detail = d; }
    if (!S.detail) YL.restoreFocus(f0);
    if (S.detail) {
      const a = YL.captureAnchor(sheetScroll), f = YL.captureFocus();
      fillBanner(S.detail); layoutBanner();
      sheetCtl.innerHTML = ctlHtml();
      window.DETAIL.unmount && window.DETAIL.unmount();
      sheetBody.innerHTML = window.DETAIL.render(S.detail);
      window.DETAIL.mount(S.detail, sheetBody, sheetScroll, { relang: true });
      const cats = $(".cats", sheetBody);
      if (cats && !$(".cats-mark", sheetBody)) { const mk = document.createElement("div"); mk.className = "cats-mark"; mk.setAttribute("aria-hidden", "true"); cats.before(mk); }
      YL.restoreAnchor(sheetScroll, a);
      if (!S.app) YL.restoreFocus(f);
    }
    if (S.app) {
      const k = S.detail, f = YL.captureFocus(), a = YL.captureAnchor(appScroll);
      appBar.innerHTML = appBarHtml(k);
      appwin.setAttribute("aria-label", L(window.APPS[k].title));
      window.APPS[k].relang && window.APPS[k].relang();
      YL.restoreAnchor(appScroll, a); YL.restoreFocus(f);
    }
  });

  /* ───── start ───── */
  refreshText();
  S.active = null; markActive(HOME[0]);
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); });
  history.scrollRestoration = "manual";
  const first = parse();
  if (first.k) { history.replaceState({ yl: 0 }, "", location.hash); apply(first); }
  window.HOME = { go, back, frame: () => frame(true), get state() { return S; } };
})();
