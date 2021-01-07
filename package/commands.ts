import { execSync } from 'child_process';

const readline = require('readline');
const chalk = require('chalk');
const { promisify } = require('util');
const { wrongInputCommand } = require('./utils');
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
        rl.close();
    } else {
        wrongInputCommand();
        await gitInit();
    }
}

// async function gitInits() {
//     await rl.question('', async (cmd: string) => {
//         if (cmd == 'git init') {
//             execSync('git init', { stdio: 'ignore' });
//             console.log(chalk.green('Local Repository Initialized'));
//             rl.close();
//         } else {
//             wrongInputCommand();
//             gitInit();
//         }
//     });

//     await rl.on('close', function () {
//         process.exit(0);
//     });

//     console.log('Hello World!!!');
// }

export { gitInit };
