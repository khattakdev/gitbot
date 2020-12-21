const chalk = require('chalk');

function gitInit() {
    console.log(chalk.bgGreen.black('GIT:'));
    console.log(
        'Git is a distributed version-control system for tracking changes in any set of files, originally designed for coordinating work among programmers cooperating on source code during software development.\n'
    );
    //TODO: Try using setTimeout to show messages in intervals.
    console.log(
        'The first thing to do is to create a git reposity. Since you are already in an empty folder, we will now create convert this to a Git local repository.'
    );

    console.log(
        'To Create a local repository, type: ',
        chalk.bgWhite.black('git init')
    );
}

export { gitInit };
