const messagesPersistence = require('../persistence/messages')

async function loadBoard({ userId }) {
    if (userId != null) {
        return await messagesPersistence.listMessages({ userId });
    }
}

async function loadMessage({ messageId }) {
    if (messageId != null) {
        return await messagesPersistence.readMessage({ messageId });
    }
}

async function createMessage({ userId, title, text }) {
    if (userId != null) {
        const message = await messagesPersistence.createMessage({ userId, title, text });
        return (message != null);
    }
}

async function editMessage({ messageId, title, text }) {
    if (messageId != null) {
        const message = await messagesPersistence.updateMessage({ messageId, title, text });
        return (message != null);
    }
}

async function deleteMessage({ messageId }) {
    if (messageId != null) {
        const message = await messagesPersistence.deleteMessage({ messageId });
        return (message != null);
    }
}


module.exports.loadBoard = loadBoard;
module.exports.loadMessage = loadMessage;
module.exports.createMessage = createMessage;
module.exports.editMessage = editMessage;
module.exports.deleteMessage = deleteMessage;
