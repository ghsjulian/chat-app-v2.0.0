const Message = require("../models/message.model");

const getLastMessage = async id => {
    try {
        const messages = await Message.find({
            $or: [{ sender_id: id }, { receiver_id: id }]
        }).sort({ createdAt: 1 });
        return messages;
    } catch (error) {
        console.log(
            "Error While Getting last message functions/get.last.message.js -> ",
            error.message
        );
        return [];
    }
};

module.exports = getLastMessage;
