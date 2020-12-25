import fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const process = require('process');
const definition = require('./definition');
const commands = require('./commands');

function folderChecker() {
    const currentDir = path.resolve(process.cwd());

    fs.readdir(currentDir, (err, files) => {
        if (err) {
            console.log(chalk.red('OOPS! Something went Wrong'));
            console.log(err.message);
            process.exit();
        }
        if (files.length > 0) {
            console.log(chalk.yellow('OOPS! Please use an empty Folder'));
            process.exit(0);
        } else {
            // console.log(chalk.green(`Good Job, Let's Get Started!`));

            definition.gitInit();
            commands.gitInit();
            definition.gitFlow();
        }
    });
}

module.exports = folderChecker;
