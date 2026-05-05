// Generate PNG icons from SVG
// Run: node scripts/generate-icons.js
// Requires: npm install sharp

import sharp from 'sharp';
import { resolve } from 'path';

const svgPath = resolve('public/icons/icon-512.svg');

await sharp(svgPath).resize(512, 512).png().toFile('public/icons/icon-512.png');
await sharp(svgPath).resize(192, 192).png().toFile('public/icons/icon-192.png');

console.log('Icons generated successfully!');
