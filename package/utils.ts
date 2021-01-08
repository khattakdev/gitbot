import chalk = require('chalk');
import fs = require('fs');
import util = require('util');
const path = require('path');
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
// Create a new Object with up to date values
// Update the progress.json
export {
    wrongInputCommand,
    sleep,
    checkForProgressFile,
    getProgress,
    updateProgress
};
