import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = 'public/assets/treatments';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Map of curated high-quality dental images
const images = {
  // Teeth braces
  'teeth-braces.jpg': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
  // Clear aligners
  'aligners.jpg': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
  // Kids dentistry - happy child dentist
  'kids-dentistry.jpg': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
  // Mouth ulcers / oral medicine
  'mouth-ulcers.jpg': 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
  // Dental crowns
  'dental-crowns.jpg': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
  // Dental fillings / restoration
  'dental-fillings.jpg': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
  // Wisdom teeth extraction
  'wisdom-teeth.jpg': 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=600&q=80',
  // Dentures prosthetics
  'dentures.jpg': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
  // Advanced gum treatment / periodontics
  'advanced-gum.jpg': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outDir, filename));
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(filename, res.headers.location).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(outDir, filename), () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [name, url] of Object.entries(images)) {
    try {
      await download(name, url);
    } catch (e) {
      console.error(`Failed ${name}:`, e.message);
    }
  }
}

run();
