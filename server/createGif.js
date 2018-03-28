const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const { createFolder, countSubstring } = require('../common/util.js')
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class Gif {
  constructor(templateName = '', subtitle = []) {
    this.hash = md5(`${templateName}:${subtitle}`)
    const subtitleHashPath = this.createSubtitle(templateName, subtitle)
    this.createGif(templateName, subtitleHashPath);
  }

  createSubtitle(templateName, subtitle) {
    const { hash } = this
    const subtitleHashPath = `../cache/${templateName}/${hash}.ass`
    if (!fs.existsSync(subtitleHashPath)) {
      const subtitleTemplatePath = path.join(__dirname, `../template/${templateName}/template.ass`)
      let subtitleText = fs.readFileSync(subtitleTemplatePath, 'utf8')
      const dialogueLength = countSubstring(subtitleText, 'Dialogue')
      for (let i = 0; i < dialogueLength; i++) {
        subtitleText = subtitleText.replace(`<%= sentences[${i}] %>`, subtitle[i] || '')
      }
      createFolder(path.join(__dirname,subtitleHashPath));
      fs.writeFileSync(path.join(__dirname,subtitleHashPath), subtitleText)
    }
    return subtitleHashPath
  }

  createGif(templateName, subtitleHashPath) {
    const { hash } = this
    const gifPath = path.join(__dirname, `../cache/${templateName}/${hash}.gif`)
    createFolder(gifPath);
    subtitleHashPath = subtitleHashPath.slice(1)
    console.log(subtitleHashPath)

    // 此处subtitleHashPath写绝对地址会报错，相对地址又是从根目录算起，奇怪
    ffmpeg(path.join(__dirname, `../template/${templateName}/template.mp4`))
      .videoFilters({
        filter: 'subtitles',
        options: subtitleHashPath
      }, )
      .save(gifPath)
  }
}

module.exports = Gif