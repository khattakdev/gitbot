import fs = require('fs');
import path = require('path');
import process = require('process');
const { argv } = process;
getli();

function getli() {
    const currentDir = path.resolve(__dirname, argv[2] || '');
    fs.readdir(currentDir, (err, files) => {
        if (files.length > 0) {
            console.log('Please use an empty Folder');
            process.exit(0);
        }
    });
}
