const https = require("https");

function getJson(url, { timeoutMs = 2500 } = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };
    try {
      const u = new URL(url);
      const req = https.request(
        {
          method: "GET",
          protocol: u.protocol,
          hostname: u.hostname,
          port: u.port,
          path: `${u.pathname || "/"}${u.search || ""}`,
          headers: { Accept: "application/json", "Cache-Control": "no-store" }
        },
        (res) => {
          let buf = "";
          res.setEncoding("utf8");
          res.on("data", (c) => (buf += c));
          res.on("end", () => {
            try {
              done({ ok: true, status: res.statusCode || 0, json: JSON.parse(buf || "{}") });
            } catch {
              done({ ok: false, status: res.statusCode || 0 });
            }
          });
        }
      );
      req.on("error", (e) => done({ ok: false, error: e?.message || String(e) }));
      req.setTimeout(timeoutMs, () => {
        try {
          req.destroy(new Error("timeout"));
        } catch {
          // ignore
        }
        done({ ok: false, timeout: true });
      });
      req.end();
    } catch (e) {
      done({ ok: false, error: e?.message || String(e) });
    }
  });
}

async function main() {
  const r = await getJson("https://api.ipify.org?format=json");
  const ip = String(r?.json?.ip || "").trim();
  if (!ip) {
    console.error("[stream-pack] Failed to detect IP.");
    process.exit(1);
  }
  console.log(ip);
}

main();

