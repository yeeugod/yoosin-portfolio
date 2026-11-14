/* A10 art toy — a small GLB viewer (no libraries).
   The model (Tripo AI) has positions + normals only, so it is drawn with a polished-silver studio shader
   that matches the turntable render. Loads when it scrolls into view; before that the representative frame shows.
   Desktop: drag to turn, ⌘/Ctrl + wheel or buttons to zoom. Touch: horizontal drag turns (vertical drag still scrolls
   the page), two fingers pinch to zoom. If WebGL or the file fails, the turntable video takes its place. */
(function () {
  "use strict";
  const { L, esc, $ } = YL;
  const T = {
    hint: { ko: "드래그해서 돌려 보세요", en: "Drag to turn it" },
    hintTouch: { ko: "옆으로 밀어 돌려 보세요 · 두 손가락으로 확대", en: "Swipe sideways to turn · pinch to zoom" },
    wheel: { ko: "⌘/Ctrl + 스크롤로 확대", en: "⌘/Ctrl + scroll to zoom" },
    zin: { ko: "확대", en: "Zoom in" }, zout: { ko: "축소", en: "Zoom out" }, reset: { ko: "시점 초기화", en: "Reset view" },
    loading: { ko: "3D 모델 불러오는 중", en: "Loading the 3D model" },
    load: { ko: "3D 모델 불러오기", en: "Load the 3D model" },
    fail: { ko: "이 환경에서는 3D를 표시할 수 없어 회전 영상으로 보여드립니다.", en: "3D can't be shown here, so the turntable video plays instead." },
    label: { ko: "원화 아트토이 3D 모델. 드래그하거나 화살표 키로 돌리고, +와 − 키로 확대·축소합니다.", en: "Art toy 3D model. Drag or use the arrow keys to turn; + and − zoom." }
  };
  const DEF = { yaw: 0, pitch: 0.08, dist: 3.3 }; // keeps the widest turn (±0.76 after fitting) inside the 4:5 frame with a margin

  function markup(o) {
    return `<div class="v3" data-v3-root data-src="${esc(o.src)}" data-video="${esc(o.video)}" data-poster="${esc(o.poster)}">
      <img class="v3-poster" src="${esc(o.poster)}" alt="${esc(o.alt)}" loading="lazy" decoding="async">
      <canvas class="v3-c" tabindex="0" role="img" aria-label="${esc(L(T.label))}" hidden></canvas>
      <div class="v3-load" role="status" aria-live="polite" hidden><i><b style="width:0%"></b></i><span>${esc(L(T.loading))} <em>0%</em></span></div>
      <div class="v3-ui" hidden><p class="v3-hint"><span class="v3-h1">${esc(L(T.hint))}</span><span class="v3-h2">${esc(L(T.wheel))}</span></p>
        <div class="v3-ctl"><button type="button" data-v3="in" aria-label="${esc(L(T.zin))}">+</button><button type="button" data-v3="out" aria-label="${esc(L(T.zout))}">−</button><button type="button" data-v3="reset">${esc(L(T.reset))}</button></div></div>
    </div>`;
  }

  /* ── tiny matrix helpers (column-major) ── */
  function persp(fy, a, n, f) { const t = 1 / Math.tan(fy / 2), nf = 1 / (n - f); return [t / a, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]; }
  function mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; }
  function rotY(t) { const c = Math.cos(t), s = Math.sin(t); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; }
  function rotX(t) { const c = Math.cos(t), s = Math.sin(t); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function tr(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; }
  function sc(s) { return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]; }

  /* ── GLB parsing: first mesh primitive, float POSITION/NORMAL, indexed ── */
  function parseGLB(buf) {
    const dv = new DataView(buf);
    if (dv.getUint32(0, true) !== 0x46546C67) throw new Error("not a GLB");
    let off = 12, json = null, bin = null;
    while (off < buf.byteLength) {
      const len = dv.getUint32(off, true), type = dv.getUint32(off + 4, true);
      if (type === 0x4E4F534A) json = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, off + 8, len)));
      if (type === 0x004E4942) bin = new Uint8Array(buf, off + 8, len);
      off += 8 + len;
    }
    if (!json || !bin) throw new Error("GLB chunks missing");
    const prim = json.meshes[0].primitives[0];
    const acc = (i) => { const a = json.accessors[i], v = json.bufferViews[a.bufferView]; return { a, start: bin.byteOffset + (v.byteOffset || 0) + (a.byteOffset || 0), stride: v.byteStride || 0 }; };
    const vec3 = (i) => { const { a, start, stride } = acc(i); if (a.componentType !== 5126 || (stride && stride !== 12)) throw new Error("unsupported attribute"); return { arr: new Float32Array(buf, start, a.count * 3), a }; };
    const P = vec3(prim.attributes.POSITION), N = prim.attributes.NORMAL != null ? vec3(prim.attributes.NORMAL) : null;
    let I = null;
    if (prim.indices != null) { const { a, start } = acc(prim.indices); const C = { 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array }[a.componentType]; I = new C(buf.slice(start, start + a.count * C.BYTES_PER_ELEMENT)); }
    const min = P.a.min, max = P.a.max;
    return { pos: P.arr, nrm: N ? N.arr : null, idx: I, min, max };
  }

  const VS = `attribute vec3 p; attribute vec3 n; uniform mat4 mv; uniform mat4 pr; varying vec3 vN; varying vec3 vV;
    void main(){ vec4 q = mv * vec4(p,1.0); vV = q.xyz; vN = mat3(mv) * n; gl_Position = pr * q; }`;
  const FS = `precision mediump float; varying vec3 vN; varying vec3 vV;
    void main(){
      vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
      vec3 v = normalize(-vV); vec3 r = reflect(-v, n);
      // studio for polished metal: dark floor, bright soft ceiling, a horizon strip, one key and one rim light
      vec3 env = mix(vec3(0.035,0.037,0.04), vec3(0.78,0.8,0.83), smoothstep(-0.15, 0.85, r.y));
      env += vec3(0.95) * 0.75 * exp(-pow((r.y - 0.12) / 0.09, 2.0));
      env += vec3(1.0) * 1.1 * pow(max(dot(r, normalize(vec3(-0.55,0.6,0.58))), 0.0), 40.0);
      env += vec3(0.8,0.85,0.95) * 0.6 * pow(max(dot(r, normalize(vec3(0.9,0.2,-0.25))), 0.0), 14.0);
      float d = max(dot(n, normalize(vec3(-0.35,0.75,0.55))), 0.0);
      float fr = pow(1.0 - max(dot(n, v), 0.0), 4.0);
      vec3 col = env * 0.86 + vec3(0.5) * d * 0.1 + fr * vec3(0.18);
      gl_FragColor = vec4(col, 1.0);
    }`;

  function mount(root) {
    const box = $("[data-v3-root]", root); if (!box) return () => {};
    const canvas = $(".v3-c", box), poster = $(".v3-poster", box), loadEl = $(".v3-load", box), ui = $(".v3-ui", box);
    const reduce = YL.reduceMotion();
    let gl, prog, count = 0, itype, ext, raf = 0, dirty = true, alive = true, started = false, visible = false;
    let yaw = DEF.yaw, pitch = DEF.pitch, dist = DEF.dist, spin = !reduce, tween = null, fit = { c: [0, 0, 0], s: 1 };
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch) { $(".v3-h1", box).textContent = L(T.hintTouch); $(".v3-h2", box).hidden = true; }

    const io = new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; if (visible && !started) start(); if (visible) kick(); }), { rootMargin: "200px 0px" });
    io.observe(box);

    function fallback(err) {
      if (err) console.warn("3D viewer:", err);
      if (!alive) return;
      canvas.hidden = true; ui.hidden = true; loadEl.hidden = true;
      const v = document.createElement("video");
      v.className = "v3-video"; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata"; v.controls = true;
      v.poster = box.dataset.poster; v.src = box.dataset.video; v.setAttribute("aria-label", L({ ko: "원화 아트토이 회전 영상", en: "Art toy turntable video" }));
      poster.after(v); poster.hidden = true;
      if (!reduce) v.play().catch(() => {});
      const note = document.createElement("p"); note.className = "v3-note"; note.textContent = L(T.fail); box.appendChild(note);
    }

    async function start() {
      started = true;
      try {
        gl = canvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: true }) || canvas.getContext("experimental-webgl");
        if (!gl) throw new Error("no WebGL");
        ext = gl.getExtension("OES_element_index_uint");
      } catch (e) { fallback(e); return; }
      loadEl.hidden = false;
      let buf;
      try { buf = await fetchWithProgress(box.dataset.src, (p) => { $("b", loadEl).style.width = Math.round(p * 100) + "%"; $("em", loadEl).textContent = Math.round(p * 100) + "%"; }); }
      catch (e) { fallback(e); return; }
      if (!alive) return;
      let m;
      try { m = parseGLB(buf); if (m.idx instanceof Uint32Array && !ext) throw new Error("32-bit indices unsupported"); setup(m); }
      catch (e) { fallback(e); return; }
      loadEl.hidden = true; canvas.hidden = false; ui.hidden = false;
      canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); fallback("context lost"); });
      resize(); kick();
      if (!reduce) canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: "ease-out" }).onfinish = () => { poster.style.visibility = "hidden"; };
      else poster.style.visibility = "hidden";
    }

    async function fetchWithProgress(url, onP) {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const total = +res.headers.get("content-length") || 0;
      if (!res.body || !total) { const b = await res.arrayBuffer(); onP(1); return b; }
      // content-length can be the compressed size, so collect chunks and only use it for the progress bar
      const rd = res.body.getReader(), parts = []; let got = 0;
      for (;;) { const { done, value } = await rd.read(); if (done) break; parts.push(value); got += value.length; onP(Math.min(0.99, got / total)); }
      const out = new Uint8Array(got); let o = 0; parts.forEach((p) => { out.set(p, o); o += p.length; }); onP(1);
      return out.buffer;
    }

    function setup(m) {
      const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
      prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link failed");
      gl.useProgram(prog);
      let nrm = m.nrm; if (!nrm) nrm = computeNormals(m.pos, m.idx);
      const bind = (data, name) => { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0); };
      bind(m.pos, "p"); bind(nrm, "n");
      const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, m.idx, gl.STATIC_DRAW);
      count = m.idx.length; itype = m.idx instanceof Uint32Array ? gl.UNSIGNED_INT : m.idx instanceof Uint16Array ? gl.UNSIGNED_SHORT : gl.UNSIGNED_BYTE;
      const c = [0, 1, 2].map((i) => (m.min[i] + m.max[i]) / 2), ext3 = [0, 1, 2].map((i) => m.max[i] - m.min[i]);
      fit = { c, s: 2 / Math.hypot(ext3[0], ext3[1], ext3[2]) };
      gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);
    }
    function computeNormals(p, idx) {
      const n = new Float32Array(p.length);
      for (let i = 0; i < idx.length; i += 3) { const a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
        const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2], vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
        const x = uy * vz - uz * vy, y = uz * vx - ux * vz, z = ux * vy - uy * vx; [a, b, c].forEach((k) => { n[k] += x; n[k + 1] += y; n[k + 2] += z; }); }
      return n;
    }
    function resize() {
      if (!gl) return;
      const r = canvas.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; dirty = true; kick(); }
    }
    const ro = new ResizeObserver(resize); ro.observe(box);

    function draw() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const model = mul(sc(fit.s), tr(-fit.c[0], -fit.c[1], -fit.c[2]));
      const view = mul(tr(0, 0, -dist), mul(rotX(pitch), rotY(yaw)));
      gl.uniformMatrix4fv(gl.getUniformLocation(prog, "mv"), false, new Float32Array(mul(view, model)));
      gl.uniformMatrix4fv(gl.getUniformLocation(prog, "pr"), false, new Float32Array(persp(0.62, canvas.width / canvas.height, 0.05, 50)));
      gl.drawElements(gl.TRIANGLES, count, itype, 0);
    }
    let last = 0;
    function loop(t) {
      raf = 0;
      if (!alive || !visible || !prog) return;
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      if (spin) { yaw += dt * 0.00035; dirty = true; }
      if (tween) { const k = Math.min(1, (t - tween.t0) / 520), e = 1 - Math.pow(1 - k, 3); yaw = tween.y + (DEF.yaw - tween.y) * e; pitch = tween.p + (DEF.pitch - tween.p) * e; dist = tween.d + (DEF.dist - tween.d) * e; dirty = true; if (k >= 1) tween = null; }
      if (dirty) { draw(); dirty = false; }
      if (spin || tween) raf = requestAnimationFrame(loop); else last = 0;
    }
    function kick() { dirty = true; if (!raf && prog && visible) raf = requestAnimationFrame(loop); }
    const stopSpin = () => { spin = false; };
    const zoom = (f) => { dist = Math.max(1.6, Math.min(6.5, dist * f)); stopSpin(); kick(); };
    const clampP = () => { pitch = Math.max(-1.2, Math.min(1.2, pitch)); };

    /* pointer: mouse drags both axes; touch turns sideways only (the page keeps vertical scrolling), two fingers pinch */
    const pts = new Map(); let pinch0 = 0, dist0 = 0;
    canvas.addEventListener("pointerdown", (e) => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (e.pointerType === "mouse") canvas.setPointerCapture(e.pointerId); stopSpin(); tween = null; box.classList.add("grab");
      if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); dist0 = dist; } });
    canvas.addEventListener("pointermove", (e) => {
      const p = pts.get(e.pointerId); if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
      if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch0) { dist = Math.max(1.4, Math.min(6, dist0 * pinch0 / d)); } pitch += dy * 0.004; clampP(); kick(); return; }
      yaw += dx * 0.009; if (e.pointerType === "mouse") { pitch += dy * 0.007; clampP(); } kick();
    });
    const up = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = 0; if (!pts.size) box.classList.remove("grab"); };
    ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => canvas.addEventListener(ev, up));
    canvas.addEventListener("wheel", (e) => { if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault(); zoom(Math.exp(e.deltaY * 0.004)); }, { passive: false });
    canvas.addEventListener("keydown", (e) => {
      const k = e.key; let used = true;
      if (k === "ArrowLeft") yaw -= 0.15; else if (k === "ArrowRight") yaw += 0.15; else if (k === "ArrowUp") { pitch -= 0.12; clampP(); } else if (k === "ArrowDown") { pitch += 0.12; clampP(); }
      else if (k === "+" || k === "=") zoom(0.88); else if (k === "-" || k === "_") zoom(1.14); else if (k === "0") reset(); else used = false;
      if (used) { e.preventDefault(); stopSpin(); kick(); }
    });
    function reset() { stopSpin(); tween = { t0: performance.now(), y: ((yaw % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI, p: pitch, d: dist }; if (reduce) { yaw = DEF.yaw; pitch = DEF.pitch; dist = DEF.dist; tween = null; } kick(); }
    box.addEventListener("click", (e) => { const b = e.target.closest("[data-v3]"); if (!b) return; const a = b.dataset.v3; if (a === "in") zoom(0.85); if (a === "out") zoom(1.18); if (a === "reset") reset(); });

    return function destroy() { alive = false; io.disconnect(); ro.disconnect(); if (raf) cancelAnimationFrame(raf); if (gl) { const x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); } };
  }

  window.VIEWER3D = { markup, mount };
})();
