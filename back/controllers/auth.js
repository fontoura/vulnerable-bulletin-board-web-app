const { getLogger } = require('../../logger');

const logger = getLogger(module.id);

const usersPersistence = require('../persistence/users');
const messagesPersistence = require('../persistence/messages');

async function create({ username, password }) {
    const user = await usersPersistence.createUser({ username, password });
    if (user != null) {
        try {
            await messagesPersistence.createMessage({ userId: user.userId, title: 'Bem-vindo(a)', text: 'Esta é sua primeira mensagem!' });
        } catch (e) {
            logger.warn(e);
        }
        return true;
    }


    return false;
}

async function authenticate({ username, password }) {
    const user = await usersPersistence.findUserByUsername({ username });
    if (user == null) {
        return null;
    }

    if (user.password == password) {
        const { userId } = user;
        return { id: userId, username };
    }

    return null;
}

async function change({ username, newPassword }) {
    const user = await usersPersistence.updateUser({ username, password: newPassword });
    if (user != null) {
        return true;
    }

    return false;
}

module.exports.create = create;
module.exports.authenticate = authenticate;
module.exports.change = change;
