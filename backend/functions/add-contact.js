const mongoose = require("mongoose");

// Define a sample schema and model for demonstration
const schema = new mongoose.Schema({
    contact: [{ type: String }]
});

const ContactModel = mongoose.model("ContactModel", schema);

async function searchId(documentId, idToFind) {
    const doc = await ContactModel.findOne(
        { _id: documentId, contact: idToFind },
        { _id: 1 }
    ).lean();
    return !!doc;
}

async function pushIdIfNotExists(documentId, newId) {
    const result = await ContactModel.updateOne(
        { _id: documentId, contact: { $ne: newId } },
        { $push: { contact: newId } }
    );
    // result.nModified = 1 means ID was pushed; 0 means already present
    return result.modifiedCount === 1;
}

async function pullId(documentId, idToRemove) {
    const result = await ContactModel.updateOne(
        { _id: documentId },
        { $pull: { contact: idToRemove } }
    );
    // result.nModified = 1 means ID was removed; 0 means ID was not found
    return result.nModified === 1;
}

module.exports = {
    searchId,
    pushIdIfNotExists,
    pullId,
    ContactModel
};
