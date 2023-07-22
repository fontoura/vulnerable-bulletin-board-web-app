const { Router } = require('express');

const { pageMiddleware } = require('./utils');

const boardController = require('../back/controllers/board');

const pagesRouter = Router();

pagesRouter.get('/login', pageMiddleware({ requiresAuth: false, pageName: 'login' }));
pagesRouter.get('/sign-in', pageMiddleware({ requiresAuth: false, pageName: 'sign_in' }));

pagesRouter.get('/', pageMiddleware({ requiresAuth: true, pageName: 'home' }));
pagesRouter.get('/change-password', pageMiddleware({ requiresAuth: false, pageName: 'change_password' }));
pagesRouter.get('/board', pageMiddleware({
    requiresAuth: true,
    pageName: 'board',
    beforeLoad: async ({ session: { userId } }) => await boardController.loadBoard({ userId })
}));
pagesRouter.get('/board/create', pageMiddleware({ requiresAuth: true, pageName: 'create_message' }));
pagesRouter.get('/board/:messageId/edit', pageMiddleware({
    requiresAuth: true,
    pageName: 'edit_message',
    beforeLoad: async ({ params: { messageId } }) => {
        const message = await boardController.loadMessage({ messageId });
        if (message == null) {
            throw new Error('No such message!');
        }
        return message;
    }
}));

pagesRouter.use(function (err, req, res, next) {
    pageMiddleware({ requiresAuth: false, pageName: 'error' })(req, res, next);
});

module.exports.pagesRouter = pagesRouter;