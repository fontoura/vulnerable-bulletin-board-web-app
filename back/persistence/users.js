const { DatabaseError } = require('pg');

const { usingConnection } = require('./database');
const { getLogger } = require('../../logger');

const logger = getLogger(module.id);

function createUser({ username, password }) {
    return usingConnection(async connection => {
        try {
            logger.debug(`Creating user "${username}"...`);

            const query = `INSERT INTO mural.user(username, password) VALUES ('${username}', '${password}') RETURNING *`;
            const result = await connection.query(query);

            const user = filterColumns(result.rows[0]);
            logger.debug(`Created user as #${user.userId}`);

            return user;
        } catch (e) {
            if (e instanceof DatabaseError) {
                if (e.code == '23505') {
                    logger.info('The user already exists!');
                    return null;
                }
            }
            logger.warn(error);
            throw e;
        }
    });
}

function readUser({ userId }) {
    return usingConnection(async connection => {
        logger.debug(`Reading user #${userId}...`);

        const query = `SELECT * FROM mural.user WHERE id = '${userId}'`;
        const result = await connection.query(query);

        if (result.rows.length === 0) {
            logger.debug('No such user!');
            throw new Error('User not found.');
        }

        const user = filterColumns(result.rows[0]);
        logger.debug(`Read user "${user.username}".`);

        return user;
    });
}

function findUserByUsername({ username }) {
    return usingConnection(async connection => {
        logger.debug(`Finding user "${username}"...`);

        const query = `SELECT * FROM mural.user WHERE username = '${username}'`;
        const result = await connection.query(query);

        if (result.rows.length === 0) {
            logger.debug('No such user!');
            throw new Error('User not found.');
        }

        const user = filterColumns(result.rows[0]);
        logger.debug(`Read user #${user.userId}.`);

        return user;
    });
}

function updateUser({ username, password }) {
    return usingConnection(async connection => {
        logger.debug(`Updating user "${username}"...`);

        const query = `UPDATE mural.user SET password = '${password}' WHERE username = '${username}' RETURNING *`;
        const result = await connection.query(query);

        if (result.rows.length === 0) {
            logger.debug('No such user!');
            throw new Error('User not found.');
        }

        logger.debug('The user was updated!');
        return filterColumns(result.rows[0]);
    });
}

function filterColumns(row) {
    const { id, username, password, creation_date } = row;
    return { userId: id, username, password, creationDate: creation_date };
}

module.exports.createUser = createUser;
module.exports.readUser = readUser;
module.exports.findUserByUsername = findUserByUsername;
module.exports.updateUser = updateUser;
