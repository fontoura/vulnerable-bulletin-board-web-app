const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.errors({ stack: true, cause: true }),
        winston.format.simple(),
        winston.format.colorize()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
        })
    ]
});

/**
 * @param {string} name
 * @returns {import('winston').Logger}
 */
function getLogger(name) {
    return logger.child({ module: name });
};

module.exports.getLogger = getLogger;
