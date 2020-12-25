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
        if (cmd != 'git init') {
            wrongInputCommand();
        } else {
            rl.close();
        }
    });

    rl.on('close', function () {
        execSync('git init', { stdio: 'ignore' });
        console.log(chalk.green('Local Repository Initialized'));
        process.exit(0);
    });
}

export { gitInit };
