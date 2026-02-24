"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const LibraryError_1 = require("../utils/LibraryError");
async function getAllUsers(req, res) {
    try {
        let users = await (0, UserService_1.findAllUsers)();
        res.status(200).json({ message: "Users fetched successfully", users });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get users at this time", error: error.message });
    }
}
async function getUserById(req, res) {
    const userId = req.params.userId;
    try {
        let user = await (0, UserService_1.findUserById)(userId);
        res.status(200).json({ message: "User fetched successfully", user });
    }
    catch (error) {
        if (error instanceof LibraryError_1.UserDoesNotExistError) {
            res.status(404).json({ message: "User does not exist with this ID" });
        }
        else {
            res.status(500).json({ message: "Unable to get user at this time", error: error.message });
        }
    }
}
async function updateUser(req, res) {
    const user = req.body;
    try {
        let updateUser = await (0, UserService_1.modifyUser)(user);
        res.status(200).json({ message: "User updated successfully", updateUser });
    }
    catch (error) {
        if (error instanceof LibraryError_1.UserDoesNotExistError) {
            res.status(404).json({ message: "User does not exist with this ID" });
        }
        else {
            res.status(500).json({ message: "Unable to update user at this time", error: error.message });
        }
    }
}
async function deleteUser(req, res) {
    let userId = req.params.userId;
    try {
        let user = await (0, UserService_1.findUserById)(userId);
        res.status(200).json({ message: "User fetched successfully", user });
    }
    catch (error) {
        if (error instanceof LibraryError_1.UserDoesNotExistError) {
            res.status(404).json({ message: "User requested does not exist" });
        }
        else {
            res.status(500).json({ message: "Unable to delete user at this time", error: error.message });
        }
    }
}
exports.default = { getAllUsers, getUserById, updateUser, deleteUser };
