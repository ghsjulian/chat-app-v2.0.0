const UserModel = require("../models/user.model");
const { createHash, compareHash } = require("../libs/password.hashing");
const { encodeJWT } = require("../libs/jwt.config");
const setCookie = require("../libs/set.cookie");
const createNewFile = require("../libs/create.file");
const path = require("path");
const fs = require("fs");

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name && !email && !password) {
            throw new Error("All Fields Are Required !");
        }
        const existUser = await UserModel.findOne({ email });
        if (existUser) throw new Error("User Already Registered !");
        const hashed = await createHash(password);
        const newUser = await new UserModel({
            name,
            email,
            password: hashed
        });
        await newUser.save();
        const token = await encodeJWT({ id: newUser._id, name, email });
        setCookie(res, token);
        return res.status(201).json({
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
            },
            status: true,
            success: true,
            message: "User Created Successfully"
        });
    } catch (error) {
        return res.status(505).json({
            success: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) throw new Error("All Fields Are Required");
        const existUser = await UserModel.findOne({ email: email.trim() });
        if (existUser) {
            const matched = await compareHash(
                password.trim(),
                existUser.password
            );
            if (!matched) throw new Error("Invalid Email Or Password");
            const token = await encodeJWT({
                id: existUser._id,
                name: existUser.name,
                email: email.trim()
            });
            setCookie(res, token);
            return res.status(201).json({
                user: {
                    _id: existUser._id,
                    name: existUser.name,
                    email: existUser.email,
                    avatar: existUser.avatar
                },
                status: true,
                success: true,
                message: "User Logged In Successfully"
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        return res.status(505).json({
            code: 403,
            status: false,
            message: error.message || "Something Went Wrong"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            throw new Error("Invalid Image File");
        }
        /* It was creating a new image file from base64 image string 
        but when i host the project on render it is also working 
        but after some times the server automatically remove the image file from server !
        so i will add push the image data in to database directly as base64*/
        /*
         const folder = path.join(__dirname, "../uploads/");
        // Remove the data URL prefix if present (e.g. "data:image/jpeg;base64,")
        const base64Data = avatar
            .replace(/^data:image\/jpeg;base64,/, "")
            .replace(/^data:image\/jpg;base64,/, "")
            .replace(/^data:image\/png;base64,/, "");
            // allow png fallback
        // Create a buffer from the base64 string
        const imgBuffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(folder + req?.user?.id + ".jpg", imgBuffer);
        */
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            req?.user?.id,
            { avatar: avatar},
            { new: true }
        );
        return res.json({
            user: updatedUser,
            success: true,
            message: "Profile picture updated successfully"
        });
    } catch (error) {
        console.error("Error In updateProfile Controller :", error);
        return res.status(505).json({
            code: 403,
            status: false,
            success: false,
            message: error.message || "Something Went Wrong"
        });
    }
};
const logoutUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req?.user?.id).select(
            "-password"
        );
        if (!user) throw new Error("User Not Found");
        res.cookie("chattoken", "", {
            maxAge: 0
        });
        return res.status(200).json({
            success: true,
            message: "User Logged Out Successfully"
        });
    } catch (error) {
        console.error("Error In logoutUser Controller :", error);
        return res.status(404).json({
            success: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};
const checkAuth = async (req, res) => {
    try {
        const user = await UserModel.findById(req?.user?.id).select(
            "-password"
        );
        if (!user) throw new Error("User Not Found");
        return res.status(200).json({
            user,
            success: true,
            message: "User Found"
        });
    } catch (error) {
        console.error("Error In checkAuth Controller :", error);
        return res.status(404).json({
            user: {},
            success: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};
const getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req?.params?.id).select(
            "-password"
        );
        if (!user) throw new Error("User Not Found");
        return res.status(200).json({
            user,
            success: true,
            message: "User Found"
        });
    } catch (error) {
        console.error("Error In checkAuth Controller :", error);
        return res.status(404).json({
            user: {},
            success: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({
            _id: { $ne: req?.user?.id }
        }).select("-password");
        if (!users) {
            throw new Error("No user found");
        }
        return res.status(200).json({
            users,
            success: true,
            message: "Users Found"
        });
    } catch (error) {
        console.error("Error In getUsers Controllers :", err);
        return res.status(403).json({
            users: [],
            success: false,
            message: error.message || "Internal Server Error - 505"
        });
    }
};

const addContact = async (req, res) => {
    try {
        const result = await UserModel.updateOne(
            { _id: req?.user?.id, contact: { $ne: req.params?.id } },
            { $push: { contact: req.params?.id } }
        );
        if (result.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                type: "ADDED",
                message: "Contact Added Successfully"
            });
        } else {
            const result = await UserModel.updateOne(
                { _id: req?.user?.id },
                { $pull: { contact: req?.params?.id } }
            );
            return res.status(200).json({
                success: true,
                type: "REMOVED",
                message: "Contact Remove Successfully"
            });
        }
    } catch (error) {
        console.error("Error In addContact Controllers : ", error);
        return res.status(505).json({
            success: true,
            message: error.message || "Internal Server Error - 505"
        });
    }
};

module.exports = {
    checkAuth,
    signupUser,
    loginUser,
    logoutUser,
    updateProfile,
    getUsers,
    getOneUser,
    addContact
};
