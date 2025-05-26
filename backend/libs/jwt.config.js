require("dotenv").config("../.env");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const encodeJWT = async payload => {
    try {
        if (!payload) throw new Error("Please Use Payload Object");
        return await jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
    } catch (error) {
        console.error(`\n[!] Error While Creating JWT - ${error}`);
        return null;
    }
};
const decodeJWT = async token => {
    try {
        return await jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = { encodeJWT, decodeJWT };
