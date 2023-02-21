const User = require("../models/UserModel");
const bcryptEncrypter = require("bcrypt");

class UserService {

    //Create new user
    async createUser(user) {

        //Add salt to hashing to make it unique
        const salt = await bcryptEncrypter.genSalt();
        const originalPassword = user.password;

        //Hash and encrypt user entered password
        const hashedPassword = await bcryptEncrypter.hash(originalPassword, salt);

        user.password = hashedPassword;

        return await User.create(user);
    }

    async getUser(email) {
        //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
        let emailRegexed = new RegExp(email, 'i');

        return await User.findOne({ email: emailRegexed });
    }

    async getAllUsers() {
        return await User.find();
    }

    async updateUserByEmail(email, data) {
        
        //makes email case insensitive
        let emailRegexed = new RegExp(email, 'i');
        return await User.findOneAndUpdate({ email: emailRegexed }, data, { new: true });
    }

    async deleteUser(email) {
        return await User.findOneAndDelete({ email: email });
    }
}

module.exports = new UserService();