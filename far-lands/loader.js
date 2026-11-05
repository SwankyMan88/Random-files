// Far Lands loader for Khan Academy: builds the loading screen, then runs godot2ka's
// boot code. Generated from godot2ka's program.html so the KA program stays tiny.
(function () {
    "use strict";
    window.__g2kaSelf = (document.currentScript || {}).src;
    var style = document.createElement("style");
    style.textContent = "\n            html, body {\n                margin: 0;\n                padding: 0;\n                background: rgb(26, 26, 30);\n                overflow: hidden;\n            }\n\n            body {\n                font: 15px/1.5 system-ui, sans-serif;\n                color: rgb(216, 216, 220);\n            }\n\n            #g2ka-boot {\n                position: absolute;\n                inset: 0;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                gap: 14px;\n                text-align: center;\n                padding: 24px;\n            }\n\n            #g2ka-boot h1 {\n                margin: 0;\n                font-size: 19px;\n                font-weight: 600;\n            }\n\n            #g2ka-status {\n                color: rgb(154, 154, 162);\n                font-size: 13px;\n                min-height: 1.5em;\n            }\n\n            #g2ka-track {\n                width: min(420px, 80vw);\n                height: 6px;\n                background: rgb(48, 48, 56);\n                border-radius: 3px;\n                overflow: hidden;\n            }\n\n            #g2ka-fill {\n                width: 0;\n                height: 100%;\n                background: rgb(90, 169, 230);\n                transition: width 0.15s;\n            }\n\n            #g2ka-error {\n                max-width: 560px;\n                text-align: left;\n                color: rgb(255, 155, 155);\n                font-family: ui-monospace, monospace;\n                font-size: 12px;\n                white-space: pre-wrap;\n            }\n\n            #g2ka-canvas {\n                display: block;\n                margin: 0;\n                border: 0;\n                outline: none;\n                /* Without these, mobile browsers fight the game for touch\n                   gestures: the page scrolls/zooms on drag, taps flash blue,\n                   and long-presses pop up a selection or context menu. */\n                touch-action: none;\n                -webkit-user-select: none;\n                user-select: none;\n                -webkit-touch-callout: none;\n                -webkit-tap-highlight-color: transparent;\n            }\n\n            #g2ka-canvas:focus {\n                outline: none;\n            }\n\n            #g2ka-start {\n                appearance: none;\n                background: rgb(90, 169, 230);\n                border: 0;\n                border-radius: 6px;\n                color: rgb(16, 16, 20);\n                cursor: pointer;\n                font: 600 15px/1 system-ui, sans-serif;\n                padding: 11px 26px;\n            }\n\n            #g2ka-start:hover {\n                background: rgb(120, 187, 238);\n            }\n\n            #g2ka-start:focus-visible {\n                outline: 2px solid rgb(216, 216, 220);\n                outline-offset: 2px;\n            }\n\n            /* Secondary style: must not compete with the primary \"Start game\"\n               button that appears below it once loading finishes. */\n            #g2ka-fullscreen {\n                appearance: none;\n                background: transparent;\n                border: 1px solid rgb(58, 58, 68);\n                border-radius: 6px;\n                color: rgb(216, 216, 220);\n                cursor: pointer;\n                font: 600 13px/1 system-ui, sans-serif;\n                padding: 8px 18px;\n            }\n\n            #g2ka-fullscreen:hover {\n                background: rgba(90, 169, 230, 0.14);\n                border-color: rgb(90, 169, 230);\n            }\n\n            #g2ka-fullscreen:focus-visible {\n                outline: 2px solid rgb(216, 216, 220);\n                outline-offset: 2px;\n            }\n\n            #g2ka-audio-hint {\n                position: fixed;\n                left: 50%;\n                bottom: 14px;\n                transform: translateX(-50%);\n                background: rgba(20, 20, 24, 0.85);\n                border: 1px solid rgb(58, 58, 68);\n                border-radius: 999px;\n                color: rgb(216, 216, 220);\n                font: 13px system-ui, sans-serif;\n                padding: 7px 14px;\n                pointer-events: none;\n                z-index: 10;\n            }\n        ";
    document.head.appendChild(style);
    document.body.insertAdjacentHTML("beforeend", "<div id=\"g2ka-boot\">\n            <h1>Far Lands</h1>\n            <div id=\"g2ka-track\">\n                <div id=\"g2ka-fill\"></div>\n            </div>\n            <div id=\"g2ka-status\">Starting&hellip;</div>\n            <div id=\"g2ka-error\"></div>\n            <button id=\"g2ka-fullscreen\" type=\"button\">Fullscreen</button>\n        </div>\n\n        <canvas id=\"g2ka-canvas\" width=\"1\" height=\"1\" tabindex=\"0\"></canvas>");
    var pako = document.createElement("script");
    pako.src = "https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js";
    pako.onload = function () {

            var G2KA = {
                base: "game",
                realBase: "Far Lands",
                title: "Far Lands",
                kaWidth: 1066,
                renderScale: 1.0,
                startButton: true,
                worklets: {
                    audio_worklet: "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/game.audio.worklet.js",
                    audio_position_worklet: "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/game.audio.position.worklet.js"
                },
                scripts: [
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_audio_position_worklet_0.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_audio_worklet_0.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_wasm_0.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_wasm_1.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_0.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_1.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_2.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_pck_3.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_4.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_pck_5.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_pck_6.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_7.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_pck_8.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_pck_9.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@673c96e8289feb9fdf2ed7b77f1d646187e03cda/far-lands/g2ka_pck_10.js",
                    "https://cdn.jsdelivr.net/gh/SwankyMan88/Random-files@9a03195008d849232d2a7318bd9d12ab4b6fa95d/far-lands/g2ka_engine_0.js"
                ],
                assets: {
                    audio_position_worklet: {
                        filename: "Far Lands.audio.position.worklet.js",
                        virtualName: "game.audio.position.worklet.js",
                        chunks: 1,
                        rawSize: 2973,
                        contentType: "application/javascript"
                    },
                    audio_worklet: {
                        filename: "Far Lands.audio.worklet.js",
                        virtualName: "game.audio.worklet.js",
                        chunks: 1,
                        rawSize: 7298,
                        contentType: "application/javascript"
                    },
                    wasm: {
                        filename: "Far Lands.wasm",
                        virtualName: "game.wasm",
                        chunks: 2,
                        rawSize: 37685705,
                        contentType: "application/wasm"
                    },
                    pck: {
                        filename: "Far Lands.pck",
                        virtualName: "game.pck",
                        chunks: 11,
                        rawSize: 54245476,
                        contentType: "application/octet-stream"
                    },
                    engine: {
                        filename: "Far Lands.js",
                        virtualName: "game.js",
                        chunks: 1,
                        rawSize: 315759,
                        contentType: "application/javascript"
                    }
                },
                fileSizes: {
                    "game.wasm": 37685705,
                    "game.pck": 54245476
                },
                totalRawBytes: 92257211,
                totalWireBytes: 81695396
            };

            // Must run before any getElementById below: if a live-editor re-run
            // leaves duplicate ids in the DOM instead of a clean replace, whichever
            // node getElementById finds first gets bound to this run's code -- which
            // can silently be a DIFFERENT node than the one actually visible, making
            // a widget look "stuck" even though this run's code is working correctly.
            g2kaRemoveStaleWidgets();

            var g2kaBoot = document.getElementById("g2ka-boot");
            var g2kaFill = document.getElementById("g2ka-fill");
            var g2kaStatus = document.getElementById("g2ka-status");
            var g2kaErrBox = document.getElementById("g2ka-error");
            var g2kaCanvas = document.getElementById("g2ka-canvas");
            var G2KA_ASSETS = {};
            var G2KA_MATCH_ORDER = null;
            var G2KA_AUDIO_CTXS = [];

            window.__g2kaCtxRegistry = window.__g2kaCtxRegistry || [];

            function g2kaSay(msg) {
                g2kaStatus.textContent = msg;
            }

            function g2kaProgress(f) {
                var value = Math.max(0, Math.min(1, f));
                g2kaFill.style.width = (value * 100) + "%";
            }

            function g2kaFail(msg, err) {
                g2kaSay(msg);
                g2kaFill.style.background = "rgb(255, 107, 107)";
                g2kaErrBox.textContent = err ? (err.stack || String(err)) : "";
                if (err) {
                    console.error(err);
                }
            }

            // jsDelivr can briefly answer 403 the first time it pulls a new file from
            // GitHub, so a failed chunk is retried a few times, alternating mirrors.
            function g2kaLoadScript(url, attempt) {
                attempt = attempt || 0;
                var src = url;
                if (attempt > 0) {
                    src = (attempt % 2 ? url.replace("://cdn.jsdelivr.net/", "://fastly.jsdelivr.net/") : url) + "?retry=" + attempt;
                }
                return new Promise(function (resolve, reject) {
                    var el = document.createElement("script");
                    el.src = src;
                    el.async = false;
                    el.onload = function () {
                        resolve();
                    };
                    el.onerror = function () {
                        el.remove();
                        if (attempt >= 4) {
                            reject(new Error("failed to load " + url));
                            return;
                        }
                        setTimeout(function () {
                            g2kaLoadScript(url, attempt + 1).then(resolve, reject);
                        }, 800 * (attempt + 1));
                    };
                    document.head.appendChild(el);
                });
            }

            function g2kaLoadAllChunks() {
                var total = G2KA.scripts.length;
                var done = 0;
                var batchSize = 4;

                function step(index) {
                    if (index >= total) {
                        return Promise.resolve();
                    }

                    var batch = G2KA.scripts.slice(index, index + batchSize).map(function (url) {
                        return g2kaLoadScript(url).then(function () {
                            done += 1;
                            g2kaProgress(done / total * 0.75);
                            g2kaSay("Downloading " + done + " / " + total + " chunks");
                        });
                    });

                    return Promise.all(batch).then(function () {
                        return step(index + batchSize);
                    });
                }

                return step(0);
            }

            function g2kaBase64ToBytes(clean) {
                // No sanitising pass: pack.py emits pure, 4-aligned base64 with
                // no whitespace, so scanning a 12 MB string for characters that
                // cannot be there just costs a second copy of it. A corrupted
                // chunk is still caught downstream by the rawSize check.

                // Native decoder (Chrome 133+, Safari 18.2+, Firefox 133+) is
                // ~6x faster than the atob + charCodeAt loop below.
                if (typeof Uint8Array.fromBase64 === "function") {
                    try {
                        return Uint8Array.fromBase64(clean);
                    } catch (e) {
                        // Malformed input: fall through to the portable path,
                        // which fails the same way but with the older message.
                    }
                }

                var pad = 0;

                if (clean.charAt(clean.length - 1) === "=") {
                    pad = 1;
                }
                if (clean.charAt(clean.length - 2) === "=") {
                    pad = 2;
                }

                var out = new Uint8Array((clean.length / 4) * 3 - pad);
                var sliceSize = 1024 * 1024 * 4;
                var offset = 0;

                for (var start = 0; start < clean.length; start += sliceSize) {
                    var binary = atob(clean.slice(start, start + sliceSize));
                    for (var i = 0; i < binary.length; i++) {
                        out[offset + i] = binary.charCodeAt(i);
                    }
                    offset += binary.length;
                }

                return out;
            }

            function g2kaChunksToBytes(parts) {
                // Every chunk is a whole number of base64 quanta (pack.py slices
                // on a multiple of 4), so each decodes independently. Doing that
                // avoids materialising the joined string -- on the wasm asset
                // that alone is a 12 MB allocation held alongside the output.
                if (parts.length === 1) {
                    return g2kaBase64ToBytes(parts[0]);
                }

                var bufs = [];
                var total = 0;

                for (var i = 0; i < parts.length; i++) {
                    var buf = g2kaBase64ToBytes(parts[i]);
                    bufs.push(buf);
                    total += buf.length;
                }

                var out = new Uint8Array(total);
                var offset = 0;

                for (var j = 0; j < bufs.length; j++) {
                    out.set(bufs[j], offset);
                    offset += bufs[j].length;
                    bufs[j] = null;
                }

                return out;
            }

            function g2kaGunzip(bytes) {
                if (typeof DecompressionStream === "function") {
                    var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
                    return new Response(stream).arrayBuffer().then(function (buf) {
                        return new Uint8Array(buf);
                    });
                }

                if (typeof pako === "undefined") {
                    return Promise.reject(new Error("no gzip support: DecompressionStream missing and pako failed to load"));
                }

                return Promise.resolve(pako.ungzip(bytes));
            }

            function g2kaDecodeAll() {
                var keys = Object.keys(G2KA.assets);
                var index = 0;

                function next() {
                    if (index >= keys.length) {
                        return Promise.resolve();
                    }

                    var key = keys[index++];
                    var meta = G2KA.assets[key];
                    var parts = (window.__G2KA || {})[key];

                    if (!parts) {
                        return Promise.reject(new Error("chunks for '" + key + "' never loaded"));
                    }

                    for (var i = 0; i < meta.chunks; i++) {
                        if (typeof parts[i] !== "string") {
                            return Promise.reject(new Error("chunk " + i + " of '" + key + "' is missing"));
                        }
                    }

                    g2kaSay("Decompressing " + meta.filename);
                    g2kaProgress(0.75 + (index / keys.length) * 0.2);

                    return new Promise(function (resolve) {
                        setTimeout(resolve, 0);
                    })
                        .then(function () {
                            return g2kaGunzip(g2kaChunksToBytes(parts.slice(0, meta.chunks)));
                        })
                        .then(function (bytes) {
                            if (bytes.length !== meta.rawSize) {
                                console.warn(
                                    "godot2ka: " + meta.filename + " decoded to " + bytes.length +
                                    " bytes, manifest expected " + meta.rawSize
                                );
                            }

                            G2KA_ASSETS[key] = {
                                bytes: bytes,
                                filename: meta.filename,
                                virtualName: meta.virtualName,
                                contentType: meta.contentType
                            };

                            parts.length = 0;
                            return next();
                        });
                }

                return next();
            }

            function g2kaAssetForUrl(url) {
                if (!G2KA_MATCH_ORDER) {
                    G2KA_MATCH_ORDER = Object.keys(G2KA_ASSETS).sort(function (a, b) {
                        return G2KA_ASSETS[b].virtualName.length - G2KA_ASSETS[a].virtualName.length;
                    });
                }

                var path = String(url).split("?")[0].split("#")[0];

                try {
                    path = decodeURIComponent(path);
                } catch (e) {
                    // leave as-is
                }

                for (var i = 0; i < G2KA_MATCH_ORDER.length; i++) {
                    var asset = G2KA_ASSETS[G2KA_MATCH_ORDER[i]];
                    if (path.slice(-asset.virtualName.length) === asset.virtualName) {
                        return asset;
                    }
                }

                return null;
            }

            function g2kaRenderScale() {
                var match = /[?&]scale=([0-9.]+)/.exec(String(location.search));
                var scale = match ? parseFloat(match[1]) : G2KA.renderScale;

                if (!isFinite(scale) || scale <= 0) {
                    scale = 1;
                }

                return Math.max(0.1, Math.min(4, scale));
            }

            // Godot leaves WebGL's powerPreference at Emscripten's "default",
            // which on a dual-GPU laptop usually resolves to the integrated
            // chip -- a large, silent frame-rate loss in a 3D game.
            //
            // Rather than pre-creating the context (which would force us to
            // guess every attribute Godot needs), wrap getContext and merge one
            // key into whatever Godot itself asks for. Best-effort: if the
            // prototype is frozen the game simply runs as before.
            function g2kaPreferDiscreteGpu() {
                try {
                    var proto = HTMLCanvasElement.prototype;
                    var original = proto.getContext;

                    if (typeof original !== "function" || original.__g2kaPatched) {
                        return;
                    }

                    function patched(type, attrs) {
                        if (this === g2kaCanvas && /^webgl/i.test(String(type))) {
                            var merged = {};
                            var key;

                            for (key in attrs || {}) {
                                merged[key] = attrs[key];
                            }

                            merged.powerPreference = "high-performance";
                            return original.call(this, type, merged);
                        }

                        return original.apply(this, arguments);
                    }

                    patched.__g2kaPatched = true;
                    proto.getContext = patched;
                } catch (e) {
                    console.warn("godot2ka: could not request the high-performance GPU", e);
                }
            }

            function g2kaSizeCanvas() {
                var scale = g2kaRenderScale();
                var cssW = Math.max(1, window.innerWidth);
                var cssH = Math.max(1, window.innerHeight);

                g2kaCanvas.style.width = cssW + "px";
                g2kaCanvas.style.height = cssH + "px";

                var iw = Math.max(1, Math.round(cssW * scale));
                var ih = Math.max(1, Math.round(cssH * scale));

                if (g2kaCanvas.width !== iw || g2kaCanvas.height !== ih) {
                    g2kaCanvas.width = iw;
                    g2kaCanvas.height = ih;
                }
            }

            function g2kaBlobUrlFor(asset) {
                if (!asset.blobUrl) {
                    asset.blobUrl = URL.createObjectURL(new Blob([asset.bytes], { type: asset.contentType }));
                }
                return asset.blobUrl;
            }

            function g2kaHookAudioContext() {
                try {
                    // KA's live editor can re-run this whole script inside the SAME
                    // window (the DOM is torn down and rebuilt, but window survives --
                    // which is exactly why old audio keeps playing across a re-run).
                    // On a second run, window.AudioContext is no longer native: it is
                    // already the previous run's Wrapped. Wrapping THAT would route
                    // every new context through the old run's closure, pushing into
                    // its stale G2KA_AUDIO_CTXS instead of this run's -- silently
                    // breaking audio-state tracking every time the script re-executes.
                    // Caching the true native constructor once makes re-wrapping
                    // idempotent no matter how many times this function runs.
                    if (!window.__g2kaNativeAudioContext) {
                        window.__g2kaNativeAudioContext =
                            window.AudioContext || window.webkitAudioContext;
                    }
                    var Real = window.__g2kaNativeAudioContext;

                    if (!Real) {
                        return;
                    }

                    function Wrapped() {
                        var ctx = Reflect.construct(Real, arguments, Wrapped);
                        G2KA_AUDIO_CTXS.push(ctx);
                        window.__g2kaCtxRegistry.push(ctx);
                        return ctx;
                    }

                    Wrapped.prototype = Real.prototype;

                    Object.defineProperty(window, "AudioContext", {
                        value: Wrapped,
                        writable: true,
                        configurable: true
                    });

                    window.webkitAudioContext = Wrapped;
                } catch (e) {
                    console.warn("godot2ka: could not hook AudioContext; audio may stay muted", e);
                }
            }

            function g2kaStopPreviousAudio() {
                var registry = window.__g2kaCtxRegistry;
                var stopped = 0;

                for (var i = 0; i < registry.length; i++) {
                    var ctx = registry[i];

                    if (!ctx || G2KA_AUDIO_CTXS.indexOf(ctx) !== -1) {
                        continue;
                    }

                    try {
                        if (ctx.state !== "closed") {
                            ctx.close();
                            stopped += 1;
                        }
                    } catch (e) {
                        // already closing, or not closeable
                    }
                }

                registry.length = 0;

                var media = document.querySelectorAll("audio, video");

                for (var j = 0; j < media.length; j++) {
                    try {
                        media[j].pause();
                    } catch (e) {
                        // not playable
                    }
                }

                if (stopped > 0) {
                    console.log("godot2ka: silenced " + stopped + " audio context(s) left over from a previous run");
                }
            }

            function g2kaAudioRunning() {
                for (var i = 0; i < G2KA_AUDIO_CTXS.length; i++) {
                    if (G2KA_AUDIO_CTXS[i] && G2KA_AUDIO_CTXS[i].state === "running") {
                        return true;
                    }
                }

                return false;
            }

            function g2kaHideAudioHint() {
                var hint = document.getElementById("g2ka-audio-hint");

                if (hint) {
                    hint.remove();
                }
            }

            function g2kaRemoveById(id) {
                // querySelectorAll, not getElementById: removes every stray copy,
                // not just the first match, in case more than one is present.
                var all = document.querySelectorAll("#" + id);
                for (var i = 0; i < all.length; i++) {
                    all[i].remove();
                }
            }

            function g2kaShowAudioHint() {
                // Remove any existing node with this id before creating ours, rather
                // than skipping creation when one is already present: a leftover node
                // from an earlier run is not "already shown", it is dead and stuck.
                g2kaRemoveById("g2ka-audio-hint");

                var hint = document.createElement("div");
                hint.id = "g2ka-audio-hint";
                hint.textContent = "Click to enable sound";
                document.body.appendChild(hint);
            }

            function g2kaResumeAudio() {
                for (var i = 0; i < G2KA_AUDIO_CTXS.length; i++) {
                    var ctx = G2KA_AUDIO_CTXS[i];

                    if (ctx && ctx.state !== "running" && typeof ctx.resume === "function") {
                        ctx.resume().then(g2kaHideAudioHint, function () {
                            // still no user activation
                        });
                    }
                }

                if (g2kaAudioRunning()) {
                    g2kaHideAudioHint();
                }
            }

            function g2kaWatchAudio() {
                window.__g2kaAudio = {
                    ctxs: G2KA_AUDIO_CTXS,
                    state: function () {
                        return G2KA_AUDIO_CTXS.length ? G2KA_AUDIO_CTXS[0].state : "none";
                    },
                    running: g2kaAudioRunning,
                    resume: g2kaResumeAudio,
                    stopPrevious: g2kaStopPreviousAudio
                };

                var events = ["pointerdown", "mousedown", "touchstart", "keydown"];

                for (var i = 0; i < events.length; i++) {
                    window.addEventListener(events[i], g2kaResumeAudio, { capture: true, passive: true });
                }

                setTimeout(function () {
                    if (G2KA_AUDIO_CTXS.length && !g2kaAudioRunning()) {
                        g2kaShowAudioHint();
                        console.warn(
                            "godot2ka: AudioContext is suspended (autoplay policy). Sound starts " +
                            "after the first click. This is normal inside KA's iframe."
                        );
                    }
                }, 1200);
            }

            function g2kaAwaitStart() {
                if (G2KA.startButton === false) {
                    return Promise.resolve();
                }

                return new Promise(function (resolve) {
                    g2kaProgress(1);
                    g2kaSay("Ready");
                    g2kaHideAudioHint();
                    g2kaRemoveById("g2ka-start");

                    var button = document.createElement("button");
                    button.id = "g2ka-start";
                    button.type = "button";
                    button.textContent = "Start game";

                    button.addEventListener("click", function () {
                        button.disabled = true;
                        button.remove();
                        g2kaResumeAudio();
                        if (window.g2kaPopped) {
                            g2kaEnterFullscreen();
                        }
                        resolve();
                    });

                    g2kaBoot.appendChild(button);
                });
            }

            function g2kaInstallHooks() {
                window.__g2kaFetch = function (file) {
                    var asset = g2kaAssetForUrl(file);

                    if (!asset) {
                        return window.fetch(file, { credentials: "same-origin" });
                    }

                    return Promise.resolve(new Response(asset.bytes, {
                        status: 200,
                        statusText: "OK",
                        headers: {
                            "Content-Type": asset.contentType,
                            "Content-Length": String(asset.bytes.length)
                        }
                    }));
                };

                window.__g2kaBlob = function (key) {
                    var url = (G2KA.worklets || {})[key];

                    if (url) {
                        return url;
                    }

                    if (!G2KA_ASSETS[key]) {
                        console.warn("godot2ka: no asset for worklet '" + key + "'; audio may fail");
                        return G2KA.base + "." + key + ".js";
                    }

                    console.warn(
                        "godot2ka: no CDN URL for worklet '" + key + "', falling back to a blob: " +
                        "URL. KA's CSP blocks blob: scripts, so audio will be silent there."
                    );

                    return g2kaBlobUrlFor(G2KA_ASSETS[key]);
                };
            }

            function g2kaPatchGlue(src) {
                var patches = [
                    {
                        required: true,
                        what: "loadFetch",
                        from: "return fetch(file).then(function (response) {",
                        to: "return window.__g2kaFetch(file).then(function (response) {"
                    },
                    {
                        required: false,
                        what: "audio worklet URL",
                        from: "return `${loadPath}.audio.worklet.js`;",
                        to: "return window.__g2kaBlob('audio_worklet');"
                    },
                    {
                        required: false,
                        what: "audio position worklet URL",
                        from: "return `${loadPath}.audio.position.worklet.js`;",
                        to: "return window.__g2kaBlob('audio_position_worklet');"
                    }
                ];

                var out = src;

                for (var i = 0; i < patches.length; i++) {
                    var p = patches[i];

                    if (out.indexOf(p.from) === -1) {
                        if (p.required) {
                            throw new Error(
                                "could not patch Godot's " + p.what + "; this Godot version's loader " +
                                "differs from the one godot2ka was built against"
                            );
                        }

                        console.warn("godot2ka: optional patch skipped (" + p.what + ")");
                        continue;
                    }

                    out = out.split(p.from).join(p.to);
                }

                return out;
            }

            function g2kaStartGodot() {
                g2kaSay("Starting engine…");
                g2kaProgress(0.97);

                g2kaInstallHooks();
                g2kaHookAudioContext();
                g2kaPreferDiscreteGpu();

                var glue = new TextDecoder("utf-8").decode(G2KA_ASSETS.engine.bytes);
                glue = g2kaPatchGlue(glue);

                (0, eval)(glue);

                var EngineCtor = window.Engine || (typeof Engine !== "undefined" ? Engine : null);
                if (typeof EngineCtor !== "function") {
                    throw new Error("engine script ran but did not define Engine (unexpected Godot version?)");
                }

                g2kaSizeCanvas();
                window.addEventListener("resize", g2kaSizeCanvas);

                var config = {
                    args: [],
                    canvas: g2kaCanvas,
                    canvasResizePolicy: 0,
                    executable: G2KA.base,
                    mainPack: G2KA.base + ".pck",
                    fileSizes: G2KA.fileSizes,
                    experimentalVK: false,
                    focusCanvas: true,
                    gdextensionLibs: [],
                    ensureCrossOriginIsolationHeaders: false,
                    onPrint: function () {
                        console.log.apply(console, arguments);
                    },
                    onPrintError: function () {
                        console.error.apply(console, arguments);
                    },
                    onProgress: function (loaded, total) {
                        if (total > 0) {
                            g2kaProgress(0.97 + (loaded / total) * 0.03);
                        }
                    }
                };

                var engine = new EngineCtor(config);

                return engine.startGame({
                    onExit: function (code) {
                        console.log("godot exited with", code);
                    }
                }).then(function () {
                    g2kaBoot.remove();
                    g2kaCanvas.focus();
                    g2kaWatchAudio();
                });
            }

            function g2kaRemoveStaleWidgets() {
                var ids = [
                    "g2ka-boot", "g2ka-fill", "g2ka-status", "g2ka-error",
                    "g2ka-canvas", "g2ka-start", "g2ka-audio-hint",
                    "g2ka-fullscreen"
                ];
                ids.forEach(function (id) {
                    var all = document.querySelectorAll("#" + id);
                    for (var i = 0; i < all.length - 1; i++) {
                        all[i].remove();
                    }
                });
            }

            // ---------------------------------------------------------------
            // FULLSCREEN BUTTON
            //
            // >>>>>>  PUT YOUR FULLSCREEN CODE IN THE FUNCTION BELOW  <<<<<<
            //
            // The button sits on the loading screen and is live from the first
            // frame, so it can be clicked while the packages are still
            // downloading. It disappears with the rest of the loading screen
            // when the game starts.
            //
            // Two things worth knowing before you write the body:
            //
            //  1. Call requestFullscreen() SYNCHRONOUSLY, right here in this
            //     function. Browsers only honour the request while the click's
            //     user activation is still live, so anything moved behind an
            //     await, a .then() or a setTimeout is rejected with
            //     "API can only be initiated by a user gesture".
            //
            //  2. On Khan Academy the program runs inside an iframe, and
            //     fullscreen works only if that iframe carries
            //     allow="fullscreen". Read document.fullscreenEnabled at
            //     runtime to find out whether it does.
            // ---------------------------------------------------------------
            function g2kaEnterFullscreen() {
                var el = document.documentElement;
                var go = el.requestFullscreen || el.webkitRequestFullscreen;
                if (go) {
                    try {
                        var p = go.call(el);
                        if (p && p.catch) {
                            p.catch(function () {});
                        }
                    } catch (e) {
                        // refused: the game still runs windowed
                    }
                }
            }

            function g2kaOnFullscreenClick() {
                // Pine Valley's method. Khan Academy's frame refuses fullscreen, and
                // asking first would use up the click, so inside a frame the game
                // opens in its own tab straight away; that tab can go fullscreen.
                if (window.top === window) {
                    g2kaEnterFullscreen();
                    return;
                }
                var w = null;
                try {
                    w = window.open("", "_blank");
                } catch (e) {
                    w = null;
                }
                if (!w) {
                    g2kaSay("Couldn't open a new tab (popups blocked). Allow popups, or press F11.");
                    return;
                }
                var tag = "scr" + "ipt";
                var html = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" + document.title + "</title>" +
                    "<style>html, body { margin: 0; background: rgb(26, 26, 30); overflow: hidden; }</style>" +
                    "<" + tag + ">window.g2kaPopped = true;</" + tag + "></head><body>" +
                    "<" + tag + " src=\"" + window.__g2kaSelf + "\"></" + tag + "></body></html>";
                try {
                    w.document.open();
                    w.document.write(html);
                    w.document.close();
                } catch (e) {
                    w.close();
                    g2kaSay("Couldn't open the fullscreen tab here. Press F11 instead.");
                    return;
                }
                // Two copies at once is too much: this one goes quiet until the tab closes.
                var ctxs = (window.__g2kaAudio && window.__g2kaAudio.ctxs) || G2KA_AUDIO_CTXS;
                ctxs.forEach(function (c) { try { c.suspend(); } catch (e) {} });
                g2kaSay("Running in the new tab. Close it to come back here.");
                var watch = setInterval(function () {
                    if (!w.closed) {
                        return;
                    }
                    clearInterval(watch);
                    ctxs.forEach(function (c) { try { c.resume(); } catch (e) {} });
                }, 500);
            }

            function g2kaWireFullscreenButton() {
                var button = document.getElementById("g2ka-fullscreen");

                if (!button) {
                    return;
                }

                button.addEventListener("click", function () {
                    // Contained so a throw here can never stop the game from
                    // loading -- fullscreen is a nicety, booting is not.
                    try {
                        g2kaOnFullscreenClick();
                    } catch (e) {
                        console.warn("godot2ka: the fullscreen handler threw", e);
                    }
                });
            }

            function g2kaMain() {
                g2kaStopPreviousAudio();
                g2kaWireFullscreenButton();

                g2kaLoadAllChunks()
                    .then(g2kaDecodeAll)
                    .then(g2kaAwaitStart)
                    .then(g2kaStartGodot)
                    .catch(function (err) {
                        g2kaFail("Failed to start.", err);
                    });
            }

            g2kaMain();
        
    };
    pako.onerror = function () {
        var e = document.getElementById("g2ka-error");
        if (e) { e.textContent = "Could not load the decompressor (pako)."; }
    };
    document.head.appendChild(pako);
})();
