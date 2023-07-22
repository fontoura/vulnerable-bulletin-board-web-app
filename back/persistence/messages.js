const { usingConnection } = require('./database');

const { getLogger } = require('../../logger');

const logger = getLogger(module.id);

function createMessage({ userId, title, text }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Inserting message for user #${userId}...`);

            const query = `INSERT INTO mural.message(user_id, title, text) VALUES ('${userId}', '${title}', '${text}') RETURNING *`;
            const result = await connection.query(query);

            const message = filterColumns(result.rows[0]);
            logger.debug(`Inserted message as #${message.messageId}`);

            return message;
        } catch (error) {
            logger.warn(error);
            throw new Error(`Error creating message: ${error.message}`);
        }
    });
}

function readMessage({ messageId }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Reading message #${messageId}...`);

            const query = `SELECT * FROM mural.message WHERE id = ${messageId}`;
            const result = await connection.query(query);

            if (result.rows.length === 0) {
                logger.debug(`Message #${messageId} does not exist.`);
                return null;
            }

            logger.debug(`Read message #${messageId}.`);
            return filterColumns(result.rows[0]);
        } catch (error) {
            logger.warn(error);
            throw new Error(`Error reading message: ${error.message}`);
        }
    });
}

function updateMessage({ messageId, title, text }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Updating message #${messageId}...`);

            const query = `UPDATE mural.message SET title = '${title}', text = '${text}' WHERE id = '${messageId}' RETURNING *`;
            const result = await connection.query(query);

            if (result.rows.length === 0) {
                logger.debug(`Message #${messageId} does not exist.`);
                return null;
            }

            logger.debug(`Updated message #${messageId}.`);
            return filterColumns(result.rows[0]);
        } catch (error) {
            logger.warn(error);
            throw new Error(`Error updating message: ${error.message}`);
        }
    });
}

function deleteMessage({ messageId }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Deleting message #${messageId}...`);

            const query = `DELETE FROM mural.message WHERE id = '${messageId}' RETURNING *`;
            const result = await connection.query(query);

            if (result.rows.length === 0) {
                throw new Error('Message not found.');
            }

            logger.debug(`Deleted message #${messageId}.`);
            return filterColumns(result.rows[0]);
        } catch (error) {
            logger.warn(error);
            throw new Error(`Error deleting message: ${error.message}`);
        }
    });
}

function listMessages({ userId }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Lising messages of user #${userId}...`);

            const query = `SELECT * FROM mural.message WHERE user_id = '${userId}'`;
            const result = await connection.query(query);

            logger.debug(`Listed ${result.rows.length} messages.`);
            return result.rows.map(filterColumns);
        } catch (error) {
            throw new Error(`Error listing messages: ${error.message}`);
        }
    });
}

function filterColumns(row) {
    const { id, title, text, creation_date } = row;
    return { messageId: id, title, text, creationDate: creation_date };
}

module.exports.createMessage = createMessage;
module.exports.readMessage = readMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteMessage = deleteMessage;
module.exports.listMessages = listMessages;
