import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const mediaDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\2d12029e-5b07-4bbb-982a-5f69f124dbf4';
const aboutImageName = 'media__1783876080446.png';
const logoImageName = 'media__1783875966529.png';

async function main() {
  const aboutPath = path.join(mediaDir, aboutImageName);
  const logoPath = path.join(mediaDir, logoImageName);
  
  console.log('Loading about image:', aboutPath);
  const aboutImg = await Jimp.read(aboutPath);
  console.log(`About Image dimensions: ${aboutImg.bitmap.width}x${aboutImg.bitmap.height}`);
  
  console.log('Loading logo image:', logoPath);
  const logoImg = await Jimp.read(logoPath);
  console.log(`Logo Image dimensions: ${logoImg.bitmap.width}x${logoImg.bitmap.height}`);

  // Create public assets directory if it doesn't exist
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Let's crop Dr. Aditi's photo:
  // In a standard 1920x1080 screen:
  // The biography photo is on the right side.
  // Let's assume standard crop coordinates and adjust based on dimensions.
  const w = aboutImg.bitmap.width;
  const h = aboutImg.bitmap.height;

  // Let's estimate:
  // X: from 55% of width to 90% of width (or similar). Let's see if we can find the exact image container.
  // Wait, let's write a script that does a couple of crop tests or outputs the coordinates of the image.
  // Since we can check the pixels or crop directly.
  // Let's write a crop for the portrait:
  // Let's look at screenshot 2 (Meet Dr. Aditi):
  // The image box has the doctor sitting at her desk, with a sign in the background.
  // Let's crop:
  // X starts around 1090 out of 1920 (approx 56.7%)
  // Y starts around 405 out of 1080 (approx 37.5%)
  // Width is around 630 out of 1920 (approx 32.8%)
  // Height is around 500 out of 1080 (approx 46.3%)
  // Let's scale these percentages to whatever the actual dimensions are!
  const portraitX = Math.round(w * 0.565);
  const portraitY = Math.round(h * 0.37);
  const portraitW = Math.round(w * 0.33);
  const portraitH = Math.round(h * 0.465);

  console.log(`Cropping portrait: x=${portraitX}, y=${portraitY}, w=${portraitW}, h=${portraitH}`);
  const portrait = aboutImg.clone().crop({ x: portraitX, y: portraitY, w: portraitW, h: portraitH });
  await portrait.write(path.join(assetsDir, 'dr-aditi.png'));
  console.log('Saved dr-aditi.png');

  // Let's crop the logo from Screenshot 1 (media__1783875966529.png)
  // Logo is centered, roundish square.
  // X: centered.
  // In 1024x538:
  // Logo is at X ~ 436, Y ~ 89, Width ~ 153, Height ~ 153.
  const logoW = Math.round(logoImg.bitmap.width * 0.15);
  const logoH = logoW; // square
  const logoX = Math.round((logoImg.bitmap.width - logoW) / 2);
  const logoY = Math.round(logoImg.bitmap.height * 0.165);

  console.log(`Cropping logo: x=${logoX}, y=${logoY}, w=${logoW}, h=${logoH}`);
  const logo = logoImg.clone().crop({ x: logoX, y: logoY, w: logoW, h: logoH });
  await logo.write(path.join(assetsDir, 'clinic-logo.png'));
  console.log('Saved clinic-logo.png');
}

main().catch(console.error);
