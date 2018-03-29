const ejs = require('ejs')
const fs = require('fs')
const { createFolder, travel } = require('./common/util.js')

const config = require('./config.js')
const {templates} = config

// 渲染首页,404,contribute
ejs.renderFile('./view/index.ejs', config, {}, function(err, str){
  createFolder('./dist/index.html')
  fs.writeFileSync('./dist/index.html',str)
});
ejs.renderFile('./view/404.ejs', config, {}, function(err, str){
  createFolder('./dist/404.html')
  fs.writeFileSync('./dist/404.html',str)
});

ejs.renderFile('./view/contribute.ejs', config, {}, function(err, str){
  createFolder('./dist/contribute.html')
  fs.writeFileSync('./dist/contribute.html',str)
});


// 渲染gif制作页
templates.forEach((template, index)=>{
  const htmlPath = `./dist/gif/${template.name}.html`
  createFolder(htmlPath)
  const data = Object.assign({}, config, {template}, {index} )
  ejs.renderFile('./view/gif.ejs', data, {}, function(err, str){
    fs.writeFileSync(htmlPath, str)
  });
})

// 复制其他资源和模板
travel('./view', pathname => {
  if(pathname.indexOf('.ejs') < 0){
    const distPath = `./dist/${pathname.split('view')[1]}`
    createFolder(distPath)
    fs.copyFileSync(pathname, distPath,)
  }
})

travel('./template', pathname => {
  const distPath = `./dist/${pathname}`
  createFolder(distPath)
  fs.copyFileSync(pathname, distPath,)
})

