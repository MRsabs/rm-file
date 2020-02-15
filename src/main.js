const ora = require("ora");
const cfonts = require('cfonts');
const glob = require("glob");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const log = console.log;
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});

// DEBUG only
__dirname = path.join(__dirname, '../testing/')





function findFiles(file = "srt") {
	return new Promise((resolve, reject) => {
		glob(`**/*.${file}`, { cwd: __dirname }, (err, files) => {
			!err ? resolve(files) : reject(err);
		});
	});
}

function userInput() {
	return new Promise((resolve, reject) => {
		readline.question("what type of files you want to delete ? (for example mp4)\n\n", type =>
			resolve(type)
		);
	});
}

function removeFile(targetPath) {
	return new Promise(async (resolve, reject) => {
		try {
			await fs.remove(path.join(__dirname, targetPath));
			resolve(true);
		} catch (error) {
			reject(false);
		}
	});
}

// debug
function timeOut(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, delay);
	});
}

(async function main() {
	cfonts.say('Hi There!', {
		font: 'block',              // define the font face
		align: 'center',              // define text alignment
		colors: ['system'],         // define all colors
		background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
		letterSpacing: 1,           // define letter spacing
		lineHeight: 1,              // define the line height
		space: true,                // define if the output text should have empty lines on top and on the bottom
		maxLength: '0',             // define how many character can be on one line
		gradient: ['red',"#f80"],            // define your two gradient colors
		independentGradient: false, // define if you want to recalculate the gradient for each new line
	});

	log(`You're in\n`, chalk.yellow(__dirname));

	const file = await userInput();

	log(chalk.green(`\n Finding ${chalk.bgYellowBright(file)} files in `), chalk.yellow(`[ ${__dirname} ]`), " and all sub-directories");

	let spinner = ora({
		text: "loading...",
		spinner: "dots12"
	}).start();

	const files = await findFiles(file);

	// debug
	await timeOut(1000);

	spinner.succeed(`Found ${files.length} files`);

	spinner.start("deleting files...");

	await timeOut(1000);

	for (let i = 0; i < files.length; i++) {
		await removeFile(files[i]);
		spinner.text = `${i} files deleted`;
	}
	spinner.succeed(`done deleting ${files.length} files`);
})();
