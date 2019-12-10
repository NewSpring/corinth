const fs = require('fs');
const Jimp = require('jimp');
const sizeOf = require('image-size');

const iconDirs = ['ios/newspringchurchapp/Images.xcassets/AppIcon.appiconset/'];

const [template] = process.argv.slice(2);
if (!template) {
  console.log('Specify image to use: generate-icons.js new-file.png');
  process.exit(1);
}

iconDirs.forEach((dir) => {
  fs.readdir(dir, (e, files) => {
    if (e) throw e;
    files.forEach((file) => {
      if (!file.match(/^acicon/)) return;
      const path = dir + file;
      sizeOf(path, (e1, { width, height }) => {
        if (e1) throw e1;
        Jimp.read(template, (e2, icon) => {
          if (e2) throw e2;
          icon.resize(width, height).write(path);
        });
      });
    });
  });
});
