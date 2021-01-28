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
    console.log(progress);
    fs.readdir(currentDir, async (err, files) => {
        console.log(files);
        if (err) {
            console.log(chalk.red('OOPS! Something went Wrong'));
            console.log(err.message);
            process.exit();
        }

        // If there are some extra files
        if (files.length > 1 && !progress.init) {
            console.log(chalk.yellow('OOPS! Please use an empty Folder'));
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
                console.log('Git Commit');
                definition.gitCommit();
                await commands.gitCommit();
            }
        }
    });
};
