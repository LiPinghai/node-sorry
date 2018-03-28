const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
<<<<<<< HEAD:server/createGif.js
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const { createFolder, countSubstring } = require('../common/util.js')
=======
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const { createFolder, countSubstring } = require('./util.js')
>>>>>>> 更换view:server/createGif.js
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class Gif {
  constructor(templateName = '', subtitle = []) {
    this.hash = md5(`${templateName}:${subtitle}`)
    const subtitleHashPath = this.createSubtitle(templateName, subtitle)
    this.createGif(templateName, subtitleHashPath);
  }

  createSubtitle(templateName, subtitle) {
    const { hash } = this
<<<<<<< HEAD:server/createGif.js
    const subtitleHashPath = `../cache/${templateName}/${hash}.ass`
    if (!fs.existsSync(subtitleHashPath)) {
      const subtitleTemplatePath = path.join(__dirname, `../template/${templateName}/template.ass`)
      let subtitleText = fs.readFileSync(subtitleTemplatePath, 'utf8')
=======
    const subtitleHashPath = `../output/${templateName}/${hash}.ass`
    if (!fs.existsSync(hash)) {
      const subtitleTemplatePath = `../template/${templateName}/template.ass`
      let subtitleText = fs.readFileSync(subtitleTemplatePath, 'utf8');
>>>>>>> 更换view:server/createGif.js
      const dialogueLength = countSubstring(subtitleText, 'Dialogue')
      for (let i = 0; i < dialogueLength; i++) {
        subtitleText = subtitleText.replace(`<%= sentences[${i}] %>`, subtitle[i] || '')
      }
<<<<<<< HEAD:server/createGif.js
      createFolder(path.join(__dirname,subtitleHashPath));
      fs.writeFileSync(path.join(__dirname,subtitleHashPath), subtitleText)
=======
      createFolder(subtitleHashPath);
      fs.writeFileSync(subtitleHashPath, subtitleText)
>>>>>>> 更换view:server/createGif.js
    }
    return subtitleHashPath
  }

  createGif(templateName, subtitleHashPath) {
    const { hash } = this
<<<<<<< HEAD:server/createGif.js
    const gifPath = path.join(__dirname, `../cache/${templateName}/${hash}.gif`)
    createFolder(gifPath);
    subtitleHashPath = subtitleHashPath.slice(1)

    // 此处subtitleHashPath写绝对地址会报错，相对地址又是从根目录算起，奇怪
    ffmpeg(path.join(__dirname, `../template/${templateName}/template.mp4`))
    .inputFPS(10)  
    .videoFilters({
        filter: 'subtitles',
        options: subtitleHashPath
      }, )
      .fps(8)
      .save(gifPath)
      imagemin([gifPath], `../cache/${templateName}/`, {use: [imageminGifsicle({
        optimizationLevel: 3,
        colors: 64
      })]})
    }
=======
    const gifPath = `../output/${templateName}/${hash}.gif`
    createFolder(gifPath);

    ffmpeg(`../template/${templateName}/template.mp4`)
      .videoFilters({
        filter: 'subtitles',
        options: subtitleHashPath
      }, )
      .save(gifPath)
  }
>>>>>>> 更换view:server/createGif.js
}

module.exports = Gif