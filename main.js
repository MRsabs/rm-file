var fs = require("fs");
var path = require("path");

function rmFile(source) {
  if (fs.lstatSync(source).isDirectory()) {
    var subDir = fs.readdirSync(source);
    subDir.forEach((dir) => rmFile(path.join(source, dir)));
  } else {
    var dots = source.split(".");
    var extetion = dots[dots.length - 1];
    targets.forEach((file) => {
      if (extetion === file) {
        fs.unlinkSync(source);
      }
    });
  }
}

var targets = process.argv.slice(2);
// var testDir = path.join(__dirname, "./test/random");

rmFile(__dirname);
