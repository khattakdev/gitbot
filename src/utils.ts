import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { execSync } from 'child_process';
import rl from 'readline';
const readline: any = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const progressFile = path.resolve(process.cwd(), './.progress.json');
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

export function wrongInputCommand(errMessage?: string) {
    console.log();
    console.log(chalk.red(errMessage || 'OOPS! You entered wrong command'));
    console.log();
}
export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function checkForProgressFile() {
    if (!fs.existsSync(progressFile)) {
        fs.writeFileSync(progressFile, JSON.stringify(progress));
    }
}

export function getProgress() {
    return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

export function updateProgress(progress: { [prop: string]: boolean }) {
    const currentProgress = getProgress();
    const updatedProgress = { ...currentProgress, ...progress };

    fs.writeFileSync(progressFile, JSON.stringify(updatedProgress));
}

export async function waitForResponse(question: string) {
    readline.resume();
    await promisify(readline.question)(question);
    readline.pause();
}

export async function waitWhileFileisModified(indexPath: string) {
    let indexFileContentLength: number;

    do {
        await waitForResponse(`Once done, Press enter ↵ to continue... \n`);

        const indexFileContent = fs.readFileSync(indexPath, 'utf-8');
        indexFileContentLength = indexFileContent.trim().length;
    } while (indexFileContentLength <= 0);
}

export async function takeInput(
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

export { readline };
