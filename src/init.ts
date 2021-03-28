import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import process from 'process';
import * as definition from './definition';
import * as commands from './commands';
import { checkForProgressFile, getProgress } from './utils';

module.exports = function folderChecker() {
    const currentDir: string = path.resolve(process.cwd());

    checkForProgressFile();
    const progress = getProgress();

    fs.readdir(currentDir, async (err, files) => {
        if (err) {
            console.log(chalk.red('OOPS! Something went Wrong'));
            console.log(err.message);
            process.exit();
        }

        // If there are some extra files
        if (files.length > 1 && !progress.init && files[1] != 'node_modules') {
            console.log(chalk.yellow('OOPS! Please use an empty Folder'));
            console.log(
                chalk.yellow(
                    'Try to remove everyting from the folder, including hidden files/folders'
                )
            );
            // Ask user to clear the folder
            process.exit(0);
        } else {
            if (!progress.init) {
                definition.gitInit();
                await commands.gitInit();
            }
            if (!progress.flow) {
                await definition.gitFlow();
            }
            if (!progress.config) {
                definition.gitConfig();
                await commands.gitConfig();
            }
            if (!progress.stageDefine) {
                await definition.gitStage();
            }
            if (!progress.stage) {
                await commands.gitStage();
            }
            console.log(progress.commit);
            if (!progress.commit) {
                definition.gitCommit();
                await commands.gitCommit();

                console.log(
                    chalk.green('Congratulations!'),
                    "You've mastered the basics"
                );
            }
        }
    });
};
