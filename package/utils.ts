import chalk = require('chalk');
import fs = require('fs');
import path = require('path');
import { rl as readline } from './commands';
import { promisify } from 'util';

const progressFile = path.resolve(process.cwd(), './.progress.json');
const progress = {
    init: false,
    flow: false,
    stageFile: false,
    stage: false,
    commit: false,
    remoteRepo: false,
    pushToRemote: false,
    pullFromRemote: false
};

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

async function waitWhileFileisModified(indexPath: string) {
    let indexFileContentLength: number;

    do {
        await takeUserInput(`Once done, Press enter ↵ to continue... \n`);

        const indexFileContent = fs.readFileSync(indexPath, 'utf-8');
        indexFileContentLength = indexFileContent.trim().length;
    } while (indexFileContentLength <= 0);
}
export {
    progressFile,
    wrongInputCommand,
    sleep,
    checkForProgressFile,
    getProgress,
    updateProgress,
    takeUserInput,
    waitWhileFileisModified
};
