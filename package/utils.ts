import chalk = require('chalk');
import fs = require('fs');
import path = require('path');
import { rl as readline } from './commands';
import { promisify } from 'util';

const progressFile = path.resolve(process.cwd(), './.progress.json');

function wrongInputCommand(errMessage: string) {
    console.log();
    console.log(chalk.red(errMessage || 'OOPS! You entered wrong command'));
    console.log();
}
function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function checkForProgressFile() {
    const progress = { gitInit: false, gitFlow: false, gitStage: false };
    if (!fs.existsSync(progressFile)) {
        fs.writeFileSync(progressFile, JSON.stringify(progress));
    }
}

function getProgress() {
    return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

function updateProgress(progress: { [prop: string]: boolean }) {
    const currentProgress = getProgress();
    const updatedProgress = { ...currentProgress, ...progress };

    fs.writeFileSync(progressFile, JSON.stringify(updatedProgress));
}

async function takeUserInput(question: string) {
    readline.resume();
    await promisify(readline.question)(question);
    readline.pause();
}
export {
    progressFile,
    wrongInputCommand,
    sleep,
    checkForProgressFile,
    getProgress,
    updateProgress,
    takeUserInput
};
