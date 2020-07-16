require('node-jsx').install({extension: '.jsx'});

const babel = require('@babel/core');
const babelTransformRoll20 = require('babel-transform-roll20');
const fs = require('fs').promises;

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const layout = require('../src/layout/index.jsx');

babel.transformFileAsync('./src/workers/index.js', {
  babelrc: false,
  comments: false,
  plugins: [babelTransformRoll20],
})
  .then(async (workerCode) => {
    let html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(layout)
    );

    html = html + `
<script type="text/worker">
${workerCode.code}
</script>
`;

    return fs.writeFile('./dist/sheet.html', html, 'utf-8');
  })
  .catch((err) => {
    console.error(err);
  });
