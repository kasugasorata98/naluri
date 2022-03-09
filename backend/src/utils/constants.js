const Constants = {
    radiusOfSun: 696340, // in km
    FILE_NOT_FOUND: 'ENOENT',
    FILE_PATH: {
        LATEST_PI: './latestPi.txt',
        DECIMALS: './decimals.txt'
    },
    ERROR_MESSAGES: {
        SOMETHING_WENT_WRONG: "Something went wrong",
    },
    SUCCESS_MESSAGES: {
        PI_OBTAINED: 'Pi obtained successfully',
        CIRCUMFERENCE_OBTAINED: 'Circumference of teh sun obtained successfully'
    },
    HTTP_STATUS_CODES: {
        CONFLICT: 409,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        OK: 200,
        CREATED: 201,
        INTERNAL_SERVER_ERROR: 500,
        FORBIDDEN: 403,
        BAD_REQUEST: 400
    }
};

module.exports = Constants;