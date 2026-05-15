import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const PUBLIC = './public';

async function optimize(input, options) {
  const original = await fs.stat(input);
  const originalKb = (original.size / 1024).toFixed(0);

  let pipeline = sharp(input);
  if (options.resize) {
    pipeline = pipeline.resize(options.resize, options.resize, { fit: 'cover', position: 'center' });
  }
  // Re-save as PNG with high compression (keeps backwards-compat with all <img src>)
  await pipeline
    .png({ quality: 80, compressionLevel: 9, palette: true })
    .toFile(input + '.tmp');

  const newSize = (await fs.stat(input + '.tmp')).size;
  await fs.rename(input + '.tmp', input);
  const newKb = (newSize / 1024).toFixed(0);

  const savedPct = ((1 - newSize / original.size) * 100).toFixed(0);
  console.log(`  ✓ ${path.basename(input)}: ${originalKb} → ${newKb} KB  (-${savedPct}%)`);
}

console.log('Optimizing avatars (resize → 256×256, max ~20KB each)...');
for (const name of ['andriy.png', 'nadiya.png', 'oleksiy.png']) {
  await optimize(path.join(PUBLIC, 'avatars', name), { resize: 256 });
}

console.log('\nOptimizing hand.png (resize → 800×800)...');
await optimize(path.join(PUBLIC, 'hand.png'), { resize: 800 });

console.log('\nOptimizing brand-card.png (resize → 600×600)...');
await optimize(path.join(PUBLIC, 'brand-card.png'), { resize: 600 });

console.log('\nDone! Run `npm run build` to regenerate the static export.');
