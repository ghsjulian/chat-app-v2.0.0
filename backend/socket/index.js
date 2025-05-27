require("dotenv").config("../../.env");
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const getUser = require("../functions/get.user");

const app = express();
const server = http.createServer(app);

const IO = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_SOCK_URL]
    }
});

const USERS = {};

const getReceiverSockID = id => {
    return USERS[id];
};

IO.on("connection", async socket => {
    const sock_id = socket.id;
    const user_id = socket?.handshake?.query?.user_id;
    const user = await getUser(user_id);
    if (user_id) USERS[user_id] = sock_id;
    console.log(`\n[+] ${user?.name} is connected - ${sock_id}\n`);
    /*--------------------------------------------------------------*/
    IO.emit("online-users", Object.keys(USERS));
    /*--------------------------------------------------------------*/
    socket.on("disconnect", async () => {
        delete USERS[user_id];
        IO.emit("online-users", Object.keys(USERS));
        console.log(`\n[+] ${user?.name} is disconnected - ${sock_id}\n`);
    });
});

module.exports = { IO, app, server, USERS, getReceiverSockID };
