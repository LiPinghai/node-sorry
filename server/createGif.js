const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const { createFolder, countSubstring } = require('./util.js')
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class Gif {
  constructor(templateName = '', subtitle = []) {
    this.hash = md5(`${templateName}:${subtitle}`)
    const subtitleHashPath = this.createSubtitle(templateName, subtitle)
    this.createGif(templateName, subtitleHashPath);
  }

  createSubtitle(templateName, subtitle) {
    const { hash } = this
    const subtitleHashPath = `../output/${templateName}/${hash}.ass`
    if (!fs.existsSync(hash)) {
      const subtitleTemplatePath = `../template/${templateName}/template.ass`
      let subtitleText = fs.readFileSync(subtitleTemplatePath, 'utf8');
      const dialogueLength = countSubstring(subtitleText, 'Dialogue')
      for (let i = 0; i < dialogueLength; i++) {
        subtitleText = subtitleText.replace(`<%= sentences[${i}] %>`, subtitle[i] || '')
      }
      createFolder(subtitleHashPath);
      fs.writeFileSync(subtitleHashPath, subtitleText)
    }
    return subtitleHashPath
  }

  createGif(templateName, subtitleHashPath) {
    const { hash } = this
    const gifPath = `../output/${templateName}/${hash}.gif`
    createFolder(gifPath);

    ffmpeg(`../template/${templateName}/template.mp4`)
      .videoFilters({
        filter: 'subtitles',
        options: subtitleHashPath
      }, )
      .save(gifPath)
  }
}

module.exports = Gif