const createNewFile = require("../libs/create.file");
const path = require("path");
const fs = require("fs");
const Message = require("../models/message.model");

const insertMessage = async (req, res) => {
    try {
        const { message, receiver_id, images } = req.body;
        if (!message && images.length == 0)
            throw new Error("No Message And Image");
        const newMessage = new Message({
            sender_id: req.user.id,
            receiver_id,
            message: message.trim(),
            images
        });
        //console.log(newMessage);
        await newMessage.save();
        // Socket Will Be Added Here...
        return res.status(200).json({
            success: true,
            status: true,
            message: newMessage
        });
    } catch (error) {
        console.error("Error In insertMessage Controller --> :", error);
        return res.status(505).json({
            success: false,
            status: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const receiver = req.params.id;
        const sender = req.user.id;
        const messages = await Message.find({
            $or: [
                { sender_id: sender, receiver_id: receiver },
                { sender_id: receiver, receiver_id: sender }
            ]
        });
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { insertMessage ,getMessages};
