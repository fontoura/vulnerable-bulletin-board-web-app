const { Pool } = require('pg');

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const pool = new Pool({
    host: DB_HOST,
    port: parseInt(DB_PORT),
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
});

/**
 * @template T
 * @callback connectionHandler
 * @param {import('pg').PoolClient} client
 * @returns {Promise<T>}
 */

/**
 * @template T
 * @param {connectionHandler<T>} fn
 * @returns {Promise<T>}
 */
async function usingConnection(fn) {
    const conn = await pool.connect();
    try {
        await conn.query(`SET search_path TO mural`);
        return await fn(conn);
    } finally {
        conn.release();
    }
}

module.exports.usingConnection = usingConnection;
