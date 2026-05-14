const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../../documentos/Estatuto.pdf");
const destDir = path.resolve(__dirname, "../public/docs");
const dest = path.join(destDir, "Estatuto.pdf");

if (!fs.existsSync(src)) {
  console.error(`[copy-estatuto] Source not found: ${src}`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log(`[copy-estatuto] Copied ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
