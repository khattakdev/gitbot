import chalk from 'chalk';
import { promisify } from 'util';
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
    // Set Username
    const username = await promisify(readline.question)(
        `To set username, type: ${chalk.bgWhite.black(
            `git config user.name "FIRST_NAME LAST_NAME"`
        )}\n`
    );
    if (username.includes('git config user.name')) {
        await utils.takeInput(username, 'Username set successfully');
    } else {
        utils.wrongInputCommand();
        await gitConfig();
    }
    //TODO: Verify name was set correctly
    // Set Email
    const email = await promisify(readline.question)(
        `To set email, type: ${chalk.bgWhite.black(
            `git config user.email "MY_NAME@example.com"`
        )}\n`
    );
    if (email.includes('git config user.email')) {
        await utils.takeInput(email, 'Email set successfully', {
            config: true
        }); //TODO: Change config to true after verficiation of name and username
    } else {
        utils.wrongInputCommand();
        await gitConfig();
    }

    //TODO: Verify email was set correctly
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

// 122
