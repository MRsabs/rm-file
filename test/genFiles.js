const fs = require('fs-extra')
const path = require("path");

(function generateFiles() {
	const foldersNum = 2000
	const filesNum = 100

	console.log(`Generating ${foldersNum * filesNum} files in ${foldersNum} folders`)
	const targetPath = path.join(__dirname, "./random/");



	if (fs.existsSync(targetPath)) {
		fs.removeSync(targetPath)
		fs.mkdirSync(targetPath) 
	} else {
		fs.mkdirSync(targetPath) 
	}


	for (let i = 0; i < foldersNum; i++) {
		if (fs.existsSync(path.join(targetPath, `folder-${i}`))) {
			continue;
		} else {
			fs.mkdirSync(path.join(targetPath, `folder-${i}`))
		}
	}
	for (let i = 0; i < foldersNum; i++) {
		for (let j = 0; j < filesNum; j++) {
			const filePath = path.join(targetPath, `/folder-${i}`, `file-${j}.srt`)
			fs.closeSync(fs.openSync(filePath, 'w'));
		}

	}
	console.log('Done !')
})()
