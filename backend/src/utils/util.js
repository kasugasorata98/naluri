const fs = require('fs');
const { FILE_PATH, FILE_NOT_FOUND } = require('./constants');

function addStr(str, index, stringToAdd) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

//Unbounded Spigot Algorithms for the Digits of Pi (2004)
function* generateDigitsOfPi() {
    let q = 1n;
    let r = 180n;
    let t = 60n;
    let i = 2n;
    while (true) {
        let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
        yield Number(digit);
        let u = i * 3n;
        u = (u + 1n) * 3n * (u + 2n);
        r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
        q *= 10n * i * (i++ * 2n - 1n);
        t *= u;
    }
}

function increasePiPrecision(decimals) {
    // create a generator function
    let iteration = generateDigitsOfPi();
    let latestPi = "";
    // append characters of pi
    for (let i = 0; i <= decimals; i++) latestPi += iteration.next().value;
    return latestPi;
}

function calculateCircumference(pi, radius) {
    return 2 * Number(pi) * radius;
}

function getLatestPi(type = 'number') {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_PATH.LATEST_PI, function (err, buf) {
            if (err) {
                if (err.code === FILE_NOT_FOUND) {
                    fs.writeFile(FILE_PATH.LATEST_PI, "3", (err) => {
                        if (err) console.log(err);
                    });
                    return resolve(3);
                }
                else {
                    reject(err);
                }
            }
            else {
                let string = buf.toString();
                if (type === 'number') {
                    resolve(Number(string.length === 1 ? string : addStr(string, 1, "."))); // this is to avoid the number becoming infinity
                }
                else {
                    resolve(string.length === 1 ? string : addStr(string, 1, "."));
                }
            }
        });
    });
}

module.exports = {
    addStr,
    increasePiPrecision,
    getLatestPi,
    calculateCircumference,
    generateDigitsOfPi
};