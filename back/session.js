const { Router } = require('express');

const { getLogger } = require('../logger');

const authController = require('./controllers/auth');
const { authenticatedMiddleware } = require('./utils');

const logger = getLogger(module.id);
const sessionRouter = Router();

sessionRouter.use(function (req, res, next) {
    logger.debug(`Request received by the session router: ${req.method} ${req.url}.`);
    next();
});

sessionRouter.post('/login', function (req, res, next) {
    logger.debug('Received login request!');
    const { username, password } = req.body;
    authController.authenticate({ username, password })
        .then(user => {
            if (user != null) {
                logger.debug('The user has logger in!');
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.save(() => {
                    res.status(200).json({
                        status: 'LOGGED_IN'
                    });
                });
            } else {
                logger.debug('The user has not logged in!');
                res.status(401).json({
                    status: 'WRONG_CREDENTIALS'
                });
            }
        })
        .catch(error => {
            logger.warn(error);
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
        });
});

sessionRouter.post('/signin', function (req, res, next) {
    logger.debug('Received sign-in request!');
    const { username, password } = req.body;
    authController.create({ username, password })
        .then(ok => {
            if (ok) {
                logger.debug('The user has signed in!');
                res.status(200).json({
                    status: 'SIGNED_IN'
                });
            } else {
                logger.debug('The user has not signed in!');
                res.status(400).json({
                    status: 'ILLEGAL_PARAMETERS'
                });
            }
        })
        .catch(error => {
            logger.warn(error);
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
        });
});

sessionRouter.post('/change', function (req, res, next) {
    logger.debug('Received change password request!');
    const { username, newPassword } = req.body;
    authController.change({ username, newPassword })
        .then(ok => {
            if (ok) {
                logger.debug('The password was changed!');
                res.status(200).json({
                    status: 'CHANGED'
                });
            } else {
                logger.debug('The password was not changed!');
                res.status(400).json({
                    status: 'ILLEGAL_PARAMETERS'
                });
            }
        })
        .catch(error => {
            logger.warn(error);
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
        });
});

sessionRouter.post('/logout', authenticatedMiddleware, function (req, res, next) {
    logger.debug('Received logout request!');
    req.session.regenerate(error => {
        if (error) {
            logger.warn(error);
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
        } else {
            logger.debug('The user has logged out!');
            res.status(200).json({
                status: 'LOGGED_OUT'
            });
        }
    });
});

module.exports.sessionRouter = sessionRouter;
