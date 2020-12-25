const chalk = require('chalk');
const Table = require('cli-table');

function gitInit() {
    console.log(chalk.bgGreen.black('GIT:'));
    console.log(
        'Git is a distributed version-control system for tracking changes in any set of files, originally designed for coordinating work among programmers cooperating on source code during software development.\n'
    );
    //TODO: Try using setTimeout to show messages in intervals.
    console.log(
        'The first thing to do is to create a git reposity. Since you are already in an empty folder, we will now create convert this to a Git local repository.'
    );

    console.log(
        'To Create a local repository, type: ',
        chalk.bgWhite.black('git init')
    );
}

function gitFlow() {
    console.log(chalk.bgGreen.black('GIT FLOW:'));
    console.log(
        `This folder is a local Git Repository. Whatever changes you make in this folder, Git can keep track of them. But to keep track of those changes, you need to commit the files. Let's first understand how the Git Flow works`
    );
    console.log(`Here's a simple Chart of the different Stages`);
    const gitFlowTable = new Table({
        head: [
            'Working Directory',
            'Stagging Area',
            'Local Repo',
            'Remote Repo'
        ]
    });
    gitFlowTable.push(['--', 'git add', 'git commit', 'git push']);
    console.log(gitFlowTable.toString());
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
}

export { gitInit, gitFlow };
