const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/is.auth")
const {insertMessage,getMessages} = require("../controllers/message.controller")


router.post("/message/send-message/:id", isAuth,insertMessage);
router.get("/message/get-messages/:id", isAuth,getMessages);

module.exports = router;
