const fs = require('fs');
const sass = require('node-sass');

sass.render({
  file: './src/index.scss',
}, (error, result) => {
  if (error) {
    console.error(error);
    return;
  }

  fs.writeFile('./dist/sheet.css', result.css, (writeError) => {
    if (writeError) {
      console.error(writeError);
    }
  });

  fs.copyFile('./src/sheet.html', './dist/sheet.html', (copyError) => {
    if (copyError) {
      console.error(copyError);
    }
  })
});
