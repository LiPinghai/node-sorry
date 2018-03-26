const fs = require('fs')
const path = require('path')
const createFolder = function(to) { //文件写入
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

const countSubstring = (str, substring) => {
  const regex = RegExp(substring, "ig");
  const match = str.match(regex)
  if (match) {
    return match.length
  } else {
    return 0
  }
}

module.exports = { createFolder, countSubstring }