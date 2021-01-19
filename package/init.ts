import fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const process = require('process');
const definition = require('./definition');
const commands = require('./commands');
const { checkForProgressFile, getProgress } = require('./utils');

module.exports = function folderChecker() {
    const currentDir: string = path.resolve(process.cwd());

    checkForProgressFile();
    const progress = getProgress();
    console.log(progress);
    fs.readdir(currentDir, async (err, files) => {
        console.log(files);
        if (err) {
            console.log(chalk.red('OOPS! Something went Wrong'));
            console.log(err.message);
            process.exit();
        }

        // If there are some extra files
        if (files.length > 1 && !progress.gitInit) {
            console.log(chalk.yellow('OOPS! Please use an empty Folder'));
            process.exit(0);
        } else {
            if (!progress.gitInit) {
                definition.gitInit();
                await commands.gitInit();
            }
            if (!progress.gitFlow) {
                await definition.gitFlow();
            }
            if(!progress.gitStage) {
                definition.gitStage();
            }
        }
    });
};
