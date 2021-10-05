const sql = require('mssql/msnodesqlv8')
const sqlConfig = {
    server: 'localhost',
    user: 'sa',
    password: '123',
    database: 'TN_TTTN',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    },
    driver: 'msnodesqlv8',
}

const sqlConnect = sql.connect(sqlConfig)

module.exports = { sqlConnect, sql };