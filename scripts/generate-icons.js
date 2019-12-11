const fs = require('fs');
const Jimp = require('jimp');
const circle = require('@jimp/plugin-circle');
const configure = require('@jimp/custom');
const sizeOf = require('image-size');

configure({ plugins: [circle] }, Jimp);

const iconDirs = [
  'ios/newspringchurchapp/Images.xcassets/AppIcon.appiconset/',
  'android/app/src/main/res/mipmap-mdpi/',
  'android/app/src/main/res/mipmap-hdpi/',
  'android/app/src/main/res/mipmap-xhdpi/',
  'android/app/src/main/res/mipmap-xxhdpi/',
  'android/app/src/main/res/mipmap-xxxhdpi/',
];

const [template] = process.argv.slice(2);
if (!template) {
  console.log('Specify image to use: generate-icons.js new-file.png');
  process.exit(1);
}

iconDirs.forEach((dir) => {
  fs.readdir(dir, (e, files) => {
    files.forEach((file) => {
      // define valid file prefixes
      if (!file.match(/^acicon/) && !file.match(/^ic/)) return;
      const path = dir + file;
      sizeOf(path, (e1, { width, height }) => {
        Jimp.read(template, (e2, icon) => {
          if (file.match(/.*round.*/)) {
            icon
              .circle()
              .resize(width, height)
              .write(path);
          } else {
            icon.resize(width, height).write(path);
          }
        });
      });
    });
  });
});
