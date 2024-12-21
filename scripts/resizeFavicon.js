const sharp = require('sharp');
const path = require('path');

const sizes = {
  favicon: 2048,
  apple: 180,
  favicon32: 32,
  favicon16: 16
};

async function generateFavicons() {
  const inputPath = path.join(__dirname, '../src/assets/Logo.png');
  const outputDir = path.join(__dirname, '../public');

  try {
    // Generate main favicon (2048x2048) with maximum quality
    await sharp(inputPath)
      .resize(sizes.favicon, sizes.favicon, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
        withoutEnlargement: false
      })
      .sharpen()
      .png({
        quality: 100,
        compressionLevel: 0,
        force: true
      })
      .toFile(path.join(outputDir, 'favicon.png'));

    // Generate Apple Touch Icon (180x180)
    await sharp(inputPath)
      .resize(sizes.apple, sizes.apple)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Generate favicon 32x32
    await sharp(inputPath)
      .resize(sizes.favicon32, sizes.favicon32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    // Generate favicon 16x16
    await sharp(inputPath)
      .resize(sizes.favicon16, sizes.favicon16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 