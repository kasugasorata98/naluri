const express = require("express");
const router = express.Router();
const { radiusOfSun, ERROR_MESSAGES } = require("../../utils/constants");
const { addStr, calculateCircumference, getLatestPi } = require("../../utils/util");

router.get("/getCircumferenceOfSun", async (req, res) => {
    try {
        // obtained latest pi value from text file
        const latestPi = await getLatestPi();
        // perform 2 * pi * r formula
        const circumference = calculateCircumference(latestPi, radiusOfSun);
        return res.json({
            circumferenceOfTheSun: circumference,
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
