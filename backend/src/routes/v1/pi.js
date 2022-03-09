const express = require("express");
const router = express.Router();
const fs = require('fs');
const { addStr, getLatestPi, increasePiPrecision } = require('../../../src/utils/util');
const { ERROR_MESSAGES, FILE_NOT_FOUND, FILE_PATH } = require("../../utils/constants");

router.get("/getMorePrecisePi", async (req, res) => {
    try {
        // get decimals from file
        const decimals = await new Promise((resolve, reject) => {
            fs.readFile(FILE_PATH.DECIMALS, function (err, buf) {
                if (err) {
                    if (err.code === FILE_NOT_FOUND) {
                        fs.writeFile(FILE_PATH.DECIMALS, "1", (err) => {
                            if (err) console.log(err);
                        });
                        return resolve(1);
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    resolve(Number(buf.toString()));
                }
            });
        });

        let latestPi = increasePiPrecision(decimals);

        await new Promise((resolve, reject) => {
            fs.writeFile(FILE_PATH.DECIMALS, String(decimals + 1), (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await new Promise((resolve, reject) => {
            fs.writeFile(FILE_PATH.LATEST_PI, latestPi, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        return res.json({
            latestPi: latestPi.length === 1 ? latestPi : addStr(latestPi, 1, ".")
        });
    }
    catch (err) {
        console.log(err);
        let message = '';
        if (err.message) {
            message = err.message;
        }
        else {
            message = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
        }
        return res.status(500).json({
            message
        });
    }
});

router.get("/getLatestPiValue", async (req, res) => {
    try {
        // obtained latest pi value from text file
        const latestPiString = await getLatestPi('string');
        return res.json({
            latestPi: latestPiString,
        });
    }
    catch (err) {
        console.log(err);
        let message = '';
        if (err.message) {
            message = err.message;
        }
        else {
            message = ERROR_MESSAGES.SOMETHING_WENT_WRONG;
        }
        return res.status(500).json({
            message
        });
    }
});


module.exports = router;
