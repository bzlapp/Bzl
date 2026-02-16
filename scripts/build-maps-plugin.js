const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const root = path.resolve(__dirname, "..");
const pluginDir = path.join(root, "plugins_dev", "maps");
const distDir = path.join(root, "dist", "plugins");
const outZip = path.join(distDir, "maps.zip");

function main() {
  if (!fs.existsSync(pluginDir)) {
    console.error("Missing plugin folder:", pluginDir);
    process.exit(1);
  }
  fs.mkdirSync(distDir, { recursive: true });
  const zip = new AdmZip();
  zip.addLocalFolder(pluginDir, "");
  zip.writeZip(outZip);
  console.log("Built:", outZip);
}

main();

