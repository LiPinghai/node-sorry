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

// 同步遍历
const travel = (dir, callback) => {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
 
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

module.exports = { createFolder, countSubstring, travel}