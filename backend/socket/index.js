require("dotenv").config("../../.env");
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const getUser = require("../functions/get.user");
const setMessageSeen = require("../functions/set.message.seen");
const getLastMessage = require("../functions/get.last.message");

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
    socket.on("set-seen", async message_id => {
        if (!message_id) return;
        await setMessageSeen(message_id);
    });
    socket.on("get-last-message", async id => {
        if (!id) return;
        const messages = await getLastMessage(id);
        IO.to(getReceiverSockID(id)).emit("last-message",messages)
    });

    /*--------------------------------------------------------------*/
    socket.on("disconnect", async () => {
        delete USERS[user_id];
        IO.emit("online-users", Object.keys(USERS));
        console.log(`\n[+] ${user?.name} is disconnected - ${sock_id}\n`);
    });
});

module.exports = { IO, app, server, USERS, getReceiverSockID };
