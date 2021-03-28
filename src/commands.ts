import chalk from 'chalk';
import { promisify } from 'util';
import { execSync } from 'child_process';
import * as utils from './utils';
import { readline } from './utils';

readline.question[promisify.custom] = (question: string) => {
    return new Promise((resolve) => {
        readline.question(question, resolve);
    });
};

export async function gitInit() {
    const answer = await promisify(readline.question)(
        `To Create a local repository, type: ${chalk.bgWhite.black(
            'git init'
        )}\n`
    );
    if (answer == 'git init') {
        await utils.takeInput(answer, 'Local Repository Initialized', {
            init: true
        });
    } else {
        utils.wrongInputCommand();
        await gitInit();
    }
}

export async function gitConfig() {
    console.log(chalk.bgGreen.black('GIT Config:'));
    const username = await promisify(readline.question)(
        `To set username, type: ${chalk.bgWhite.black(
            `git config user.name --global "FIRST_NAME LAST_NAME"`
        )}\n`
    );

    await utils.takeInput(username);
    try {
        const getUsername = execSync('git config --local --get user.name');
        const userNameToUTF = Buffer.from(getUsername).toString();
        console.log(chalk.green('Username set successfully'));
    } catch (error) {
        console.log(error.message);
        utils.wrongInputCommand();
        await gitConfig();
    }

    const email = await promisify(readline.question)(
        `To set email, type: ${chalk.bgWhite.black(
            `git config user.email --global "MY_NAME@example.com"`
        )}\n`
    );
    await utils.takeInput(email);
    try {
        const getEmail = execSync('git config --local --get user.name');
        const emailToUTF = Buffer.from(getEmail).toString();
        console.log(chalk.green('Email set successfully'));
        utils.updateProgress({ config: true });
    } catch (error) {
        console.log(error.message);
        utils.wrongInputCommand();
        await gitConfig();
    }
}

export async function gitStage() {
    console.clear();
    console.log(chalk.bgGreen.black('GIT Stage:'));
    const answer = await promisify(readline.question)(
        `To move file(s), type: ${chalk.bgWhite.black('git add index.html')}\n`
    );
    if (answer == 'git add index.html') {
        await utils.takeInput(answer, 'File moved to stagging area', {
            stage: true
        });
    } else {
        utils.wrongInputCommand();
        await gitStage();
    }
}
export async function gitCommit() {
    const answer = await promisify(readline.question)(
        `To move file(s), type: ${chalk.bgWhite.black(
            'git commit -m "first commit"'
        )}\n`
    );
    if (answer == `git commit -m "first commit"`) {
        await utils.takeInput(answer, 'File moved to local repo', {
            stage: true
        });
    } else {
        utils.wrongInputCommand();
        await gitCommit();
    }
}

export { readline };
