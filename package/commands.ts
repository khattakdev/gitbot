import { execSync } from 'child_process';

const readline = require('readline');
const chalk = require('chalk');
const { promisify } = require('util');
const utils = require('./utils');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question[promisify.custom] = (question: string) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

async function gitInit() {
    const answer = await promisify(rl.question)(
        `To Create a local repository, type: ${chalk.bgWhite.black(
            'git init'
        )}\n`
    );
    if (answer == 'git init') {
        execSync('git init', { stdio: 'ignore' });
        console.log(chalk.green('Local Repository Initialized'));
        utils.updateProgress({ gitInit: true });
        // Clear the Screen after two seconds
        await utils.sleep(2000);
        console.clear();
        rl.close();
    } else {
        utils.wrongInputCommand();
        await gitInit();
    }
}

export { gitInit };
