const { Router } = require('express');

const { boardRouter } = require('../back/board');
const { sessionRouter } = require('../back/session');

const apiRouter = Router();

apiRouter.use('/session', sessionRouter);
apiRouter.use('/board', boardRouter);

module.exports.apiRouter = apiRouter;
