import fs from 'fs';
import path from 'path';

function search(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      search(full);
    } else if (full.endsWith('.js') || full.endsWith('.mjs')) {
      const cnt = fs.readFileSync(full, 'utf8');
      if (cnt.includes('Illegal constructor')) {
        console.log("Found in: " + full);
      }
    }
  }
}
try {
  search('node_modules');
} catch (e) {
  console.error("Error", e);
}
