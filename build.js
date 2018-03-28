const ejs = require('ejs')
const fs = require('fs')
const { createFolder, travel } = require('./common/util.js')

const config = require('./config.js')
const {templates} = config

ejs.renderFile('./view/index.ejs', config, {}, function(err, str){
  createFolder('./dist/index.html')
  fs.writeFileSync('./dist/index.html',str)
});

templates.forEach((template, index)=>{
  const htmlPath = `./dist/gif/${template.name}.html`
  createFolder(htmlPath)
  const data = Object.assign({}, config, {template}, {index} )
  ejs.renderFile('./view/gif.ejs', data, {}, function(err, str){
    fs.writeFileSync(htmlPath, str)
  });
})

fs.copyFileSync('./view/404.html', './dist/404.html',)
fs.copyFileSync('./view/main.js', './dist/main.js',)
fs.copyFileSync('./view/cookies.js', './dist/cookies.js',)
fs.copyFileSync('./view/w3.css', './dist/w3.css',)
fs.copyFileSync('./view/robots.txt', './dist/robots.txt',)

travel('./template', pathname=>{
  const distPath = `./dist/${pathname}`
  createFolder(distPath)
  fs.copyFileSync(pathname, distPath,)

})

