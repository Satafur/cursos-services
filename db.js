const { Client, Pool } = require('pg');

/**
 * Application prototype.
 */

var db = exports = module.exports = {};

db.buildDefaultPool = () => {
    this.pool = new Pool({
        connectionString: 'postgres://vrbvnpiearvklo:e0beff86d51d7baedcca4ac2eec2d1e9c3a66f3836bb50a188f05ab1c4d9be3c@ec2-52-0-155-79.compute-1.amazonaws.com:5432/d86dokkipl463m',
        ssl: {
            rejectUnauthorized: false
        }
    });
}

db.client = async () => {
    if (!this.pool) throw new Error('Error al contectar: No hay pool de conexiones');
    return await this.pool.connect();
}
