import ora from "ora";
import { say } from 'cfonts';
import glob from "glob";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
const log = console.log;
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});

// DEBUG only
// __dirname = path.join(__dirname, '../test/')

// DEBUG only
function timeOut(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, delay);
	});
}

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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(async function main() {
	say('Hi There!', {
		font: 'block',              
		align: 'center',                          
		gradient: ['red',"#f80"],            

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

	spinner.succeed(`Found ${numberWithCommas(files.length)} files`);

	spinner.start("deleting files...");

	await timeOut(1000);

	for (let i = 0; i < files.length; i++) {
		await removeFile(files[i]);
		spinner.text = `${i} files deleted`;
	}
	spinner.succeed(`done deleting ${numberWithCommas(files.length)} files`);
})();
