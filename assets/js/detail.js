/* Project detail bodies. Each project reads as: the job → what I noticed → first attempt → the wall → what changed → what works now.
   Every case has its own evidence block and its own motion; nothing shares one reveal effect. */
(function () {
  "use strict";
  const { L, esc, $, $$ } = YL;
  const C = window.CONTENT, M = window.MEDIA;
  const pad = (n) => String(n).padStart(2, "0");
  // "·" marks a section without a number: it shows as a plain colour square
  const label = (n, t) => `<p class="label">${n === "·" ? `<b class="dot" aria-hidden="true"></b>` : `<b>${typeof n === "number" ? pad(n) : esc(n)}</b>`}${esc(L(t))}</p>`;
  const fig = (name, cap, o = {}) => `<figure class="fig ${o.cls || ""}" ${o.anchor ? `data-anchor="${o.anchor}"` : ""}>
      <div class="ph ${o.ph || ""}" style="--ar:${o.ar || M.ratio(name)}">${o.video ? M.video(o.video, name, L(cap), o) : M.img(name, L(cap), o)}</div>
      ${cap ? `<figcaption class="cap">${esc(L(cap))}</figcaption>` : ""}</figure>`;
  /* App recordings: the control bar sits under the video. Montauk and GROWN are demo-only (muted autoplay on screen).
     Make It! and Like this: the entry starts with “Try it”, then what you can do and the first move, then the release / model status. */
  const DEMO_ONLY = new Set(["montauk", "grown"]);
  const demo = (k, h, o = {}) => {
    const name = { montauk: "Montauk Manual Studio", grown: "GROWN Recovery Scan", "grown-mobile": "GROWN Rent Scan", makeit: "Make It!", likethis: "Like this" }[k];
    // o.noEn: one recording for both languages (the GROWN mobile app has a Korean UI only)
    const en = YL.lang === "en" && !o.noEn ? "-en" : "", auto = DEMO_ONLY.has(k) || k === "grown-mobile", phone = k === "montauk" || k === "grown-mobile";
    const btn = (a, t, icon) => `<button type="button" data-demo="${a}" ${a !== "replay" ? 'aria-pressed="false"' : ""}><span class="di di-${icon}" aria-hidden="true"></span><span class="dt">${esc(L(t))}</span></button>`;
    const go = auto ? "" : `<div class="demo-go">
        <button type="button" class="btn" data-open-app><span>${esc(L(h.app))}</span><span class="arr" aria-hidden="true">→</span></button>
        <p class="dg-lead">${esc(L(h.tryLead))}</p>
        ${h.five ? `<p class="dg-five">${esc(L("직접 작성한 다섯 표현: ", "The five hand-written expressions: "))}<span lang="en">${esc(h.five)}</span></p>` : ""}
        <p class="dg-status">${srcTag("sample")}${esc(L(h.tryStatus))}</p></div>`;
    return `<div class="demo ${phone ? "phone" : ""} ${auto ? "auto" : "trial"}" data-anchor="${k}-demo">${o.label ? `<p class="demo-label">${esc(L(o.label))}</p>` : ""}
      ${go}
      <div class="demo-stage">
        <div class="demo-v"><video class="demo-video" muted playsinline webkit-playsinline preload="none" poster="assets/img/demo-${k}${en}-poster.jpg" data-src="assets/video/demo-${k}${en}.mp4" aria-label="${esc(L({ ko: `${name} 구동 시연 영상`, en: `${name} — demo recording` }))}"></video></div>
        <div class="demo-bar" role="group" aria-label="${esc(L("영상 조작", "Video controls"))}">${btn("toggle", { ko: "재생", en: "Play" }, "play")}${btn("replay", { ko: "다시 보기", en: "Replay" }, "replay")}${btn("fs", { ko: "전체 화면", en: "Full screen" }, "fs")}</div>
      </div>
      ${o.note ? `<p class="demo-note">${srcTag("sample")}${esc(L(o.note))}</p>` : ""}</div>`;
  };
  /* every caption says what kind of material it is: the actual work, a prepared demo, or something rebuilt to explain */
  /* five labels, nothing else: every piece of material carries exactly one of them */
  const SRC = {
    real: { ko: "실제 작업물", en: "Actual work" },
    field: { ko: "실사용 피드백 · 지원자 정리 요약", en: "Field feedback · my summary" },
    limit: { ko: "직접 해 보고 확인한 한계", en: "Limits I found by trying it" },
    sample: { ko: "준비된 예시", en: "Prepared example" },
    rebuilt: { ko: "설명을 위해 재구성", en: "Rebuilt to explain" }
  };
  // older names map onto the five (the caption text keeps the finer description)
  SRC.demo = SRC.sample; SRC.suggest = SRC.sample; SRC.portfolio = SRC.rebuilt; SRC.flow = SRC.rebuilt;
  const srcTag = (k) => `<span class="src src-${k}">${esc(L(SRC[k]))}</span>`;
  const capOf = (k, t) => `<figcaption class="cap">${srcTag(k)}<span>${esc(L(t))}</span></figcaption>`;
  /* where AI was used sits beside the work it was used for; what I decided sits in the scene where it was decided */
  const aiNote = (x) => `<aside class="ai-note"><p class="an-k">${esc(L({ ko: "AI를 활용한 부분", en: "Where AI was used" }))}</p><p><b>${esc(L(x.t))}</b>${esc(L(x.d))}</p></aside>`;
  const judge = (list) => `<div class="judge"><p class="jg-k">${esc(L({ ko: "내가 판단한 것", en: "What I decided" }))}</p><ul>${list.map((x) => `<li>${esc(L(x))}</li>`).join("")}</ul></div>`;
  const heroLine = (h) => `<p class="hero-line">${esc(L(h.line))}</p>${h.intro ? `<p class="hero-intro">${esc(L(h.intro))}</p>` : ""}`;
  /* one numbered story per project: kicker, heading, text (with its AI note beside it), the decision, then the material */
  const story = (id, S, media) => sec(id, `${label("·", S.label)}<ol class="story" data-story>${S.steps.map((s, i) => {
      const text = (s.src ? `<p class="cap st-src">${srcTag(s.src)}${s.meta ? `<span>${esc(L(s.meta))}</span>` : ""}</p>` : "")
        + (s.p || []).map((p) => `<p class="p">${esc(L(p))}</p>`).join("")
        + (s.ul ? `<ul class="fb-l">${s.ul.map((x) => `<li>${esc(L(x))}</li>`).join("")}</ul>` : "");
      const left = text + (s.mine ? judge(s.mine) : "");
      const body = left || s.ai ? `<div class="st-body ${s.ai ? "has-ai" : ""} ${text ? "" : "no-text"}"><div class="st-text">${left}</div>${s.ai ? aiNote(s.ai) : ""}</div>` : "";
      return `<li class="st-${s.k}" data-anchor="${id}-${s.k}"><span class="sd" aria-hidden="true">${i + 1}</span>
        <p class="st-k">${esc(L(s.t))}</p>${s.h ? `<h3>${esc(L(s.h))}</h3>` : ""}${body}${media[s.k] ? `<div class="st-m">${media[s.k]}</div>` : ""}</li>`;
    }).join("")}</ol>`);
  const closeSec = (id, n, X) => sec(id, `${label("·", X.label)}${X.q ? `<h2 class="h2 close-q">${esc(L(X.q))}</h2>` : ""}${X.qNote ? `<p class="cap close-qn">${srcTag(X.qNote.src)}<span>${esc(L(X.qNote.t))}</span></p>` : ""}${rows(X.rows)}`);
  /* feedback from real use, or limits found by trying it: label, heading, who and when, the scope, what was said, then what I decided */
  const fbSec = (id, F) => sec(id, `${label("·", F.label)}${F.h ? `<h2 class="h2 fb-h">${esc(L(F.h))}</h2>` : ""}
      <p class="cap fb-meta">${srcTag(F.src)}<span>${esc(L(F.meta))}</span></p>
      ${F.scope ? `<p class="fb-scope">${esc(L(F.scope))}</p>` : ""}
      ${F.items ? `<ul class="fb-l">${F.items.map((x) => `<li>${esc(L(x))}</li>`).join("")}</ul>` : ""}
      ${F.cols ? `<div class="fb-cols">${F.cols.map((c) => `<div><h3>${esc(L(c.t))}</h3><p>${esc(L(c.d))}</p>${c.note ? `<p class="cap">${esc(L(c.note))}</p>` : ""}</div>`).join("")}</div>` : ""}
      ${F.mine ? judge(F.mine) : ""}
      ${F.steps ? `<p class="fb-k">${esc(L(F.stepsT))}</p><ol class="fb-steps">${F.steps.map((x, i) => `<li><b><i lang="en">${i + 1}</i>${esc(L(x.t))}</b><p>${esc(L(x.d))}</p></li>`).join("")}</ol>` : ""}
      ${F.learn ? `<p class="fb-learn"><b>${esc(L({ ko: "배운 점", en: "What I learned" }))}</b>${esc(L(F.learn))}</p>` : ""}`, "fb");
  const pic = (name, alt, o = {}) => `<span class="ph ${o.page ? "page" : ""}" style="--ar:${M.ratio(name)}">${M.img(name, alt, { sizes: o.sizes || "(max-width:760px) 50vw, 24vw" })}</span>`;
  const enImg = (name) => YL.lang === "en" && window.IMG_SIZES && window.IMG_SIZES[name + "-en"] ? name + "-en" : name;
  const rows = (list) => `<ul class="rows">${list.map((r) => `<li><b>${esc(L(r.k))}${r.tag ? `<small class="row-t">${esc(L(r.tag))}</small>` : ""}</b><span>${esc(L(r.v))}</span></li>`).join("")}</ul>`;
  const items = (list, n) => `<ol class="list" style="--n:${n || list.length}">${list.map((x) => `<li><h3>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`;
  const sec = (id, inner, cls = "") => `<section class="sec ${cls}" data-anchor="${id}"><div class="in">${inner}</div></section>`;
  /* turning points: titles carry the event, paragraphs carry the reasoning; the line between them draws as you read */
  const turns = (T, v) => `<ol class="turns v-${v}" data-turns style="--n:${T.list.length}"><span class="tline" aria-hidden="true"><i></i></span>
      ${T.list.map((x, i) => `<li class="turn" data-anchor="turn-${v}-${i}"><span class="tdot" aria-hidden="true"></span>
        <h3><i>${pad(i + 1)}</i>${esc(L(x.t))}</h3><div class="tp">${x.p.map((p) => `<p>${esc(L(p))}</p>`).join("")}</div></li>`).join("")}</ol>`;
  /* sets of pages that open in the enlarged view */
  const SETS = {
    // the two guides, page by page: direct p1, app p1, direct p2, app p2 …
    cmp: () => C.montauk.compare.pages.flatMap((p) => [
      { img: "mkd-p" + p.n, t: { ko: `직접 제작한 가이드 · ${p.n}쪽 · ${p.t.ko}`, en: `The guide I made · p.${p.n} · ${p.t.en}` } },
      { img: "mkf-p" + p.n, t: { ko: `앱 버전 가이드 · ${p.n}쪽 · ${p.t.ko}`, en: `App-version guide · p.${p.n} · ${p.t.en}` } }]),
    mlead: () => [{ img: "mkd-p4", t: C.montauk.lead.made.cap }, { img: "mt-studio-2", t: C.montauk.lead.app.cap }],
    gcol: () => { const c = C.grown.story.steps.find((x) => x.k === "expert").collab; return [{ img: c.img, t: c.cap }]; },
    mproc: () => C.montauk.story.steps[0].media.map((m) => ({ img: m.img, t: m.t })),
    mst: () => C.montauk.story.steps.find((x) => x.k === "demo").stills.map((x) => ({ img: x.img, t: x.t }))
  };
  const zoom = (set, i, inner, labelText) => `<button type="button" class="zoom" data-zoom="${set}|${i}" aria-label="${esc(labelText + " — " + L(C.ui.viewLarge))}">${inner}</button>`;
  const pages = (set, n, prefix, aria) => `<div class="pages" tabindex="0" role="region" aria-label="${esc(aria)}">${Array.from({ length: n }, (_, i) => `<figure>${zoom(set, i, `<span class="ph fig" style="position:relative;display:block">${M.img(prefix + (i + 1), `${aria} p.${i + 1}`, { sizes: "230px" })}</span>`, `${aria} p.${i + 1}`)}<figcaption>p.${i + 1}</figcaption></figure>`).join("")}</div>`;

  /* ───── About: the banner carries the name; the detail starts straight with the path so far ───── */
  function about() {
    const A = C.about;
    return sec("a-tl", `${label("·", { ko: "지나온 길", en: "The path so far" })}
        <ol class="tl" id="tl">${A.timeline.map((x, i) => `<li data-anchor="tl-${i}"><span class="tl-when">${esc(L(x.when)) || "&nbsp;"}</span><h3>${esc(L(x.t))}</h3><p>${esc(L(x.d))}</p></li>`).join("")}</ol>`, "first")
      + sec("a-why", `${label("·", { ko: "Why SK AIGEN", en: "Why SK AIGEN" })}<div class="why">${A.why[YL.lang].map((p, i) => `<p data-anchor="why-${i}">${esc(p)}</p>`).join("")}</div>`)
      + sec("a-links", `${label("·", { ko: "연락", en: "Contact" })}
        <div class="links">${A.links.map((l) => `<a href="${l.href}" ${l.ext ? 'target="_blank" rel="noopener"' : ""}>${esc(l.t)}${l.d ? ` <small lang="en">${esc(l.d)}</small>` : ""} <span aria-hidden="true">${l.ext ? "↗" : "→"}</span>${l.ext ? `<span class="sr-only">${esc(L("(새 창)", "(opens in a new tab)"))}</span>` : ""}</a>`).join("")}<a class="resume-link" href="${A.resume.href}" target="_blank" rel="noopener">${esc(L("이력서 보기", "View Résumé"))} <small lang="${YL.lang === "ko" ? "en" : "ko"}">${esc(YL.lang === "ko" ? "View Résumé" : "이력서 보기")}</small> <span aria-hidden="true">↗</span><span class="sr-only">${esc(L("(PDF, 새 창)", "(PDF, opens in a new tab)"))}</span></a></div>`);
  }

  /* ───── Art & Design ───── */
  function art() {
    const A = C.art;
    const nav = `<nav class="cats" aria-label="${esc(L("분야", "Fields"))}">${A.cats.map((c, i) => `<a href="#cat-${c.k}" data-cat="${c.k}" aria-current="${i === 0}">${esc(L(c.t))}</a>`).join("")}</nav>`;
    let first = true;
    const tile = (c, { p, pi, it, ii }, multi) => {
      const eager = (first && ii === 0) || it.eager; if (first && ii === 0) first = false;
      const cls = `tile ${it.w || ""} ${it.fit === "contain" ? "contain" : ""} ${it.video ? "video" : ""} ${it.ar ? "ar" : ""}`; const st = it.ar ? ` style="--tar:${it.ar}"` : "";
      const alt = `${L(p.t)} — ${L(it.t)}`;
      // inside a project the heading already names it, so the caption only says what this view shows
      const meta = multi ? `<span class="meta">${esc(L(it.t))}</span>` : `<span class="meta"><b ${typeof p.t === "string" ? 'lang="en"' : ""}>${esc(L(p.t))}</b>${esc(L(p.d))}</span>`;
      if (it.video) return `<div class="${cls}" data-anchor="t-${it.img}"><div class="tw">${M.video(it.video, it.img, alt, { sizes: "(max-width:760px) 100vw, 60vw" })}</div>${meta}</div>`;
      return `<button type="button" class="${cls}"${st} data-lb="${c.k}|${pi}|${ii}" aria-label="${esc(alt + " — " + L(C.ui.viewLarge))}"><span class="tw">${M.img(it.img, alt, { eager, sizes: it.ar ? "(max-width:760px) 100vw, 50vw" : it.w && /w(8|12)/.test(it.w) ? "(max-width:760px) 100vw, 70vw" : "(max-width:760px) 50vw, 34vw" })}</span>${meta}</button>`;
    };
    const body = A.cats.map((c) => { const n = c.projects.reduce((a, p) => a + p.items.filter((x) => !x.video).length, 0), nv = c.projects.reduce((a, p) => a + p.items.filter((x) => x.video).length, 0);
      return `<div class="cat-h" id="cat-${c.k}" data-anchor="cat-${c.k}"><h3>${esc(L(c.t))}</h3><span>${esc(nv ? L(`영상 ${nv}편`, `${nv} film${nv > 1 ? "s" : ""}`) : L(`이미지 ${n}장`, `${n} images`))}</span></div>
      ${groups(c).map((grp) => {
        // a project opens with its representative views; the rest wait behind “More process and views”
        const show = grp.multi ? (grp.p.show || 6) : grp.list.length, main = grp.list.slice(0, show), rest = grp.list.slice(show);
        return `<div class="proj" data-anchor="p-${c.k}-${grp.i}">${grp.multi ? `<div class="proj-h"><h4 ${typeof grp.p.t === "string" ? 'lang="en"' : ""}>${esc(L(grp.p.t))}</h4><p>${esc(L(grp.p.d))}</p>${grp.p.cap ? `<p class="proj-cap">${esc(L(grp.p.cap))}</p>` : ""}</div>` : ""}
          <div class="gal ${grp.multi ? "" : "singles"}">${main.map((x) => tile(c, x, grp.multi)).join("")}</div>
          ${rest.length ? `<div class="more-wrap" hidden id="more-${c.k}-${grp.i}"><div class="gal">${rest.map((x) => tile(c, x, grp.multi)).join("")}</div></div>
            <button type="button" class="more-btn" data-more="more-${c.k}-${grp.i}" aria-expanded="false" aria-controls="more-${c.k}-${grp.i}"><span class="mb-t">${esc(L(`과정과 다른 컷 보기 (${rest.length})`, `More process and views (${rest.length})`))}</span><span class="mb-c" hidden>${esc(L("접기", "Show less"))}</span><i aria-hidden="true">+</i></button>` : ""}</div>`;
      }).join("")}`; }).join("");
    /* projects with several views get their own heading; single pieces share one grid */
    function groups(c) {
      const out = []; let single = null;
      c.projects.forEach((p, pi) => {
        const list = p.items.map((it, ii) => ({ p, pi, it, ii }));
        if (p.items.length > 1) { single = null; out.push({ multi: true, p, i: pi, list }); }
        else { if (!single) { single = { multi: false, i: pi, list: [] }; out.push(single); } single.list.push(...list); }
      });
      return out;
    }
    return sec("art", `<p class="lead" style="margin:0">${esc(L(A.lead))}</p><p class="cap" style="margin:4px 0 0">${esc(L(A.hint))}</p>${nav}${body}`, "hero art-hero");
  }

  /* ───── Manual for Manuals: what I learned → the old process · staff feedback · the app's question screen → the story → the two guides → what's left to check ───── */
  function montauk() {
    const D = C.montauk, Ld = D.lead, K = D.compare, S = D.story, st = (k) => S.steps.find((x) => x.k === k);
    const lead = sec("m-hero", `${heroLine(D.hero)}
      <div class="lead3" data-lead>
        <figure class="l3 l3-made"><p class="l3-k"><i>1</i>${esc(L(Ld.made.t))}</p>
          ${zoom("mlead", 0, pic("mkd-p4", L(Ld.made.cap), { page: true, sizes: "(max-width:760px) 100vw, 30vw" }), L(Ld.made.cap))}
          <ol class="l3-chain">${Ld.made.chain.map((c) => `<li>${esc(L(c))}</li>`).join("")}</ol>${capOf("real", Ld.made.cap)}</figure>
        <div class="l3 l3-voice"><p class="l3-k"><i>2</i>${esc(L(Ld.feedback.t))}</p><p class="vq">${esc(L(Ld.feedback.p))}</p><p class="cap">${srcTag("field")}</p></div>
        <figure class="l3 l3-app"><p class="l3-k"><i>3</i>${esc(L(Ld.app.t))}</p>
          ${zoom("mlead", 1, pic("mt-studio-2", L(Ld.app.alt), { sizes: "(max-width:760px) 70vw, 22vw" }), L(Ld.app.cap))}${capOf("flow", Ld.app.cap)}</figure>
      </div>`, "hero lead-only");
    const made = st("made"), tool = st("tool"), demoStep = st("demo"), doc = st("handover").doc;
    const docLink = (inner, cls) => `<a class="${cls}" href="${doc.file}" target="_blank" rel="noopener">${inner}<span class="sr-only">${esc(L("(PDF, 새 창)", "(PDF, opens in a new tab)"))}</span></a>`;
    const media = {
      handover: `<div class="doc">
          ${docLink(pic(doc.img, L(doc.link), { page: true, sizes: "(max-width:760px) 60vw, 22vw" }), "doc-p")}
          <div class="doc-t">${docLink(`${esc(L(doc.link))} <span aria-hidden="true">↗</span>`, "doc-link")}<p class="cap doc-meta">${esc(L(doc.meta))}</p>
            <p class="cap">${srcTag("portfolio")}<span>${esc(L(doc.cap))}</span></p></div></div>`,
      made: `<div class="proc">${made.media.map((m, i) => `<figure>${zoom("mproc", i, pic(m.img, L(m.t), { page: m.page }), L(m.t))}${capOf("real", m.t)}</figure>`).join("")}</div>`,
      tool: `<ol class="flowchips" aria-label="${esc(L("앱의 흐름", "The app's flow"))}">${tool.flow.map((f, i) => `<li><b>${i + 1}</b>${esc(L(f))}</li>`).join("")}</ol>`,
      // the stills carry the flow without playing; the recording sits beside them
      demo: `<div class="vpair"><div class="vp-stills"><ol class="stills">${demoStep.stills.map((s, i) => `<li><figure>${zoom("mst", i, pic(s.img, L(s.alt), { sizes: "(max-width:760px) 100vw, 18vw" }), L(s.t))}<figcaption><b lang="en">${pad(i + 1)}</b>${esc(L(s.t))}</figcaption></figure></li>`).join("")}</ol>
          <p class="cap">${srcTag("flow")}<span>${esc(L(demoStep.stillsCap))}</span></p></div>
        <div class="vp-video">${demo("montauk", {}, { note: demoStep.note })}</div></div>`
    };
    const body = story("m-story", S, media);
    // the two guides, paired by assembly step: the hand-made page and the app page for the same step
    const pick = 4, stepPages = K.pages.filter((p) => p.step);
    const cmp = sec("m-cmp", `${label("·", K.label)}<h2 class="h2" style="margin-bottom:18px">${esc(L(K.h))}</h2>
      <div class="cmp2" data-cmp2 data-n="${pick}">
        <div class="cmp2-tabs" role="tablist" aria-label="${esc(L("조립 단계", "Assembly step"))}">${stepPages.map((p) => `<button type="button" role="tab" data-pg="${p.n}" aria-selected="${p.n === pick}"><b lang="en">${p.n}</b>${esc(L(p.t))}</button>`).join("")}</div>
        <div class="cmp2-pair" role="tabpanel" aria-live="polite">${cmpPair(pick)}</div>
      </div><p class="cap">${esc(L(K.cap))}</p>`);
    return lead + body + cmp + fbSec("m-field", D.field) + closeSec("m-close", 3, D.close);
  }

  /* one assembly step in the two guides: the hand-made page, then the app version (side by side on desktop, in that order on mobile) */
  function cmpPair(n) {
    const K = C.montauk.compare, pg = K.pages.find((p) => p.n === n);
    const side = (kind) => { const v = kind === "d" ? K.direct : K.app, img = (kind === "d" ? "mkd-p" : "mkf-p") + n, lab = `${L(v.t)} · ${L({ ko: `${n}쪽`, en: `p.${n}` })} · ${L(pg.t)}`;
      return `<figure class="cmp2-f ${kind}">${zoom("cmp", (n - 1) * 2 + (kind === "d" ? 0 : 1), `<span class="ph page">${M.img(img, lab, { sizes: "(max-width:760px) 100vw, 42vw" })}</span>`, lab)}
        <figcaption>${srcTag(kind === "d" ? "real" : "demo")}<b>${esc(L(v.t))} · ${esc(L({ ko: `${n}쪽`, en: `p.${n}` }))} · ${esc(L(pg.t))}</b><span>${esc(L(v.d))}</span></figcaption></figure>`; };
    return side("d") + side("a");
  }

  /* ───── GROWN: one unit's result, with the further-checks step marked → the story → the scope of calculation and confirmation ───── */
  function grown() {
    const D = C.grown, h = D.hero, Ld = D.lead;
    const lead = sec("g-hero", `${heroLine(h)}
      <div class="lead-grx"><figure class="lead-gr" data-lead>${grownResult("B1|101", true)}${capOf("demo", Ld.cap)}</figure>
        <ol class="gr-scope">${Ld.scope.map((x, i) => `<li><b><i lang="en">${i + 1}</i>${esc(L(x.k))}</b><p>${esc(L(x.v))}</p></li>`).join("")}</ol></div>`, "hero lead-only");
    const collab = D.story.steps.find((x) => x.k === "expert").collab;
    const media = {
      brand: `<div class="vi">
        ${fig("gr-vi-1", { ko: "GROWN 심벌", en: "GROWN symbol" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-2", { ko: "가로형 로고", en: "Horizontal logo" }, { ph: "contain", ar: "16 / 9" })}
        ${fig("gr-vi-3", { ko: "명함 · 색상 체계", en: "Business cards · colour system" }, { cls: "s4", ar: "16 / 9" })}
        ${fig("gr-card-logo", { ko: "명함 로고 면", en: "Card front" }, { cls: "s4", ar: "16 / 9" })}
        <figure class="fig s4"><div class="ph" style="--ar:16/9"><div class="card-re" aria-hidden="true"><span class="lg">GROWN</span><span><span class="nmx">홍 길 동</span><span class="rlx">Founder &amp; CEO</span></span><span class="ad">010-0000-0000<br>서울 ○○구 ○○로 00<br>name@example.com</span></div></div><figcaption class="cap">${srcTag("rebuilt")}<span>${esc(L(D.s1.cardCap))}</span></figcaption></figure>
      </div><p class="cap">${srcTag("real")}<span>${esc(L({ ko: "GROWN 브랜딩 작업물", en: "GROWN branding work" }))}</span></p>`,
      expert: `<figure class="collab">${zoom("gcol", 0, pic(collab.img, L(collab.alt), { sizes: "(max-width:760px) 100vw, 70vw" }), L(collab.cap))}${capOf("rebuilt", collab.cap)}</figure>`,
      result: `${grownLink()}<p class="cap">${srcTag("demo")}<span>${esc(L({ ko: "미리 계산한 가상 호실 8개", en: "8 fictional units, calculated in advance" }))}</span></p>`,
      // the extension note under the heading, then the web system, then the same flow on the phone (one after the other)
      mobile: `<div class="g-duo g-stack">
        <p class="g-duo-lead">${esc(L(D.mobile.lead))}</p>
        <div class="g-duo-a">${demo("grown", h, { note: h.demoNote, label: D.mobile.left })}</div>
        <div class="g-duo-b">${demo("grown-mobile", h, { noEn: true, label: D.mobile.right, note: D.mobile.cap })}</div>
      </div>`
    };
    return lead + story("g-story", D.story, media) + closeSec("g-close", 2, D.close);
  }
  function grownLink(sel) {
    const G = window.GROWN_SAMPLE; if (!G) return ""; // prepared results only; nothing is calculated here
    const list = G.rows, cur = sel || "B1|101";
    return `<div class="glink" data-glink>
      <div class="gx" role="group" aria-label="${esc(L("가상 예시 물건 목록", "Fictional sample unit list"))}">
        <div class="gx-h" aria-hidden="true"><span>${esc(L("현장", "Site"))}</span><span>${esc(L("호실", "Unit"))}</span><span>${esc(L("면적", "Area"))}</span><span>${esc(L("월 임대료", "Rent"))}</span><span>${esc(L("공실", "Vacant"))}</span></div>
        ${list.map((r) => `<button type="button" class="gx-r" data-row="${r.key}" aria-pressed="${r.key === cur}"><span>${esc(L(r.site))}</span><span lang="en">${esc(r.id)}</span><span lang="en">${r.area}㎡</span><span lang="en">${esc(L(r.rent))}</span><span lang="en">${r.vac == null ? "—" : r.vac + L("개월", " mo")}</span></button>`).join("")}
      </div>
      <div class="gr" aria-live="polite">${grownResult(cur)}</div></div>`;
  }
  /* lead: the opening example marks the further-checks step, where the calculation hands over to the expert */
  function grownResult(key, lead) {
    const r = window.GROWN_SAMPLE && window.GROWN_SAMPLE.reads[key]; if (!r) return "";
    const Ld = C.grown.lead;
    const cap = key === "B1|101" ? `<p class="gr-cap">${esc(L(C.grown.link.cap101))}</p>` : "";
    return `<div class="gr-in ${lead ? "gr-lead" : ""}" style="--c:${r.color}">
      <p class="gr-unit"><b lang="en">${esc(r.id)}</b>${esc(L(r.site))}</p>
      <ol class="gr-steps">
        <li class="gr-v"><span>${esc(L("예비 판정", "Preliminary verdict"))}</span><b>${esc(L(r.verdict))}</b><em lang="en">${esc(L("점수 ", "Score "))}${esc(r.score)}${r.p24 != null ? ` · ${esc(L("24개월 내 임대 가능성 ", "24-month leasing chance "))}${r.p24}%` : ""}</em></li>
        <li><span>${esc(L("근거", "Reasons"))}</span><p>${esc(L(r.reason))}</p></li>
        <li class="gr-need">${lead ? `<em class="gr-flag">${esc(L(Ld.mark))}</em>` : ""}<span>${esc(L("추가 확인 · 자료 보완과 현장·문서 확인", "Further checks · missing data and site/document checks"))}</span><p>${esc(L(r.need))}</p>${lead ? `<p class="gr-why">${esc(L(Ld.markNote))}</p>` : ""}</li>
        <li><span>${esc(L("우선 조치", "Actions first"))}</span><p>${esc(L(r.action))}</p></li>
      </ol>${cap}
      <p class="gr-stage"><i class="on">${esc(L("예비 판정 (계산)", "Preliminary (calculated)"))}</i><i>${esc(L("자료 보완 → 다시 계산", "Fill in data → recalculate"))}</i><i>${esc(L("전문가 현장·문서 확인 → 확정", "Expert site/document check → confirmed"))}</i></p></div>`;
  }

  /* ───── Make It!: the Artist's Original Drawing → the 3D model → the question for the maker → the story → what the trial shows ───── */
  function makeit() {
    const D = C.makeit, h = D.hero, Ld = D.lead, E = D.exchange;
    // the same thin branch, circled on the drawing and on the model
    const pin = (x, y) => `<span class="mk-pin" style="left:${x}%;top:${y}%" aria-hidden="true"></span>`;
    const lead = sec("k-hero", `${heroLine(h)}
      <div class="lead3 lead-mk" data-lead>
        <figure class="l3"><p class="l3-k"><i>1</i>${esc(L(Ld.drawing))}</p><span class="ph pinned" style="--ar:${M.ratio("a10")}">${M.img("a10", L(Ld.drawing), { sizes: "(max-width:760px) 100vw, 30vw" })}${pin(21, 18)}</span>${capOf("real", Ld.drawing)}</figure>
        <figure class="l3"><p class="l3-k"><i>2</i>${esc(L(Ld.model))}</p><span class="ph pinned" style="--ar:${M.ratio("a10-rotation-poster")}">${M.img("a10-rotation-poster", L(Ld.model), { sizes: "(max-width:760px) 100vw, 30vw" })}${pin(28, 27)}</span>${capOf("real", Ld.model)}</figure>
        <div class="l3 l3-brief"><p class="l3-k"><i>3</i>${esc(L(Ld.briefT))}</p>
          <div class="bf"><p class="bf-k">${esc(L(Ld.v1k))}</p><p class="ask">“${esc(L(Ld.ask))}”</p><p class="bf-n">${esc(L(Ld.v1n))}</p>
            <p class="bf-k bf-2">${esc(L(Ld.v2k))}</p><p class="bf-v">${Ld.v2a.map((x) => `<span>${esc(L(x))}</span>`).join("")}</p><p class="bf-n">${esc(L(Ld.v2n))}</p></div>
          <p class="cap">${srcTag("sample")}<span>${esc(L(Ld.sampleNote))}</span></p></div>
      </div>
      <p class="lead-line">${esc(L(Ld.line))}</p><p class="cap l3-mark">${srcTag("rebuilt")}<span>${esc(L(Ld.mark))}</span></p>`, "hero lead-only");
    const S = D.story, st = (k) => S.steps.find((x) => x.k === k);
    const X = window.MAKEIT && window.MAKEIT.sample(YL.lang);
    const media = {
      limits: `<div class="toy" data-toy>
        <figure class="toy-art"><div class="ph" style="--ar:${M.ratio("a10")}">${M.img("a10", L(Ld.drawing), { sizes: "(max-width:760px) 100vw, 45vw" })}</div>${capOf("real", { ko: "작가 원화 · 연필", en: "Artist’s Original Drawing · pencil" })}</figure>
        <figure class="toy-3d">${window.VIEWER3D ? window.VIEWER3D.markup({ src: "assets/model/a10-arttoy.glb", video: "assets/video/a10-rotation.mp4", poster: "assets/img/a10-rotation-poster.jpg", alt: L(Ld.model) }) : ""}
          ${capOf("real", { ko: "작가 원화를 바탕으로 만든 3D 모델 · Tripo AI · 직접 돌려 보기", en: "3D Model Based on the Original Drawing · Tripo AI · turn it yourself" })}</figure></div>`,
      design: items(st("design").items, 3),
      // the opening sums up what changed; here are the whole briefs and the reply that changed them
      brief: `${exchange()}<p class="cap">${srcTag("sample")}<span>${esc(L(E.note))}</span></p>`,
      try: demo("makeit", h)
    };
    return lead + story("k-story", S, media) + closeSec("k-close", 2, D.close);
  }
  /* the full exchange: the question in v1 → the maker's reply → the changed lines in v2, joined by drawn lines */
  function exchange() {
    const X = window.MAKEIT && window.MAKEIT.sample(YL.lang); if (!X) return "";
    const E = C.makeit.exchange;
    const mark = (txt, keys, cls) => esc(txt).split("\n").map((ln) => keys.some((c) => ln.includes(c)) ? `<mark class="${cls}">${ln}</mark>` : ln).join("\n");
    const hl = (s) => esc(s).replace(X.hl, "<mark class=\"r\">$1</mark>");
    return `<div class="xch" data-xch>
      <article class="xch-c x1"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("제작 문의서", "Build brief"))} v1</span></header><pre>${mark(X.v1, X.ask, "q")}</pre><p class="xch-tag q">${esc(L(E.v1note))}</p></article>
      <span class="xch-l" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c xch-r x2"><header><b lang="en">${esc(X.maker)}</b><span>${esc(L("예시 회신 · 사양 보완 요청", "Sample reply · change request"))}</span>${srcTag("sample")}</header>
        <ul>${X.items.map((t) => `<li>${hl(t)}</li>`).join("")}</ul><p class="xch-msg">“${esc(X.msg)}”</p></article>
      <span class="xch-l back" aria-hidden="true"><i></i><b></b></span>
      <article class="xch-c x3"><header><b>${esc(L("디자이너", "Designer"))}</b><span>${esc(L("요청 반영", "Revised"))} · v2</span></header><pre>${mark(X.v2, X.changed, "c")}</pre><p class="xch-tag ch">${esc(L(E.change))}</p></article>
    </div>`;
  }

  /* ───── Like this: the cartoon conversation → translation, context, what to ask next → the story → the next check ───── */
  function likethis() {
    const D = C.likethis, h = D.hero, R = D.read, T = D.talk;
    let src = esc(R.src);
    ["Samurai Jack", "every day after school"].forEach((p) => { src = src.replace(esc(p), `<mark data-from="1">${esc(p)}</mark>`); });
    const lead = sec("l-hero", `${heroLine(h)}<p class="cap">${srcTag("real")}<span>${esc(L(T.cap))}</span></p>
      <div class="lread" data-lread data-lead><p class="lread-k">${esc(L(R.label))}</p><p class="lread-src" lang="en">“${src}”</p><p class="cap">${srcTag("rebuilt")}<span>${esc(L(R.srcNote))}</span></p>
        <ol class="lread-l three">${R.layers.map((l, i) => `<li data-layer="${i}" ${l.from ? `data-src="${i}" tabindex="0"` : ""}><h3><i lang="en">${pad(i + 1)}</i>${esc(L(l.t))}</h3><p class="lh">${esc(L(l.head))}</p><p>${esc(L(l.d))}</p>${l.tag ? `<p class="cap">${srcTag(l.tag)}</p>` : ""}</li>`).join("")}</ol>
        <p class="lead-line">${esc(L(R.line))}</p></div>`, "hero lead-only");
    const media = {
      talk: `<div class="pair">${T.items.map((x) => `<div><h3 lang="${x.tlang}">${esc(x.t)}</h3>${x.ko ? `<span lang="ko">${esc(x.ko)}</span>` : ""}<p class="p" style="margin:0">${esc(L(x.d))}</p></div>`).join("")}</div>
        <p class="bridge">${esc(L(T.bridge))}</p><p class="cap">${srcTag("real")}<span>${esc(L(T.cap))}</span></p>`,
      three: items(D.story.steps.find((x) => x.k === "three").items, 3),
      try: demo("likethis", h)
    };
    return lead + story("l-story", D.story, media) + closeSec("l-close", 2, D.close);
  }

  const R = { about, art, montauk, grown, makeit, likethis };

  /* ───── behaviours ───── */
  let cleanup = [];
  function mount(k, root, scroller, opts = {}) {
    unmount();
    M.wireVideos(root);
    const reduce = YL.reduceMotion();
    /* project pages: one orchestrated opening. When the page opens, its subtitle, paragraph and opening material
       follow the travelling title in, 40 ms apart; everything further down is simply there when you reach it.
       The class comes off afterwards so each block's own hover motion stays its own; a language switch re-renders in place. */
    if (/^(montauk|grown|makeit|likethis)$/.test(k)) {
      const RV = ".hero-line, .hero-intro, .hero > .in > .cap, .lead3 > .l3, .lead-gr, .hero .lread-src, .hero .lread-l > li";
      const els = $$(RV, root);
      if (reduce || opts.relang) els.forEach((el) => el.classList.add("ty-in"));
      else {
        els.forEach((el) => {
          const i = Math.min([...$$(RV, root)].indexOf(el), 8);
          el.style.setProperty("--rv-d", 140 + i * 40 + "ms");
          el.classList.add("ty-rv");
        });
        const done = (e) => { if (e.target.classList.contains("ty-rv") && e.propertyName === "transform") { e.target.classList.remove("ty-rv"); e.target.style.removeProperty("--rv-d"); } };
        root.addEventListener("transitionend", done);
        const rvIo = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("ty-in"); rvIo.unobserve(e.target); } }), { root: scroller, rootMargin: "0px 0px -2% 0px", threshold: 0 });
        els.forEach((el) => rvIo.observe(el));
        cleanup.push(() => { rvIo.disconnect(); root.removeEventListener("transitionend", done); });
      }
    }
    // 3D model: loads itself when it comes close
    if (window.VIEWER3D && $("[data-v3-root]", root)) cleanup.push(window.VIEWER3D.mount(root));
    // app recordings: poster + play button; never autoplay; stop when scrolled away or when the detail closes
    // every recording: muted autoplay once more than half of it is on screen, unless the visitor paused it or prefers reduced motion.
    // Make It!/Like this: wait for a tap. Both: pause off screen, replay, full screen; the poster shows until the video loads.
    $$(".demo", root).forEach((d) => {
      const v = $(".demo-video", d), auto = d.classList.contains("auto");
      let user = null; // true = asked to play, false = paused it themselves
      const load = () => { if (!v.src) { v.src = v.dataset.src; v.preload = "auto"; } };
      const play = () => { load(); const p = v.play(); if (p && p.catch) p.catch(() => d.classList.add("blocked")); };
      const stage = $(".demo-stage", d), fsBtn = $('[data-demo="fs"]', d);
      const sync = () => { const on = !v.paused; d.classList.toggle("playing", on); if (on) d.classList.remove("blocked"); d.dataset.user = user === false ? "off" : "on";
        $$('[data-demo="toggle"]', d).forEach((b) => { b.setAttribute("aria-pressed", String(on)); $(".dt", b).textContent = on ? L("일시정지", "Pause") : L("재생", "Play"); $(".di", b).className = "di di-" + (on ? "pause" : "play"); });
        d.classList.toggle("ended", v.ended); };
      ["play", "pause", "ended", "playing"].forEach((ev) => v.addEventListener(ev, sync));
      // starting this one pauses any other recording on the page
      v.addEventListener("play", () => $$(".demo-video", root).forEach((o) => { if (o !== v && !o.paused) o.pause(); }));
      /* full screen holds the stage (video + its bar), so the controls and “exit” stay on screen.
         Where the Fullscreen API is missing, the stage grows into a fixed overlay instead; the same <video> keeps playing. */
      const isFs = () => document.fullscreenElement === stage || document.webkitFullscreenElement === stage || stage.classList.contains("zoomed");
      const syncFs = () => { const on = isFs(); fsBtn.setAttribute("aria-pressed", String(on)); $(".dt", fsBtn).textContent = on ? L("전체 화면 해제", "Exit full screen") : L("전체 화면", "Full screen"); $(".di", fsBtn).className = "di di-" + (on ? "fsx" : "fs"); d.classList.toggle("is-fs", on); };
      const unzoom = () => { if (!stage.classList.contains("zoomed")) return; const done = () => { stage.classList.remove("zoomed", "zoom-out"); document.documentElement.classList.remove("demo-zoomed"); syncFs(); fsBtn.focus({ preventScroll: true }); };
        if (reduce) done(); else { stage.classList.add("zoom-out"); setTimeout(done, 180); } };
      const zoomIn = () => { stage.classList.add("zoomed"); document.documentElement.classList.add("demo-zoomed"); syncFs(); };
      const onFsChange = () => { syncFs(); window.__ylFsAt = Date.now(); };
      document.addEventListener("fullscreenchange", onFsChange); document.addEventListener("webkitfullscreenchange", onFsChange);
      // Esc while zoomed leaves the zoom only; the detail page stays (home.js ignores this Esc)
      const onKey = (e) => { if (e.key === "Escape" && stage.classList.contains("zoomed")) { e.preventDefault(); e.stopImmediatePropagation(); window.__ylFsAt = Date.now(); unzoom(); } };
      window.addEventListener("keydown", onKey, true);
      d.addEventListener("click", (e) => {
        const b = e.target.closest("[data-demo]"); const a = b ? b.dataset.demo : e.target === v ? "toggle" : null; if (!a) return;
        if (a === "toggle") { if (v.paused) { user = true; play(); } else { user = false; v.pause(); } }
        if (a === "replay") { user = true; load(); try { v.currentTime = 0; } catch (_) {} play(); }
        if (a === "fs") {
          if (document.fullscreenElement === stage) { document.exitFullscreen().catch(() => {}); return; }
          if (document.webkitFullscreenElement === stage) { document.webkitExitFullscreen(); return; }
          if (stage.classList.contains("zoomed")) { unzoom(); return; }
          load();
          const req = stage.requestFullscreen || stage.webkitRequestFullscreen;
          if (req) { const p = req.call(stage); if (p && p.catch) p.catch(zoomIn); } else zoomIn();
        }
      });
      syncFs();
      cleanup.push(() => { document.removeEventListener("fullscreenchange", onFsChange); document.removeEventListener("webkitfullscreenchange", onFsChange); window.removeEventListener("keydown", onKey, true);
        if (document.fullscreenElement === stage) document.exitFullscreen().catch(() => {}); stage.classList.remove("zoomed"); document.documentElement.classList.remove("demo-zoomed"); });
      // fetch only when the block comes close; autoplay only when it is actually in view
      const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(); near.disconnect(); } }), { rootMargin: "300px 0px" });
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        // only one recording plays at a time: autoplay waits if another one on the page is already playing
        if (e.isIntersecting) { if (user !== false && !reduce && !$$(".demo-video", root).some((o) => o !== v && !o.paused)) play(); }
        else if (!v.paused && !isFs()) v.pause();
      }), { threshold: 0.55 });
      near.observe(d); io.observe(d);
      d.dataset.user = "off"; sync();
      cleanup.push(() => { io.disconnect(); near.disconnect(); v.pause(); });
    });
    // one-time "arrive" cues for evidence blocks (they are fully readable before and after)
    const cue = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); cue.unobserve(e.target); } }), { root: scroller, threshold: 0.35 });
    $$("[data-cmp], [data-xch], [data-lread], [data-toy], [data-glink], [data-lead], [data-xdiff], [data-path], [data-cmp2]", root).forEach((el) => reduce ? el.classList.add("on") : cue.observe(el));
    cleanup.push(() => cue.disconnect());
    const onScroll = () => {
      const vh = scroller.clientHeight;
      const tl = $("#tl", root);
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height));
        tl.style.setProperty("--tp", p.toFixed(3));
        $$("li", tl).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.6));
      }
      // turning points: the connecting line follows the reader; the current point is marked
      // GROWN: the vertical story line follows the reader the same way
      $$("[data-story]", root).forEach((T) => { const r = T.getBoundingClientRect(); T.style.setProperty("--tp", reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.62 - r.top) / Math.max(1, r.height))).toFixed(3)); $$(":scope > li", T).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.7)); });
      $$("[data-turns]", root).forEach((T) => {
        const r = T.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.62 - r.top) / Math.max(1, r.height)));
        T.style.setProperty("--tp", reduce ? 1 : p.toFixed(3));
        $$(".turn", T).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.66));
      });
      const seq = $("#seq", root);
      if (seq) {
        const steps = $$(".step", seq);
        const stacked = getComputedStyle(seq).gridTemplateColumns.split(" ").length < 2;
        steps.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          let p;
          if (stacked) p = (vh * 0.75 - r.top) / (r.height * 0.6);
          else { const sr = seq.getBoundingClientRect(); p = ((vh * 0.85 - sr.top) / (sr.height + vh * 0.25)) * steps.length - i; }
          p = Math.max(0, Math.min(1, p));
          s.style.setProperty("--sp", p.toFixed(3));
          s.classList.toggle("on", p > 0.05 || reduce);
        });
      }
      // gallery: which field is being read
      const cats = $$(".cat-h", root);
      if (cats.length) {
        let cur = cats[0].dataset.anchor;
        cats.forEach((c) => { if (c.getBoundingClientRect().top < 140) cur = c.dataset.anchor; });
        $$(".cats a", root).forEach((a) => a.setAttribute("aria-current", String("cat-" + a.dataset.cat === cur)));
      }
    };
    let q = 0;
    // a recording that leaves the screen stops right away (not tied to animation frames or the observer)
    const stopAway = () => $$(".demo-video", root).forEach((v) => { if (!v.paused && !v.closest(".zoomed") && !document.fullscreenElement) { const r = v.getBoundingClientRect(), s = scroller.getBoundingClientRect(); if (r.bottom < s.top + 20 || r.top > s.bottom - 20) v.pause(); } });
    const sc = () => { stopAway(); if (!q) q = requestAnimationFrame(() => { q = 0; onScroll(); }); };
    scroller.addEventListener("scroll", sc, { passive: true });
    cleanup.push(() => scroller.removeEventListener("scroll", sc));
    requestAnimationFrame(onScroll);
    // Like this: a layer and the phrase it comes from light up together
    const lr = $("[data-lread]", root);
    if (lr) {
      const hi = (i) => { $$("mark[data-from]", lr).forEach((m) => m.classList.toggle("hot", m.dataset.from === i)); $$("[data-layer]", lr).forEach((l) => l.classList.toggle("hot", l.dataset.layer === i)); };
      ["mouseover", "focusin"].forEach((ev) => lr.addEventListener(ev, (e) => { const t = e.target.closest("[data-src], mark[data-from]"); hi(t ? (t.dataset.src || t.dataset.from) : null); }));
      lr.addEventListener("mouseleave", () => hi(null)); lr.addEventListener("focusout", () => hi(null));
    }
    root.addEventListener("click", onClick);
    cleanup.push(() => root.removeEventListener("click", onClick));
    function onClick(e) {
      const t = e.target.closest("[data-lb]:not(.imgerr)");
      if (t) {
        const [ck, pi] = t.dataset.lb.split("|").map((x, i) => i ? +x : x); const ii = +t.dataset.lb.split("|")[2];
        const p = C.art.cats.find((c) => c.k === ck).projects[pi];
        M.lbOpen(p.items.filter((x) => !x.video), ii, L(p.t), t);
        return;
      }
      // a tile whose image failed: try again instead of opening the enlarged view
      const bad = e.target.closest(".tile.imgerr");
      if (bad) { const im = $("img", bad); bad.classList.remove("imgerr"); im.classList.remove("err", "ok"); const s = im.getAttribute("src").split("?")[0]; im.removeAttribute("srcset"); im.src = s + "?r=" + Date.now(); return; }
      // “More process and views”: grows in place; closing keeps the button where the reader's eye is
      const mb = e.target.closest("[data-more]");
      if (mb) {
        const box = $("#" + mb.dataset.more, root), open = mb.getAttribute("aria-expanded") === "true", y0 = mb.getBoundingClientRect().top;
        if (!open) { box.hidden = false; if (!reduce) box.animate([{ height: "0px", opacity: 0 }, { height: box.scrollHeight + "px", opacity: 1 }], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" }); }
        else { box.hidden = true; scroller.scrollTop += mb.getBoundingClientRect().top - y0; }
        mb.setAttribute("aria-expanded", String(!open)); $(".mb-t", mb).hidden = !open; $(".mb-c", mb).hidden = open; $("i", mb).textContent = open ? "+" : "−";
        return;
      }
      const z = e.target.closest("[data-zoom]");
      if (z) { const [set, i] = z.dataset.zoom.split("|"); M.lbOpen(SETS[set](), +i, set === "cmp" ? L("두 가이드 비교", "The two guides") : L("몬탁소파", "Montauk Sofa"), z); return; }
      // Manual: pick a page role; the hand-made page and the app page change together (a short cross-fade)
      const pgb = e.target.closest("[data-pg]");
      if (pgb) {
        const box = pgb.closest("[data-cmp2]"), n = +pgb.dataset.pg, pair = $(".cmp2-pair", box);
        $$("[data-pg]", box).forEach((b) => b.setAttribute("aria-selected", String(b === pgb)));
        pair.innerHTML = cmpPair(n); box.dataset.n = n;
        if (!reduce) $$(".cmp2-f", pair).forEach((f, j) => f.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 180, delay: j * 60, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "backwards" }));
        return;
      }
      // GROWN: choosing a row recalculates that unit and moves the result next to it
      const row = e.target.closest("[data-row]");
      if (row) {
        const box = row.closest("[data-glink]");
        $$("[data-row]", box).forEach((b) => b.setAttribute("aria-pressed", String(b === row)));
        const gr = $(".gr", box); gr.innerHTML = grownResult(row.dataset.row);
        if (!reduce) $$(".gr-steps > li", gr).forEach((li, i) => li.animate([{ opacity: .25, transform: "translateX(-10px)" }, { opacity: 1, transform: "none" }], { duration: 260, delay: i * 70, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }));
        box.style.setProperty("--ry", (row.offsetTop + row.offsetHeight / 2) + "px");
        return;
      }
      const a = e.target.closest(".cats a");
      if (a) {
        e.preventDefault();
        const tgt = $("#cat-" + a.dataset.cat, root);
        // land the field title just under the pinned category bar (and under the control row when scrolling up brings it back)
        const raw = tgt.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop, cats = $(".cats", root), ctl = $("#sheet-ctl");
        const top = raw - (cats ? cats.offsetHeight : 0) - (raw < scroller.scrollTop && ctl ? ctl.offsetHeight : 0) - 12;
        scroller.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        tgt.setAttribute("tabindex", "-1"); tgt.focus({ preventScroll: true });
      }
    }
    // GROWN: place the connector at the initially selected row
    const gl = $("[data-glink]", root);
    if (gl) requestAnimationFrame(() => { const r = $('[data-row][aria-pressed="true"]', gl); if (r) gl.style.setProperty("--ry", (r.offsetTop + r.offsetHeight / 2) + "px"); });
  }
  function unmount() { M.stopAll(); cleanup.forEach((f) => f()); cleanup = []; }

  window.DETAIL = { render: (k) => R[k](), mount, unmount };
})();
