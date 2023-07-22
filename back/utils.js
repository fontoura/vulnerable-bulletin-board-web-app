
const { getLogger } = require('../logger');

const logger = getLogger(module.id);

function authenticatedMiddleware(req, res, next) {
    logger.debug(`The '${req.url}' API call requires authentication.`);

    /** @type {import('express-session').Session} */
    const session = req.session || {};

    const { userId, username } = session;
    const loggedIn = (userId != null);

    if (!loggedIn) {
        logger.warn(`The user is not logged in. Redirecting...`);
        res.status(401).json({ status: 'NOT_AUTHORIZED' });
        return;
    }

    logger.debug(`The user is logged in as '${username}'. Proceeding to handle API call.`);
    next();
}

module.exports.authenticatedMiddleware = authenticatedMiddleware;