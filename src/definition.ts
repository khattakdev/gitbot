const chalk = require('chalk');
const Table = require('cli-table');
import path = require('path');
import fs = require('fs');
import {
    updateProgress,
    waitForResponse,
    waitWhileFileisModified
} from './utils';

function gitInit() {
    console.log(chalk.bgGreen.black('GIT:'));
    console.log(
        'Git is a distributed version-control system for tracking changes in any set of files, originally designed for coordinating work among programmers cooperating on source code during software development.\n'
    );
    //TODO: Try using setTimeout to show messages in intervals.
    console.log(
        'The first thing to do is to create a git reposity. Since you are already in an empty folder, we will now convert this to a Git local repository.'
    );
}

async function gitFlow() {
    console.log('\n\n\n');
    console.log(chalk.bgGreen.black('GIT FLOW:'));
    console.log(
        `This folder is a local Git Repository. Whatever changes you make in this folder, Git can keep track of them. But to keep track of those changes, you need to commit the files. Let's first understand how the Git Flow works`
    );
    console.log(`Here's a simple Chart of the different Stages`);
    const gitFlowTable = new Table({
        head: [
            'Working Directory',
            '--',
            'Stagging Area',
            '--',
            'Local Repo',
            '--',
            'Remote Repo'
        ]
    });

    gitFlowTable.push([
        '--',
        chalk.green('git add'),
        '--',
        chalk.green('git commit'),
        '--',
        chalk.green('git push'),
        '--'
    ]);
    gitFlowTable.push([
        '--',
        chalk.yellow('git reset'),
        '--',
        chalk.yellow('git revert'),
        '--',
        chalk.yellow('git pull'),
        '--'
    ]);
    console.log(gitFlowTable.toString());
    console.log();
    console.log(
        `Initial your file is in the working directory, this stage is like not having any version control at all. In order to keep track of all the changes, it's must to move the file to ${chalk.green(
            `"Local Repo"`
        )}.`
    );
    console.log(
        `You can ${chalk.red(`not`)} directly move the file from ${chalk.green(
            `"Working Directory"`
        )} to ${chalk.green(
            `"Local Repo"`
        )}. The file needs to go through ${chalk.green(
            `"Stagging Area"`
        )} first. The ${chalk.green(
            `"Stagging Area"`
        )} is like a waiting area of public transport, where you have to wait for the transport. Similarly, the ${chalk.green(
            `Stagging Area`
        )} is the stage where you move the file that are going to be part of the next commit.`
    );
    console.log();
    console.log();
    console.log('In this Chart, you see total of 3 rows.');
    console.log('- First row represents the different Stages');
    console.log(
        `- Second row represents commands to move file(s) from one stage to another (${chalk.bold(
            'git add'
        )} is use to move files from ${chalk.bold(
            'working directory'
        )} to ${chalk.bold('stagging Area')})`
    );
    console.log(
        `- Third row represents commands to move ${chalk.bold(
            'back'
        )} file(s) from one stage to another (${chalk.bold(
            'git reset'
        )} is use to move files from ${chalk.bold(
            'stagging Area'
        )} to ${chalk.bold('working directory')})`
    );

    await waitForResponse(`Press enter ↵ to continue... \n`);
    updateProgress({ flow: true });
}

function gitConfig() {
    console.clear();
    console.log(
        `Now before we start moving the files towards local repository, we first need to configure our git locally so it will have details of the commit's author.`
    );
    console.log('We need to set username and email');
}

async function gitStage() {
    const indexPath = path.resolve(process.cwd(), './index.html');
    console.clear();
    console.log(chalk.bgGreen.black('GIT Stage:'));
    console.log(
        `Well done! Let's now try to move some files from ${chalk.bold(
            'working directory'
        )} to ${chalk.bold('stagging area')}`
    );
    console.log(
        `The folder is empty right now, we need to have atleast file to move to stagging area.`
    );
    fs.writeFileSync(indexPath, '');
    console.log(
        `For that purpose, ${chalk.bold(
            'index.html'
        )} has been created for you automatically.`
    );
    console.log(
        `Now, let's make some changes to the file. You can write anything there, but let's have some valid HTML content.`
    );
    console.log(
        `Open the ${chalk.bold('index.html')} and write ${chalk.bold(
            '<h1>Hello World!<h1>'
        )} and save the file.`
    );

    await waitWhileFileisModified(indexPath);
    updateProgress({ stageDefine: true });
    console.log(`Great, it's time to move the file to stagging area.`);
}

async function gitCommit() {
    console.clear();
    console.log(chalk.bgGreen.black('GIT Commit:'));
    console.log(
        `Wuhuu! You're doing great. You were able to move a file from ${chalk.bold(
            'working directory'
        )} to ${chalk.bold(
            'stagging area'
        )}. It's now time to move that same file to ${chalk.bold(
            'local repository'
        )} `
    );
    //TODO: If user deletes index.html, restore it.
}

export { gitInit, gitFlow, gitConfig, gitStage, gitCommit };
