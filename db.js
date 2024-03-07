const mysql = require('mysql2/promise');
const config = require('./config');

class Database {
    constructor() {
        this.connection = null;
        this.active = false;

        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
    }
    //#region Connection callable async method
    async connect() {
        try {
            //Create connection
            this.connection = await mysql.createConnection(config.database);
            //Handling Log setup
            this.connection.on('end', this.handleDisconnect);
            this.connection.on('error', this.handleDisconnect);
            this.connection.on('connect', this.handleConnect);
            this.active = true;

        } catch (error) {
        console.error(`[ERROR] ${new Date().toLocaleString()} - Error in MySQL connection: ${error.code}`);
        throw error;
        }
    }
    //#endregion
    //#region Database disconnection callable async method
    async disconnect() {
        try {
        if (this.connection) {
            //Handling log setup
            this.connection.off('end', this.handleDisconnect);
            this.connection.off('error', this.handleDisconnect);
            this.connection.off('connect', this.handleConnect);

            //Kill connection
            await this.connection.end();
            this.connection = null;
            this.alive = false;
        }
        } catch (error) {
        console.error(`[ERROR] ${new Date().toLocaleString()} - Failed to disconnect from database server: ${error.code}`);
        }
    }
    //#endregion
    //#region Alive connection method
    isConnected() {
        if (this.connection == null) {
        return false;
        }
        return this.active;
    }
    //#endregion
    //#region Event Stat
    handleDisconnect() {
        console.error(`[ERROR] ${new Date().toLocaleString()} - The database connection has been lost!`);
        this.active = false;
    }

    handleConnect() {
        console.log(`[INFO] ${new Date().toLocaleString()} - The database connection has been restored!`);
        this.active = true;
    }
    //#endregion
}

//#region Database connection optimalize - 2024.01.27.
const database = new Database();
//#endregion

module.exports = database;