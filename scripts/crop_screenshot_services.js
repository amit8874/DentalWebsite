import { Jimp } from 'jimp';
import fs from 'fs';

async function cropAndSave() {
  const inputPath = 'C:/Users/LENOVO/.gemini/antigravity/brain/ad940d9e-dc9b-42a5-94d2-742d90fe63ec/.user_uploaded/media_1793355069534_d09df635.png';
  const img = await Jimp.read(inputPath);
  const outDir = 'public/assets/treatments';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const regions = [
    { name: 'root-canal.jpg', x: 4, y: 125, w: 242, h: 145 },
    { name: 'dental-implant.jpg', x: 258, y: 125, w: 248, h: 145 },
    { name: 'cosmetic-dentistry.jpg', x: 524, y: 125, w: 242, h: 145 },
    { name: 'laser-dentistry.jpg', x: 784, y: 125, w: 236, h: 145 }
  ];

  for (const r of regions) {
    const clone = img.clone();
    clone.crop({ x: r.x, y: r.y, w: r.w, h: r.h });
    const outPath = `${outDir}/${r.name}`;
    await clone.write(outPath);
    console.log(`Saved ${outPath}`);
  }
}

cropAndSave().catch(console.error);
