const express = require("express");
const router = express.Router();
const {
    checkAuth,
    signupUser,
    loginUser,
    logoutUser,
    updateProfile,
    getUsers,
    getOneUser,
    addContact
} = require("../controllers/auth.controller");
const isAuth = require("../middlewares/is.auth");

router.post("/auth/signup", signupUser);
router.post("/auth/login", loginUser);
router.put("/auth/update-profile", isAuth, updateProfile);
router.post("/auth/logout", isAuth, logoutUser);
router.get("/auth/check", isAuth, checkAuth);
router.get("/auth/get-users", isAuth, getUsers);
router.get("/auth/get-user/:id", isAuth, getOneUser);
router.get("/auth/add-contact/:id", isAuth, addContact);

module.exports = router;
