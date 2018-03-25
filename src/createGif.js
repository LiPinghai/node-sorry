const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
const path = require('path')

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

var createFolder = function(to) { //文件写入
  var sep = path.sep
  var folders = path.dirname(to).split(sep);
  var p = '';
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
};

class Gif {
  constructor(templateName = '', subtitles = []) {
    const subtitlesPath = this.createSubtitle(templateName, subtitles)
    this.fileName = this.createGif(templateName, subtitlesPath);
  }

  createSubtitle(templateName, subtitles) {
    let assText = fs.readFileSync(`../template/${templateName}/template.ass`, 'utf8');
    for (let i = 0; i < subtitles.length; i++) {
      assText = assText.replace(`<%= sentences[${i}] %>`, String(subtitles[i]))
    }
    const subtitlesPath = `../cache/${templateName}/subtitles.ass`
    createFolder(subtitlesPath);
    fs.writeFileSync(subtitlesPath, assText)
    return subtitlesPath
  }

  createGif(templateName, subtitlesPath) {

    ffmpeg(`../template/${templateName}/template.mp4`)
      .videoFilters({
        filter: 'subtitles',
        options: subtitlesPath
      }, )
      .save(`../output/${templateName}/${templateName}.gif`)
  }
}

new Gif('sorry', [1, 2, 3, 4, 5, 6, 7, 8, 9])
module.exports = Gif

const customDialogue = ['1', '2', '3', '4', '5']