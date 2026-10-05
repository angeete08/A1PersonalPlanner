// jac-client-events.js (generated) - raw dev-loop event transport.
// This plugin resolves nothing, stores nothing and renders nothing.
// It writes one tagged JSON line per event to stdout, the stream the
// jac process already reads. That process is the side that maps a
// compiled coordinate back to a .jac (or jac.toml) location, classifies
// it, renders it with the same renderer `jac check` uses, and owns
// .jac-status.json.
const PREFIX = "@@jac-client-event ";

function emit(slot, payload) {
  try {
    process.stdout.write(PREFIX + JSON.stringify({ slot: slot, payload: payload }) + "\n");
  } catch (e) {}
}

// Called by jacErrorReporter with the browser's own payload, verbatim.
// A module-load failure means the app never came up, so it lands in the
// build-health slot; anything thrown after load is reported to the terminal
// but does not declare the build broken.
export function recordClientEvent(data) {
  const d = data || {};
  emit(d.phase === "load" ? "client" : "runtime", {
    "type": String(d.type || "Error"),
    "message": String(d.message || "client module load failed"),
    "stack": String(d.stack || ""),
    "source": String(d.source || ""),
    "line": Number(d.line || 0),
    "column": Number(d.column || 0),
    "phase": String(d.phase || ""),
  });
}

export default function jacClientEvents() {
  return {
    name: "jac-client-events",
    apply: "serve",
    configureServer(server) {
      let viteBroken = false;

      // Vite announces every transform/resolve failure on its HMR channel
      // (the payload that drives its own error overlay), and update/full-reload
      // on recovery. Mirror exactly those semantics onto the vite slot.
      const wrap = (chan) => {
        if (!chan || typeof chan.send !== "function" || chan.__jacClientEvents) return;
        chan.__jacClientEvents = true;
        const orig = chan.send.bind(chan);
        chan.send = (...args) => {
          try {
            const payload = args[0];
            if (payload && payload.type === "error" && payload.err) {
              // jac* payloads are the Jac and browser layers, tracked elsewhere
              if (!String(payload.err.plugin || "").startsWith("jac")) {
                const err = payload.err;
                viteBroken = true;
                emit("vite", {
                  "message": String(err.message || "Vite error"),
                  "stack": String(err.stack || ""),
                  "id": String(err.id || ""),
                  "plugin": String(err.plugin || ""),
                  "frame": String(err.frame || ""),
                  "loc": err.loc || null,
                });
              }
            } else if (
              payload
              && (payload.type === "update" || payload.type === "full-reload")
              && viteBroken
              // Jac-recovery reloads (jacBuildErrorOverlay) say nothing about
              // the Vite layer; with no client connected nothing will re-arm
              // a still-broken module, so keep the error latched.
              && !payload.jacTriggered
              && server.ws.clients
              && server.ws.clients.size > 0
            ) {
              viteBroken = false;
              emit("vite", null);
            }
          } catch (e) {}
          return orig(...args);
        };
      };
      wrap(server.ws);
      wrap(server.hot);

      // The dev index.html sends this after the entry module loads cleanly:
      // the only reliable "browser recovered" signal a server can get.
      const onReady = () => { emit("ready", null); };
      server.ws.on("jac:client-ready", onReady);
      // mirror wrap(): register on the HMR channel too if it is distinct
      if (server.hot && server.hot !== server.ws && typeof server.hot.on === "function") {
        try { server.hot.on("jac:client-ready", onReady); } catch (e) {}
      }
    },
  };
}
