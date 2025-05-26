const { decodeJWT } = require("../libs/jwt.config");

const isAuth = async (req, res, next) => {
    const token = req?.cookies?.chattoken || null;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized - Token Not Found"
        });
    }
    const data = await decodeJWT(token);
    if (!data) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized - Invalid Token"
        });
    }
    req.user = data
    next()
};
module.exports = isAuth;
