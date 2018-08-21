/*
    Require all your helpers classes here , and assign your desired function to global variables
 */
const winston = require('./winston/winston');
const fs = require("fs");
const winstonClass = new winston();
logger = winstonClass.logger; //Or you can use static functions

moveFile = (from, to) => {
    const source = fs.createReadStream(from);
    const dest = fs.createWriteStream(to);

    return new Promise((resolve, reject) => {
        source.on('end', () => {
            fs.unlinkSync(from);
            resolve(true)
        });
        source.on('error', () => {
            fs.unlinkSync(from);
            resolve(false)
        });
        source.pipe(dest);
    });
};


deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};