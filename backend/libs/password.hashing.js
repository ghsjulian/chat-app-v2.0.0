const bcrypt = require("bcryptjs");

const createHash = async password => {
    try {
        if (!password) throw new Error("No value provided");
        const salt = await bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(password, salt);
        return hashed;
    } catch (error) {
        console.error(`\n[!] Error While Hashing Password - ${error}`);
        return null;
    }
};
const compareHash = async (password, hashed) => {
    try {
        if(!password && !hashed) throw new Error("Please required two arguments!")
        return bcrypt.compareSync(password, hashed);
    } catch (error) {
        console.error(`\n[!] Error While Comparing Hashed - ${error}`);
        return null;
    }
};

module.exports = { createHash, compareHash };
