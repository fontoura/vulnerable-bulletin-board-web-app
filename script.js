require('dotenv').config();

const { usingConnection } = require('./back/persistence/database');

// this is a file that can be used to perform manual operations on the database
async function runScript() {
    return usingConnection(connection => {
        
    });
}

runScript();
