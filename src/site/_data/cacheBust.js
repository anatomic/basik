import fs from "fs";
import crypto from "crypto";

function getFileHash(filepath) {
  try {
    const content = fs.readFileSync(filepath);
    return crypto.createHash("md5").update(content).digest("hex").slice(0, 8);
  } catch {
    // File doesn't exist yet (first build), use timestamp
    return Date.now().toString(36);
  }
}

export default function () {
  return {
    css: getFileHash("src/site/css/styles.css"),
    js: getFileHash("src/site/js/main.js"),
  };
}
