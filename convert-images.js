const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const convertImages = async () => {
  const imagesDir = path.resolve(__dirname, "public/images");
  const files = fs.readdirSync(imagesDir);

  files.forEach((file) => {
    const inputFile = path.resolve(imagesDir, file);
    const outputFile = path.resolve(imagesDir, `${path.parse(file).name}.webp`);

    sharp(inputFile)
      .toFormat("webp")
      .toFile(outputFile, (err, info) => {
        if (err) throw err;
        console.log(`Converted ${file} to WebP`);
      });
  });
};

convertImages();
