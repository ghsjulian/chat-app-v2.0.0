const Message = require("../models/message.model");

const setMessageSeen = async id => {
    try {
        const message = await Message.updateOne(
            { _id:id },
            { $set: { seen: true } }
        );
        return true;
    } catch (error) {
        console.log(
            "Error While Set Seen Message functions/set.message.seen.js -> ",
            error.message
        );
        return false;
    }
};

module.exports = setMessageSeen;
