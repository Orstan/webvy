const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Шляхи до зображень
const imagesToConvert = [
  { input: './public/img/logo.png', output: './public/img/logo.webp' },
  { input: './public/apple-icon.png', output: './public/apple-icon.webp' },
  { input: './public/img/preview.jpg', output: './public/img/preview.webp' },
  { input: './public/img/portfolio/56.jpg', output: './public/img/portfolio/56.webp' },
  { input: './public/img/portfolio/dolyna.jpg', output: './public/img/portfolio/dolyna.webp' },
  { input: './public/img/portfolio/mcd.jpg', output: './public/img/portfolio/mcd.webp' }
];

// Функція для конвертації зображення
async function convertImage(inputPath, outputPath) {
  try {
    // Перевіряємо, чи існує вхідний файл
    if (!fs.existsSync(inputPath)) {
      console.error(`Файл не знайдено: ${inputPath}`);
      return;
    }

    // Створюємо директорію для вихідного файлу, якщо вона не існує
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Конвертуємо зображення
    await sharp(inputPath)
      .webp({ quality: 80 }) // Якість 80%
      .toFile(outputPath);
    
    console.log(`Успішно конвертовано: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Помилка при конвертації ${inputPath}:`, error);
  }
}

// Запускаємо конвертацію всіх зображень
async function convertAllImages() {
  for (const image of imagesToConvert) {
    await convertImage(image.input, image.output);
  }
  console.log('Конвертація завершена!');
}

convertAllImages();
