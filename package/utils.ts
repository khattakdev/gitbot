import chalk = require('chalk');

function wrongInputCommand(errMessage: string) {
    console.log();
    console.log(chalk.red(errMessage || 'OOPS! You entered wrong command'));
    console.log();
}

export { wrongInputCommand };
