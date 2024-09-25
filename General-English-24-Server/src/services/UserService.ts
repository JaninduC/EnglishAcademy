import User from "../models/User";
import UserType from "../types/UserTypes";

export default {
    async verifyLogin(email: string, password: string): Promise<boolean> {
        const user = await User.findOne({ email: email, password: password });
        if (user) return true;
        return false;
    },

    async registerUser(user: UserType) {
        const savedUser = await new User(user).save();
        return savedUser;
    },

    async getAll() {
        // get all users without passwords
        const users = await User.find({}, "-password");
        return users;
    },

    async getUserByEmail(email: string) {
        const user = await User.findOne({ email: email }, "-password");
        if (user) return user;
        return null;
    },

    async updateUser(id: string, user: UserType) {
        const u = await User.findById(id);
        if (u)
            await User.findByIdAndUpdate(id, user, { new: true })
        else
            throw new Error('User not found');

    },

    async deleteUser(id: string) {
        const u = await User.findById(id);
        if (u)
            await User.findByIdAndDelete(id);
        else
            throw new Error('User not found');
    },
}