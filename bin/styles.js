const fs = require('fs')
const sass = require('node-sass')

sass.render(
  {
    file: './src/styles/index.scss',
  },
  (error, result) => {
    if (error) {
      console.error(error)
      return
    }

    fs.writeFile('./dist/sheet.css', result.css, (writeError) => {
      if (writeError) {
        console.error(writeError)
      }
    })
  }
)
