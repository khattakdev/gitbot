#!/usr/bin/env node
import chalk from 'chalk';

(function init() {
    console.clear();
    console.log();
    console.log(chalk.bgYellowBright.black('Gitli'), 'by Arsalan (khattakdev)');
    console.log();
})();

require('./src/init')();
