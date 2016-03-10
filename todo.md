npm init
npm install --save-dev normalize.css
npm install --save-dev semantic-ui-css
npm install --save-dev postcss-cli
npm install --save-dev postcss-import
npm install --save-dev autoprefixer

./node_modules/.bin/postcss --use postcss-import autoprefixer -o css/global.css css/main.css

> Add container using semantic
> Add Input/Button using semantic
> Add List using semantic