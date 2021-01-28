import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { execSync } from 'child_process';
const rl = require('readline');
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

const progressFile = path.resolve(process.cwd(), './.progress.json');
const progress = {
    init: false,
    flow: false,
    config: false,
    stageDefine: false,
    stage: false,
    commit: false,
    remoteRepo: false,
    pushToRemote: false,
    pullFromRemote: false
};

function wrongInputCommand(errMessage?: string) {
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

async function waitForResponse(question: string) {
    readline.resume();
    await promisify(readline.question)(question);
    readline.pause();
}

async function waitWhileFileisModified(indexPath: string) {
    let indexFileContentLength: number;

    do {
        await waitForResponse(`Once done, Press enter ↵ to continue... \n`);

        const indexFileContent = fs.readFileSync(indexPath, 'utf-8');
        indexFileContentLength = indexFileContent.trim().length;
    } while (indexFileContentLength <= 0);
}

async function takeInput(
    execCommand: string,
    completionMsg: string,
    progressToUpdate?: { [prop: string]: boolean } | null
) {
    execSync(execCommand, { encoding: 'utf8' });
    console.log(chalk.green(completionMsg));
    if (progressToUpdate) {
        updateProgress(progressToUpdate);
    }
    // Clear the Screen after two seconds
    await sleep(2000);
    console.clear();
    readline.pause();
}

export {
    readline,
    progressFile,
    wrongInputCommand,
    sleep,
    checkForProgressFile,
    getProgress,
    takeInput,
    updateProgress,
    waitForResponse,
    waitWhileFileisModified
};
