const UserModel = require("../models/user.model");

const getUser = async id => {
    try {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            throw new Error("No user found");
        }
        return user;
    } catch (error) {
        console.log(
            "Error While Getting User functions/get.user.js -> ",
            error.message
        );
        return {};
    }
};

module.exports = getUser;
