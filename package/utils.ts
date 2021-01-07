import chalk = require('chalk');

function wrongInputCommand(errMessage: string) {
    console.log();
    console.log(chalk.red(errMessage || 'OOPS! You entered wrong command'));
    console.log();
}
function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export { wrongInputCommand, sleep };
