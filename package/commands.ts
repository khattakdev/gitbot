import { execSync } from 'child_process';

const readline = require('readline');
const chalk = require('chalk');
const { wrongInputCommand } = require('./utils');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function gitInit() {
    rl.question('', (cmd: string) => {
        if (cmd == 'git init') {
            execSync('git init', { stdio: 'ignore' });
            console.log(chalk.green('Local Repository Initialized'));
            rl.close();
        } else {
            wrongInputCommand();
            gitInit();
        }
    });

    rl.on('close', function () {
        process.exit(0);
    });
}

export { gitInit };
