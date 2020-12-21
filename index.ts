const chalk = require('chalk');

async function init() {
    console.clear();
    console.log();
    console.log(chalk.bgYellowBright.black('Gitli'), 'by Arsalan (khattakdev)');
}

init();
require('./package/init')();
