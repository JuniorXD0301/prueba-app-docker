const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: '1234',
    database: 'mydatabase',
});

async function getConnection(){
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {getConnection};