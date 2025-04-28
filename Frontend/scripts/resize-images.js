const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '../public/logo.jpg');
const outputDir = path.join(__dirname, '../public');

// Vérifier l'existence des répertoires et fichiers
console.log('Chemin de l\'image source:', inputImage);
console.log('Répertoire de sortie:', outputDir);

if (!fs.existsSync(inputImage)) {
  console.error('ERREUR: L\'image source n\'existe pas:', inputImage);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  console.log('Création du répertoire de sortie...');
  fs.mkdirSync(outputDir, { recursive: true });
}

// Créer les différentes versions
async function resizeImages() {
  try {
    console.log('Début du redimensionnement des images...');

    // Version 512x512
    console.log('Création de logo512.png...');
    await sharp(inputImage)
      .resize(512, 512)
      .toFile(path.join(outputDir, 'logo512.png'))
      .then(() => console.log('logo512.png créé avec succès'));

    // Version 192x192
    console.log('Création de logo192.png...');
    await sharp(inputImage)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'logo192.png'))
      .then(() => console.log('logo192.png créé avec succès'));

    // Version 64x64
    console.log('Création de favicon64.png...');
    await sharp(inputImage)
      .resize(64, 64)
      .toFile(path.join(outputDir, 'favicon64.png'))
      .then(() => console.log('favicon64.png créé avec succès'));

    // Version 32x32
    console.log('Création de favicon32.png...');
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon32.png'))
      .then(() => console.log('favicon32.png créé avec succès'));

    // Version 16x16
    console.log('Création de favicon16.png...');
    await sharp(inputImage)
      .resize(16, 16)
      .toFile(path.join(outputDir, 'favicon16.png'))
      .then(() => console.log('favicon16.png créé avec succès'));

    console.log('Toutes les images ont été redimensionnées avec succès !');
  } catch (error) {
    console.error('Erreur détaillée lors du redimensionnement des images:');
    console.error(error.stack);
    process.exit(1);
  }
}

resizeImages(); 