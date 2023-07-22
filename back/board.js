const { Router } = require('express');

const { getLogger } = require('../logger');

const boardController = require('./controllers/board');

const logger = getLogger(module.id);
const boardRouter = Router();

boardRouter.use(function (req, res, next) {
    logger.debug(`Request received by the board router: ${req.method} ${req.url}.`);
    next();
});

boardRouter.post('/create', function (req, res, next) {
    logger.debug('Received create message request!');
    const { userId, title, text } = req.body;
    boardController.createMessage({ userId, title, text })
        .then(done => {
            if (done) {
                logger.debug('The message was created!');
                res.status(200).json({
                    status: 'CREATED'
                });
            } else {
                logger.debug('The message was not created!');
                res.status(500).json({
                    status: 'INTERNAL_SERVER_ERROR'
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

boardRouter.post('/update/:id', function (req, res, next) {
    logger.debug('Received edit message request!');
    const messageId = req.params.id;
    const { title, text } = req.body;
    boardController.editMessage({ messageId, title, text })
        .then(done => {
            if (done) {
                logger.debug('The message was edited!');
                res.status(200).json({
                    status: 'UPDATED'
                });
            } else {
                logger.debug('No such message!');
                res.status(404).json({
                    status: 'NO_SUCH_MESSAGE'
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

boardRouter.post('/delete/:id', function (req, res, next) {
    const messageId = req.params.id;
    boardController.deleteMessage({ messageId })
        .then(done => {
            if (done) {
                logger.debug('The message was deleted!');
                res.status(200).json({
                    status: 'DELETED'
                });
            } else {
                logger.debug('No such message!');
                res.status(404).json({
                    status: 'NO_SUCH_MESSAGE'
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

module.exports.boardRouter = boardRouter;
