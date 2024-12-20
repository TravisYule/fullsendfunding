const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, '../src/assets/Logo.png'))
  .resize(256, 256)  // Making it larger, Chrome will scale it down
  .toFile(path.join(__dirname, '../public/favicon.png'))
  .then(info => { console.log('Favicon created successfully:', info); })
  .catch(err => { console.error('Error creating favicon:', err); }); 