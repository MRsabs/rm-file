const fs = require('fs')
const path = require("path");

(function main() {
	const foldersNum = 100;
	const filesNum = 50;
	console.log(`generating ${foldersNum * filesNum} files in ${foldersNum} folders`)
	const targetPath = path.join(__dirname, "../testing/");



	if (!fs.existsSync(targetPath)) fs.mkdirSync(path.join(__dirname, '../testing/'))

	for (let i = 0; i < 100; i++) {
		if (fs.existsSync(path.join(targetPath, `folder-${i}`))) {
			continue;
		} else {
			fs.mkdirSync(path.join(targetPath, `folder-${i}`))
		}
	}
	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 50; j++) {
			const filePath = path.join(targetPath, `/folder-${i}`, `file-${j}.srt`)
			fs.closeSync(fs.openSync(filePath, 'w'));
		}
	}
})()
