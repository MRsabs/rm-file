var fs = require("fs");
var path = require("path");

var foldersNum = 100;
var filesNum = 10;
var extension = ['srt', 'mp4']

console.log(`Generating ${numberWithCommas(foldersNum * filesNum)} files in ${numberWithCommas(foldersNum)} folders`);

var targetPath = path.join(__dirname, "./random");

fs.mkdirSync(targetPath);

for (var i = 0; i < foldersNum; i++) {
    var newDir = path.join(targetPath, `folder-${i}`);
   	 	fs.mkdirSync(newDir);
			for (var j = 0; j < filesNum; j++) {
				var newFile = path.join(newDir, `file-${j}.${extension[Math.floor(Math.random() * 2)]}`);
				fs.closeSync(fs.openSync(newFile, "w"));
			}
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}