require("dotenv").config("../../.env");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const createConnection = async () => {
    try {
        mongoose.connect(MONGO_URI, { dbName: DB_NAME }).then(() => {
            console.log("\n[+] MongoDB Connected Successfully \n");
        });
    } catch (error) {
        console.log("\n[!] Error While Connecting -> ", error.message);
    }
};

module.exports = createConnection;
