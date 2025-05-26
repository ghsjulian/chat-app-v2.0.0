const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        avatar : {
            type : String,
            default : ""
        },
        contact : {
            type : Object || Array,
            default : []
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User",userSchema)

module.exports = User