import { exec } from 'child_process';

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
        exec('git init', (err, msg) => {
            console.log(err);
            console.log(msg);
        });
        console.log(chalk.green('Perfect! Initializing Local Repository...'));
        process.exit(0);
    });
}

export { gitInit };
