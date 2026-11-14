/* Home mosaic, scroll-linked assembly, card ⇄ banner transition, routing, app window. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const C = window.CONTENT;
  const root = document.documentElement;
  const stage = $("#stage"), view = $("#view"), grid = $("#home-grid"), after = $("#after"), hint = $("#hint");
  const sheet = $("#sheet"), sheetScroll = $("#sheet-scroll"), banner = $("#banner"), bTitle = $("#banner-title"), sheetBody = $("#sheet-body"), sheetCtl = $("#sheet-ctl");
  const appwin = $("#appwin"), appBar = $("#app-bar"), appRoot = $("#app-root"), appScroll = $("#app-scroll");
  const topbar = $("#topbar");
  const ORDER = ["makeit", "likethis", "grown", "montauk", "art"]; // V5 reading order after the intro
  // home grid: the four projects first (left two columns on desktop), then the gallery and the profile.
  // This is also the document order, so Tab and screen readers meet the cards in the same sequence.
  const HOME = ["montauk", "grown", "makeit", "likethis", "art"];
  const DOM_ORDER = HOME.concat("about");
  // titles may differ by language; a Korean title is set in Pretendard, an English one in Neue Montreal
  const TT = (c, f = "title") => { const v = c[f]; return !v ? null : Array.isArray(v) ? v : L(v); };
  const isKo = (lines) => lines.some((t) => /[가-힣]/.test(t));
  const subOf = (c) => (c.sub ? L(c.sub) : "");
  const byK = Object.fromEntries(C.cards.map((c) => [c.k, c]));
  const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
  const ctlHtml = () => `<button type="button" class="sh-back" id="sheet-close" aria-label="${esc(L({ ko: "작품 목록으로 돌아가기", en: "Back to all work" }))}">${BACK}<span aria-hidden="true">${esc(L({ ko: "목록", en: "All work" }))}</span></button>${YL.langToggle("sh-lang")}`;
  const S = { t: 0, I: 0, H: 0, W: 0, rects: {}, start: {}, detail: null, app: false, busy: null, lastFocus: null, homeScroll: 0 };
  const els = {};
  let reduce = YL.reduceMotion();
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => { reduce = YL.reduceMotion(); layout(); });

  /* ───── build cards ───── */
  /* one geometric dot-and-line figure per card; same line weight and dot size everywhere, a different move on hover.
     Every move is a CSS transition, so leaving mid-way simply eases back from where it is. */
  function graphic(k) {
    const dot = (x, y, cls = "d", st = "") => `<circle class="${cls}" cx="${x}" cy="${y}" r="3.5" ${st ? `style="${st}"` : ""}/>`;
    let g = "";
    if (k === "about") { // a route that connects the dots
      const P = [[14, 96], [66, 40], [118, 78], [170, 24], [226, 58]], pts = P.map((p) => p.join(",")).join(" ");
      g = `<polyline class="l faint" points="${pts}"/><polyline class="l draw" pathLength="1" points="${pts}"/>${P.map((p, i) => dot(p[0], p[1], i < 2 ? "d" : "o", `--i:${i}`)).join("")}`;
    } else if (k === "art") { // an asymmetric grid that shifts its proportions
      g = [[36, 22], [92, -18], [150, 30], [204, -12]].map(([x, dx]) => `<line class="l mv" x1="${x}" y1="6" x2="${x}" y2="114" style="--dx:${dx}px"/>`).join("")
        + [[30, 24], [84, -20]].map(([y, dy]) => `<line class="l mv" x1="6" y1="${y}" x2="234" y2="${y}" style="--dy:${dy}px"/>`).join("")
        + dot(92, 30, "d mv", "--dx:88px;--dy:34px");
    } else if (k === "montauk") { // loose segments that fall into line, like steps on a page
      const S = [[18, 150, -24, 30, 10], [40, 118, 18, -18, -6], [62, 164, -9, 44, 4], [84, 96, 31, -30, 8], [106, 138, -16, 20, -4]];
      g = S.map(([y, len, rot, dx, dy], i) => `<line class="l seg" x1="70" y1="${y}" x2="${70 + len}" y2="${y}" style="--r:${rot}deg;--dx:${dx}px;--dy:${dy}px;--i:${i}"/>${dot(54, y, "d tick", `--i:${i}`)}`).join("");
    } else if (k === "grown") { // scattered points that sort themselves into rows
      const off = [[-30, 18], [14, -22], [-8, 30], [26, 12], [-20, -16], [8, 26], [30, -18], [-26, 8], [18, 20], [-12, -28], [22, -10], [-34, 22], [10, 28], [-18, -12], [28, 16], [-6, -26], [24, -24], [-28, 14]];
      let n = 0; for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const [dx, dy] = off[n]; g += dot(64 + c * 30, 24 + r * 36, (n % 7 === 0 ? "d" : "o") + " mv", `--dx:${dx}px;--dy:${dy}px;--i:${n}`); n++; }
    } else if (k === "makeit") { // two clusters, joined by a line
      const A = [[30, 46], [48, 60], [26, 74], [42, 88], [16, 60]], B = [[198, 44], [214, 62], [192, 76], [224, 84], [208, 30]];
      g = `<line class="l draw" pathLength="1" x1="48" y1="60" x2="192" y2="60"/>` + A.map((p) => dot(p[0], p[1], "o mv", "--dx:16px")).join("") + B.map((p) => dot(p[0], p[1], "o mv", "--dx:-16px")).join("") + dot(48, 60, "d") + dot(192, 60, "d");
    } else if (k === "likethis") { // two paths that meet
      g = `<path class="l draw" pathLength="1" d="M8 18 C 80 18, 120 60, 226 60"/><path class="l draw" pathLength="1" d="M8 102 C 90 102, 130 60, 226 60"/>` + dot(8, 18) + dot(8, 102, "o") + dot(226, 60, "d end");
    }
    return `<svg class="cg cg-${k}" viewBox="0 0 240 120" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">${g}</svg>`;
  }
  function cardInner(c) {
    if (c.k === "about") {
      return `<p class="eyebrow" lang="en">About Me</p>
        <p class="tag" lang="en">Design the missing link.<small data-i="aboutTag">${esc(L({ ko: "아이디어와 현실 사이, 빠져 있는 연결을 설계합니다.", en: "I design the link that is missing between an idea and the real world." }))}</small></p>
        ${graphic("about")}
        <div class="who"><h1 class="name" lang="en" aria-label="Yoosin Lee">YOOSIN LEE</h1><p class="role" data-i="desc">${esc(L(c.desc))}</p></div>
        <span class="arrow" aria-hidden="true">${ARROW}</span>`;
    }
    return `<h2 class="ct" lang="${isKo(TT(c)) ? "ko" : "en"}">${TT(c).map((t) => `<span>${esc(t)}</span>`).join("")}</h2>${graphic(c.k)}
      <span class="cb">${c.sub ? `<span class="kname" lang="${c.subEn ? "en" : "ko"}" data-i="sub" ${subOf(c) ? "" : "hidden"}>${esc(subOf(c))}</span>` : ""}<span class="cdesc" data-i="desc">${esc(L(c.desc))}</span></span>
      <span class="arrow" aria-hidden="true">${ARROW}</span>`;
  }
  function cardLabel(c) {
    if (c.k === "about") return `About Me — Yoosin Lee, ${L(c.desc)} — ${L("열기", "open")}`;
    return `${TT(c).join(" ")} — ${subOf(c) ? subOf(c) + ", " : ""}${L(c.desc)} — ${L("열기", "open")}`;
  }
  DOM_ORDER.map((k) => byK[k]).forEach((c) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = `card c-${c.k}`; b.dataset.k = c.k;
    b.style.setProperty("--c", c.color); b.style.setProperty("--ci", c.ink);
    b.innerHTML = cardInner(c); b.setAttribute("aria-label", cardLabel(c));
    grid.appendChild(b); els[c.k] = b;
  });
  function refreshCardText() {
    C.cards.forEach((c) => {
      const b = els[c.k]; b.setAttribute("aria-label", cardLabel(c));
      const d = $("[data-i=desc]", b); if (d) d.textContent = L(c.desc);
      const sb = $("[data-i=sub]", b); if (sb) { sb.textContent = subOf(c); sb.hidden = !subOf(c); }
      const t = $("[data-i=aboutTag]", b); if (t) t.textContent = L({ ko: "아이디어와 현실 사이, 빠져 있는 연결을 설계합니다.", en: "I design the link that is missing between an idea and the real world." });
    });
    hint.innerHTML = `${esc(L(C.ui.scroll))}<i></i>`;
    $("#skip-link").textContent = L(C.ui.skip);
    topbar.innerHTML = YL.langToggle();
  }

  /* ───── measuring ───── */
  const mctx = document.createElement("canvas").getContext("2d");
  function textW(lines, weight, upper, track, koWeight = 800, koTrack = -0.04) {
    const ko = lines.some((t) => /[가-힣]/.test(t));
    // Korean titles are set in Pretendard, so measure them in that face
    mctx.font = ko ? `${koWeight} 100px "Pretendard", "Apple SD Gothic Neo", sans-serif` : `${weight} 100px "Neue Montreal", "Helvetica Neue", Arial, sans-serif`;
    const tr = ko ? koTrack : track;
    return Math.max(...lines.map((l) => { const s = upper && !ko ? l.toUpperCase() : l; return mctx.measureText(s).width + tr * 100 * (s.length - 1); }));
  }
  function fitTitle(lines, w, h, max, reserveBottom) {
    const per = textW(lines, 700, true, -0.03) / 100;
    let ts = Math.min(max, (w * 0.985) / per);
    ts = Math.min(ts, (h - reserveBottom) / ((isKo(lines) ? 1.02 : 0.9) * lines.length));
    return Math.max(18, Math.floor(ts));
  }

  /* home card titles: one size, weight and leading for every card at a given screen size.
     The size is the largest that lets the longest title (in the current language) fit its card. */
  const CT = { w: 500, tr: -0.02, kw: 500, ktr: -0.03, lh: 1.04 };
  const ctPer = (lines) => textW(lines, CT.w, true, CT.tr, CT.kw, CT.ktr) / 100;
  const cardLines = (k) => k === "about" ? ["YOOSIN LEE"] : TT(byK[k]);

  /* ───── layout ───── */
  function rectsFor(W, H) {
    const m = W < 761 ? 16 : 20, g = W < 761 ? 6 : 8, out = {};
    const top = 68; // header strip that holds the language switch
    if (W >= 1024) {
      // two equal columns for the four projects, a slightly narrower third column for the gallery and the profile
      const gw = W - 2 * m, gh = Math.max(H - top - m, 600);
      const rw = Math.round(gw * 0.27), lw = (gw - rw - 2 * g) / 2, rh = (gh - g) / 2;
      const X = [m, m + lw + g, m + 2 * (lw + g)], Wd = [lw, lw, rw], Y = [top, top + rh + g];
      const R = (c, r) => ({ x: X[c], y: Y[r], w: Wd[c], h: rh });
      Object.assign(out, { montauk: R(0, 0), grown: R(1, 0), art: R(2, 0), makeit: R(0, 1), likethis: R(1, 1), about: R(2, 1) });
      out._h = top + gh + m; out._p = 26;
    } else if (W >= 600) {
      // two columns, read row by row in the same order as the list
      const gw = W - 2 * m, half = (gw - g) / 2, rH = Math.max(230, Math.min(H * 0.3, 300));
      let y = top;
      [["montauk", "grown"], ["makeit", "likethis"], ["art", "about"]].forEach(([a, b]) => { out[a] = { x: m, y, w: half, h: rH }; out[b] = { x: m + half + g, y, w: half, h: rH }; y += rH + g; });
      out._h = y - g + m; out._p = 20;
    } else {
      // one column: Manual for Manuals → GROWN → Make It! → Like this → ART & DESIGN → About Me
      const gw = W - 2 * m, h = 228;
      let y = top;
      DOM_ORDER.forEach((k) => { out[k] = { x: m, y, w: gw, h }; y += h + g; });
      out._h = y - g + m; out._p = 16;
    }
    return out;
  }
  function layout() {
    const W = document.documentElement.clientWidth, H = window.innerHeight;
    const prevT = S.t;
    S.W = W; S.H = H;
    S.rects = rectsFor(W, H);
    S.I = reduce ? 0 : Math.round(H * (W < 761 ? 0.55 : 0.85)); // V4: desktop 0.75–1.0 vh, mobile 0.45–0.65 vh of scroll
    stage.style.height = (S.I + H) + "px";
    after.style.height = Math.max(0, Math.ceil(S.rects._h - H)) + "px";
    const p = S.rects._p, small = W < 761;
    root.style.setProperty("--banner-h", (small ? Math.round(Math.min(196, Math.max(150, H * 0.21))) : Math.round(Math.min(310, Math.max(240, H * 0.3)))) + "px");
    // one common title size: the largest that fits every card's title (width and height), capped per screen size
    const reserve = small ? 70 : 84, cap = small ? 34 : W >= 1024 ? 56 : 44;
    let ts = cap;
    for (const k of DOM_ORDER) {
      const r = S.rects[k], lines = cardLines(k), avail = r.w - 2 * p - (k === "about" ? 0 : 4);
      ts = Math.min(ts, avail / ctPer(lines), (r.h - 2 * p - reserve - (k === "about" ? 60 : 0)) / (CT.lh * lines.length));
    }
    ts = Math.max(18, Math.floor(ts));
    S.ts = ts; root.style.setProperty("--cts", ts + "px");
    for (const k of HOME) {
      const r = S.rects[k], b = els[k], c = byK[k];
      b.style.left = r.x + "px"; b.style.top = r.y + "px"; b.style.width = r.w + "px"; b.style.height = r.h + "px";
      b.style.setProperty("--p", p + "px");
      const lines = TT(c); // titles break at their meaning, the same on every card size
      if (b.dataset.lines !== lines.join("|")) { const ct = $(".ct", b); ct.innerHTML = lines.map((t) => `<span>${esc(t)}</span>`).join(""); ct.lang = isKo(lines) ? "ko" : "en"; b.dataset.lines = lines.join("|"); }
      b.style.setProperty("--ts", ts + "px"); b.dataset.ts = ts;
      // the figure takes the free band between the title and the description
      const cb = $(".cb", b), gTop = p + ts * CT.lh * lines.length + (small ? 10 : 16), gBot = p + Math.max(cb ? cb.offsetHeight : 0, 44) + (small ? 10 : 16), avail = r.h - gTop - gBot;
      b.style.setProperty("--gt", gTop + "px"); b.style.setProperty("--gb", gBot + "px");
      b.style.setProperty("--gw", Math.min(r.w - 2 * p, Math.max(0, avail) * 2) + "px"); // the figure is 2:1, so this keeps its height inside the free band
      b.classList.toggle("no-g", avail < 34);
      // entry vectors: each card comes in from the side of the frame it sits nearest
      const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
      let dir;
      if (small) dir = [HOME.indexOf(k) % 2 ? 28 : -28, 0];
      else if (k === "grown") dir = [0, -(r.y + r.h + 60)];
      else if (k === "likethis") dir = [0, H - r.y + 60];
      else if (cx < W / 2) dir = [-(r.x + r.w + 60), cy > H / 2 ? H * 0.2 : 0];
      else dir = [W - r.x + 60, cy > H / 2 ? H * 0.3 : 0];
      S.start[k] = dir;
    }
    // about: from (almost) full frame to its cell
    const m = small ? 16 : 20;
    // the opening box ends above the scroll hint, with a clear gap, so the hint never sits on its border
    const hintH = reduce || !hint.offsetHeight ? 0 : hint.offsetHeight, hintB = parseFloat(getComputedStyle(hint).bottom) || 20;
    S.aboutStart = { x: m, y: 68, w: W - 2 * m, h: H - 68 - (hintH ? hintB + hintH + (small ? 14 : 18) : m) };
    S.aboutEnd = S.rects.about;
    const nameW = ctPer(["YOOSIN LEE"]);
    S.nameStart = Math.min((W - 2 * m - 60) / nameW, H * 0.26, 260);
    S.nameEnd = ts; // the profile name settles at the same size as every other card title
    // when the About card sits below the first screen (one or two columns), the opening box lifts away instead of shrinking off-screen
    S.aboutBelow = S.aboutEnd.y + S.aboutEnd.h > H;
    if (!reduce && S.I) { /* keep the same assembly state across resizes */ window.scrollTo(0, Math.round(prevT * S.I)); }
    frame(true);
    if (S.detail) layoutBanner();
  }
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const easeIO = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;

  let raf = 0;
  function frame(force) {
    raf = 0;
    if (S.detail && !force) return; // home is frozen under an open detail
    const t = reduce || !S.I ? 1 : clamp(window.scrollY / S.I);
    if (!force && Math.abs(t - S.t) < 1e-4) return;
    S.t = t;
    // phase 1: the lilac intro settles into the About card
    const p1 = easeIO(clamp(t / 0.25)); // 0–25%: the name moves into the About card, the dots appear
    const a = S.aboutStart, e = S.aboutEnd, ab = els.about;
    if (S.aboutBelow) {
      // narrow screens: the profile is the last card. The opening box lifts and fades as the projects arrive,
      // and is already settled in its place at the end of the list by the time the reader scrolls there.
      const q = easeIO(clamp((t - 0.04) / 0.4));
      if (q < 1) {
        ab.style.left = a.x + "px"; ab.style.top = a.y + "px"; ab.style.width = a.w + "px"; ab.style.height = a.h + "px";
        ab.style.transform = `translate3d(0, ${(-a.h * 0.35 * q).toFixed(1)}px, 0)`; ab.style.opacity = String(1 - q);
      } else {
        ab.style.left = e.x + "px"; ab.style.top = e.y + "px"; ab.style.width = e.w + "px"; ab.style.height = e.h + "px";
        ab.style.transform = ""; ab.style.opacity = "";
      }
    } else {
      ab.style.left = lerp(a.x, e.x, p1) + "px"; ab.style.top = lerp(a.y, e.y, p1) + "px";
      ab.style.width = lerp(a.w, e.w, p1) + "px"; ab.style.height = lerp(a.h, e.h, p1) + "px";
      ab.style.transform = ""; ab.style.opacity = "";
    }
    const pa = S.aboutBelow ? (t >= 0.44 ? 1 : 0) : p1; // the card's inner settling follows its own placement
    const small = S.W < 761;
    ab.style.setProperty("--ap", lerp(small ? 20 : 32, S.rects._p, pa) + "px");
    ab.style.setProperty("--an", lerp(S.nameStart, S.nameEnd, pa) + "px");
    ab.style.setProperty("--ar", lerp(small ? 20 : 30, small ? 15 : 19, pa) + "px");
    ab.style.setProperty("--ae", lerp(small ? 13 : 15, 13, pa) + "px");
    ab.style.setProperty("--tg", lerp(small ? 26 : Math.min(46, S.W * 0.034), 22, pa) + "px");
    ab.style.setProperty("--tl", String(1 - clamp(pa / 0.7)));
    // the name starts in the middle of the lilac box and settles at the bottom as the linework draws in — one progress value for both
    const who = $(".who", ab), tag = $(".tag", ab);
    if (who) {
      const h = lerp(a.h, e.h, pa), ap = lerp(small ? 20 : 32, S.rects._p, pa), wh = who.offsetHeight;
      const tagBottom = tag ? tag.offsetTop + tag.offsetHeight : 0;
      const centerTop = Math.max(h / 2 - wh / 2, tagBottom + 18), endTop = h - ap - wh;
      ab.style.setProperty("--wy", (Math.min(0, centerTop - endTop) * (1 - pa)).toFixed(1) + "px");
    }
    ab.style.setProperty("--dt", pa.toFixed(3));
    ab.style.setProperty("--lw", ease(clamp((t - 0.15) / 0.4)).toFixed(3)); // 15–55%: the lines extend
    // phase 2: the other five come in from different sides and complete the mosaic
    HOME.forEach((k, i) => {
      const s = 0.3 + i * 0.07, p = ease(clamp((t - s) / 0.32)); // 30–90%: the cards assemble, 90–100% settles
      const [dx, dy] = S.start[k];
      const b = els[k];
      b.style.transform = p >= 1 ? "none" : `translate3d(${dx * (1 - p)}px, ${dy * (1 - p)}px, 0)`;
      // not yet arrived: transparent but still in the tab order, so keyboard users reach the projects first
      // (focusing one completes the grid, see the focusin handler below)
      b.style.visibility = "visible";
      b.style.opacity = p <= 0 ? "0" : small && p < 1 ? String(clamp(p * 1.6)) : "";
      b.style.pointerEvents = p <= 0 ? "none" : "";
    });
    hint.style.opacity = String(1 - clamp(t / 0.08));
    root.classList.toggle("assembled", t >= 1);
  }
  let lastY = 0;
  window.addEventListener("scroll", () => {
    if (!raf) raf = requestAnimationFrame(() => frame(false));
    // the language switch steps aside while reading down the finished mosaic, and comes back on the way up
    const y = window.scrollY;
    if (!S.detail) topbar.classList.toggle("tb-hide", y > S.I + 40 && y > lastY);
    lastY = y;
  }, { passive: true });
  topbar.addEventListener("focusin", () => topbar.classList.remove("tb-hide"));
  // detail controls: step aside while reading down, come back on the way up (and whenever focused)
  let lastSy = 0;
  sheetScroll.addEventListener("scroll", () => { const y = sheetScroll.scrollTop; sheetCtl.classList.toggle("away", y > 140 && y > lastSy + 2 ? true : y < lastSy - 2 ? false : sheetCtl.classList.contains("away")); sheet.classList.toggle("ctl-away", sheetCtl.classList.contains("away")); lastSy = y; }, { passive: true });
  sheetCtl.addEventListener("focusin", () => { sheetCtl.classList.remove("away"); sheet.classList.remove("ctl-away"); });
  let rz = 0;
  window.addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(layout); });

  // keyboard users: focusing a card that hasn't arrived yet completes the mosaic
  grid.addEventListener("focusin", (e) => {
    const b = e.target.closest(".card"); if (!b || S.t >= 1 || S.detail) return;
    window.scrollTo({ top: S.I, behavior: reduce ? "auto" : "smooth" });
  });

  /* ───── freeze the home under an open detail (scroll lock would otherwise release the sticky stage) ───── */
  function freezeHome(on) {
    if (on) {
      if (root.classList.contains("lock")) return;
      const off = Math.max(0, window.scrollY - S.I);
      view.style.position = "fixed"; view.style.top = (-off) + "px"; view.style.left = "0"; view.style.right = "0";
      root.classList.add("lock");
    } else {
      root.classList.remove("lock");
      view.style.position = ""; view.style.top = ""; view.style.left = ""; view.style.right = "";
    }
  }

  /* ───── detail sheet ───── */
  function bannerLines(k) { return k === "about" ? ["YOOSIN LEE"] : (els[k].dataset.lines ? els[k].dataset.lines.split("|") : TT(byK[k])); }
  function bannerSub(k) { const c = byK[k]; return k === "about" ? `About Me · ${L(C.about.sub)}` : `${subOf(c) ? subOf(c) + " · " : ""}${L(c.desc)}`; }
  function layoutBanner() {
    const k = S.detail; if (!k) return;
    const W = S.W, small = W < 761, bp = small ? 16 : 26;
    // ART&DESIGN:) gets a lower banner so the first work shows sooner
    const bh0 = parseFloat(getComputedStyle(root).getPropertyValue("--banner-h")) || 300, reserve = small ? 40 : 52;
    const lines = bannerLines(k);
    const avail = W - 2 * bp - 8; // the controls sit in their own row above the banner now
    let bh = bh0, ts;
    if (k === "art") {
      // lower banner so the first work shows sooner, but never so low that the two-line title gets small
      const minTs = Math.min(small ? 46 : 88, avail / (textW(lines, 700, true, -0.03) / 100));
      bh = Math.max(Math.round(bh0 * 0.74), Math.ceil(2 * bp + 0.9 * minTs * lines.length + reserve));
    } else if (lines.length > 2) {
      // a three-line title (GROWN / RECOVERY / SCAN, as on its tall card) keeps its lines through the move, so the banner grows a little instead of shrinking the type
      const minTs = Math.min(small ? 40 : 72, avail / (textW(lines, 700, true, -0.03) / 100));
      bh = Math.min(Math.max(bh0, Math.ceil(2 * bp + 0.9 * minTs * lines.length + reserve)), Math.round(window.innerHeight * 0.45));
    }
    if (k === "about") { const per = textW(lines, 700, false, -0.03) / 100; ts = Math.min(avail / per, (bh - 2 * bp - 40) / 0.9, small ? 72 : 150); }
    else ts = fitTitle(lines, avail, bh - 2 * bp, small ? 64 : 150, reserve);
    // one-line titles (Make It!, Like this) do not need the full height: trim only the empty band under the title
    if (k !== "about" && lines.length === 1) bh = Math.min(bh, Math.ceil(2 * bp + 0.9 * ts + reserve + (small ? 18 : 30)));
    banner.style.height = bh !== bh0 ? bh + "px" : "";
    banner.style.setProperty("--bp", bp + "px");
    banner.style.setProperty("--bts", Math.floor(ts) + "px");
    // measure the real title and shrink if the font metrics ran wider than the estimate
    const tw = bTitle.scrollWidth; if (tw > avail && tw > 0) { ts = ts * avail / tw; banner.style.setProperty("--bts", Math.floor(ts) + "px"); }
    S.bannerTs = Math.floor(ts); S.bp = bp;
  }
  function fillSheet(k) {
    const c = byK[k];
    sheet.style.setProperty("--c", c.color); sheet.style.setProperty("--ci", c.ink);
    banner.style.setProperty("--c", c.color); banner.style.setProperty("--ci", c.ink);
    const bl = bannerLines(k);
    bTitle.className = "b-title" + (k === "about" ? " about" : "") + (isKo(bl) ? " ko" : "");
    bTitle.innerHTML = bl.map((t) => `<span lang="${isKo([t]) ? "ko" : "en"}">${esc(t)}</span>`).join("");
    bTitle.setAttribute("tabindex", "-1");
    let sub = $(".b-sub", banner); if (!sub) { sub = document.createElement("p"); sub.className = "b-sub"; banner.appendChild(sub); }
    sub.textContent = bannerSub(k);
    sheet.setAttribute("aria-label", k === "about" ? "About Me" : TT(c).join(" "));
    sheetCtl.innerHTML = ctlHtml(); sheetCtl.classList.remove("away"); sheet.classList.remove("ctl-away");
    sheetBody.innerHTML = window.DETAIL.render(k);
    window.DETAIL.mount(k, sheetBody, sheetScroll);
  }
  function makeMorph(k, rect, fromCard) {
    const c = byK[k];
    const m = document.createElement("div");
    m.className = "morph" + (k === "about" ? " m-about" : "");
    m.style.setProperty("--c", c.color); m.style.setProperty("--ci", c.ink);
    Object.assign(m.style, { left: rect.left + "px", top: rect.top + "px", width: rect.width + "px", height: rect.height + "px" });
    const lines = bannerLines(k);
    // two copies of the title travel together: the card's medium weight hands over to the banner's own setting on the way
    const spans = lines.map((t) => `<span>${esc(t)}</span>`).join("");
    m.innerHTML = `<h2 class="ct m-card${isKo(lines) ? " ko" : ""}">${spans}</h2><h2 class="ct m-ban${isKo(lines) ? " ko" : ""}" style="${k === "about" ? "line-height:.86" : ""}">${spans}</h2>`;
    document.body.appendChild(m);
    return m;
  }
  function cardTitleBox(k) {
    const b = els[k], r = b.getBoundingClientRect();
    if (k === "about") {
      const n = $(".name", b).getBoundingClientRect();
      return { x: n.left - r.left, y: n.top - r.top, fs: parseFloat(getComputedStyle($(".name", b)).fontSize) };
    }
    return { x: parseFloat(b.style.getPropertyValue("--p")), y: parseFloat(b.style.getPropertyValue("--p")), fs: parseFloat(b.dataset.ts) };
  }
  function settle() {
    if (S.busy) { try { S.busy.forEach((a) => { a.finish(); a.onfinish && a.onfinish(); }); } catch (e) {} }
    S.busy = null;
    $$(".morph").forEach((m) => m.remove());
  }

  function openDetail(k, opts = {}) {
    settle();
    const card = els[k];
    const fromCard = !!opts.fromCard && !reduce;
    S.lastFocus = card;
    S.homeScroll = window.scrollY;
    const cardRect = card.getBoundingClientRect();
    const tb = cardTitleBox(k);
    S.detail = k;
    freezeHome(true); root.classList.add("sheet-open"); $("#home").inert = true; topbar.inert = true;
    sheet.hidden = false; sheet.classList.add("pre"); sheet.classList.remove("out");
    fillSheet(k); layoutBanner();
    sheetScroll.scrollTop = opts.scrollTop || 0;
    card.classList.add("active");
    let finished = false;
    const done = () => {
      if (finished || S.detail !== k) return; finished = true;
      sheet.classList.remove("pre", "nob");
      $$(".morph").forEach((m) => m.remove());
      card.style.visibility = ""; card.classList.remove("active");
      S.busy = null;
      if (!opts.noFocus) bTitle.focus({ preventScroll: true });
    };
    if (!fromCard) {
      sheet.classList.add("pre");
      requestAnimationFrame(() => requestAnimationFrame(() => { sheet.classList.remove("pre"); done(); }));
      return;
    }
    const br = banner.getBoundingClientRect();
    const m = makeMorph(k, cardRect);
    card.style.visibility = "hidden";
    const hs = $$(".ct", m);
    // V4: the card fills with its colour first (~100ms), then the box and title move together; the body comes in over the last ~100ms
    const FILL = 100, D = S.W < 761 ? 320 : 420, EZ = "cubic-bezier(0.22,1,0.36,1)";
    const bg0 = getComputedStyle(card).backgroundColor;
    m.animate([{ backgroundColor: bg0, color: getComputedStyle(card).color }, { backgroundColor: byK[k].color, color: byK[k].ink }], { duration: FILL, easing: "ease-out", fill: "backwards" });
    const bts = S.bannerTs, bp = S.bp;
    const a1 = m.animate([
      { left: cardRect.left + "px", top: cardRect.top + "px", width: cardRect.width + "px", height: cardRect.height + "px" },
      { left: br.left + "px", top: br.top + "px", width: br.width + "px", height: br.height + "px" }
    ], { duration: D, delay: FILL, easing: EZ, fill: "both" });
    const a2 = hs.map((h) => h.animate([
      { left: tb.x + "px", top: tb.y + "px", fontSize: tb.fs + "px" },
      { left: bp + "px", top: bp + "px", fontSize: bts + "px" }
    ], { duration: D, delay: FILL, easing: EZ, fill: "both" }));
    const fx = [hs[0].animate([{ opacity: 1 }, { opacity: 0 }], { duration: D * 0.6, delay: FILL + D * 0.2, easing: "ease", fill: "both" }),
      hs[1].animate([{ opacity: 0 }, { opacity: 1 }], { duration: D * 0.6, delay: FILL + D * 0.2, easing: "ease", fill: "both" })];
    S.busy = [a1, ...a2, ...fx];
    // body comes in over the last part of the move
    setTimeout(() => { if (S.detail === k) sheet.classList.replace("pre", "nob"); }, FILL + D - 100);
    a1.onfinish = done;
    setTimeout(done, FILL + D + 250); // safety net: background tabs may never fire onfinish
  }

  function closeDetail(opts = {}) {
    const k = S.detail; if (!k) return;
    settle();
    if (S.app) closeApp({ instant: true });
    const card = els[k];
    // a detail opened straight from a link: assemble the grid underneath first, so the banner has a card to return to
    if (S.t < 1 && !reduce) { freezeHome(false); S.detail = null; window.scrollTo(0, S.I); frame(true); S.detail = k; freezeHome(true); }
    const instant = opts.instant || reduce;
    let closed = false;
    const finish = () => {
      if (closed) return; closed = true;
      sheet.hidden = true; sheet.classList.remove("pre", "out", "nob");
      root.classList.remove("sheet-open"); freezeHome(false); $("#home").inert = false; topbar.inert = false;
      $$(".morph").forEach((x) => x.remove());
      card.style.visibility = "";
      card.classList.remove("active");
      sheetBody.innerHTML = "";
      window.DETAIL.unmount && window.DETAIL.unmount();
      S.busy = null; S.detail = null;
      frame(true);
      if (!opts.noFocus) card.focus({ preventScroll: true });
    };
    if (instant) { finish(); return; }
    const br = banner.getBoundingClientRect();
    S.detail = null; frame(true); S.detail = k; // make sure the card sits where the mosaic says it should
    const cr = card.getBoundingClientRect();
    // the card it came from is off screen (the reader moved): a short fade instead of flying to a place they cannot see
    if (cr.bottom < 0 || cr.top > window.innerHeight) {
      sheet.classList.add("out", "nob");
      const fa = sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease" });
      S.busy = [fa]; fa.onfinish = finish; setTimeout(finish, 400); return;
    }
    const tb = cardTitleBox(k);
    const m = makeMorph(k, br);
    const hs = $$(".ct", m);
    hs.forEach((h) => { h.style.left = S.bp + "px"; h.style.top = S.bp + "px"; h.style.fontSize = S.bannerTs + "px"; });
    sheet.classList.add("out", "nob");
    card.style.visibility = "hidden";
    const D = S.W < 761 ? 280 : 340, EZ = "cubic-bezier(0.22,1,0.36,1)";
    const a1 = m.animate([
      { left: br.left + "px", top: br.top + "px", width: br.width + "px", height: br.height + "px" },
      { left: cr.left + "px", top: cr.top + "px", width: cr.width + "px", height: cr.height + "px" }
    ], { duration: D, easing: EZ, fill: "forwards" });
    const a2 = hs.map((h) => h.animate([
      { left: S.bp + "px", top: S.bp + "px", fontSize: S.bannerTs + "px" },
      { left: tb.x + "px", top: tb.y + "px", fontSize: tb.fs + "px" }
    ], { duration: D, easing: EZ, fill: "forwards" }));
    hs[1].animate([{ opacity: 1 }, { opacity: 0 }], { duration: D * 0.6, delay: D * 0.15, easing: "ease", fill: "both" });
    hs[0].animate([{ opacity: 0 }, { opacity: 1 }], { duration: D * 0.6, delay: D * 0.15, easing: "ease", fill: "both" });
    // the body fades out fast, then the white sheet no longer covers the mosaic
    const hideT = setTimeout(() => { sheetBody.style.visibility = "hidden"; }, 140);
    S.busy = [a1, ...a2];
    const end = () => { clearTimeout(hideT); sheetBody.style.visibility = ""; finish(); };
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
    // Montauk and GROWN are shown as demo recordings only; their app route is closed (the source stays in the repo)
    // demo-only apps never open on the public site (their code is not shipped); ?rec=1 lets the local recording script open them
    return { k, app: sub === "app" && !!window.APPS[k] && (!NO_APP.has(k) || /[?&]rec=1/.test(location.search)) };
  }
  function apply(route, opts = {}) {
    if (window.MEDIA && MEDIA.lbOpenNow) MEDIA.lbDismiss(); // a route change never leaves the enlarged view behind
    if (!route.k) { if (S.detail) closeDetail(); return; }
    if (S.detail !== route.k) {
      if (S.detail) closeDetail({ instant: true, noFocus: true });
      if (!opts.fromCard) { // came from a link or reload: put the mosaic in its finished state behind the sheet
        if (S.t < 1 && !reduce) { window.scrollTo(0, S.I); frame(true); }
      }
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
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".card"); if (!b) return;
    if (S.detail || root.classList.contains("sheet-open")) return; // already opening: ignore repeated clicks
    go("#/" + b.dataset.k, { fromCard: true });
  });
  // touch: show the colour on the first contact, the detail opens on release
  grid.addEventListener("pointerdown", (e) => { const b = e.target.closest(".card"); if (b && e.pointerType !== "mouse") b.classList.add("active"); });
  // a press that turns into a scroll is not a tap: drop the pressed colour
  window.addEventListener("scroll", () => { if (!S.detail) $$(".card.active").forEach((c) => c.classList.remove("active")); }, { passive: true });
  ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => grid.addEventListener(ev, (e) => { const b = e.target.closest && e.target.closest(".card"); if (b && ev !== "pointerup") b.classList.remove("active"); }));
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
    refreshCardText();
    // titles can change by language (GROWN, Manual): re-fit the cards, then the open banner, so card and banner keep the same lines
    { const d = S.detail; S.detail = null; layout(); S.detail = d; }
    if (S.detail) {
      const a = YL.captureAnchor(sheetScroll), f = YL.captureFocus();
      const bl = bannerLines(S.detail);
      bTitle.className = "b-title" + (S.detail === "about" ? " about" : "") + (isKo(bl) ? " ko" : "");
      bTitle.innerHTML = bl.map((t) => `<span lang="${isKo([t]) ? "ko" : "en"}">${esc(t)}</span>`).join("");
      layoutBanner();
      const sub = $(".b-sub", banner); if (sub) sub.textContent = bannerSub(S.detail);
      sheetCtl.innerHTML = ctlHtml();
      window.DETAIL.unmount && window.DETAIL.unmount();
      sheetBody.innerHTML = window.DETAIL.render(S.detail);
      window.DETAIL.mount(S.detail, sheetBody, sheetScroll, { relang: true });
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
  refreshCardText();
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); });
  history.scrollRestoration = "manual";
  const first = parse();
  if (first.k) { history.replaceState({ yl: 0 }, "", location.hash); apply(first); }
  window.HOME = { go, back, frame: () => frame(true), get state() { return S; } };
})();
