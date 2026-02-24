"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.modifyUser = modifyUser;
exports.removeUser = removeUser;
const config_1 = require("../config");
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LibraryError_1 = require("../utils/LibraryError");
async function register(user) {
    const Rounds = config_1.config.server.rounds;
    try {
        const hashedPassword = await bcrypt_1.default.hash(user.password, Rounds);
        const saved = new UserDao_1.default({ ...user, password: hashedPassword });
        return await saved.save();
    }
    catch (e) {
        throw new LibraryError_1.UnableToSaveError(e.message);
    }
}
async function login(credentials) {
    const { email, password } = credentials;
    try {
        const user = await UserDao_1.default.findOne({ email });
        if (!user)
            throw new LibraryError_1.InvalidUsernameOrPasswordError("Invalid username or Password");
        else {
            const validPassword = await bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                throw new LibraryError_1.InvalidUsernameOrPasswordError("Invalid username or Password");
            else
                return user;
        }
    }
    catch (e) {
        throw e;
    }
}
async function findAllUsers() {
    try {
        const users = await UserDao_1.default.find();
        return users;
    }
    catch (error) {
        return [];
    }
}
async function findUserById(id) {
    try {
        const user = await UserDao_1.default.findById(id);
        if (user)
            return user;
        throw new LibraryError_1.UserDoesNotExistError("User does not exist with this ID");
    }
    catch (error) {
        throw error;
    }
}
async function modifyUser(user) {
    try {
        const { _id, ...updateData } = user;
        const updatedUser = await UserDao_1.default.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedUser)
            throw new LibraryError_1.UserDoesNotExistError("User does not exist with this ID");
        console.log("Update payload:", user);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
}
async function removeUser(userId) {
    try {
        let deleted = await UserDao_1.default.findByIdAndDelete(userId);
        if (!deleted)
            throw new LibraryError_1.UserDoesNotExistError("User does not exist with this ID");
        return "User deleted successfully";
    }
    catch (error) {
        throw error;
    }
}
