"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const LibraryError_1 = require("../utils/LibraryError");
async function handleRegister(req, res) {
    console.log("Request body", req.body);
    const user = req.body;
    try {
        const reqisteredUser = await (0, UserService_1.register)(user);
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: reqisteredUser._id,
                type: reqisteredUser.type,
                firstname: reqisteredUser.firstname,
                lastname: reqisteredUser.lastname,
                email: reqisteredUser.email
            }
        });
    }
    catch (e) {
        if (e.message.includes("E11000  duplicate key error collection")) {
            return res.status(409).json({ message: "User with emailalready exists", error: e.message });
        }
        else {
            return res.status(500).json({ message: "Unable to create user at this time", error: e.message });
        }
        res.status(500).json({ message: "Unable to create user at this time", error: e.message });
    }
}
async function handleLogin(req, res) {
    const credentials = req.body;
    try {
        const loggedIn = await (0, UserService_1.login)(credentials);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstname: loggedIn.firstname,
                lastname: loggedIn.lastname,
                email: loggedIn.email
            }
        });
    }
    catch (error) {
        if (error instanceof LibraryError_1.InvalidUsernameOrPasswordError) {
            res.status(500).json({ message: "Unable to login at this time", error: error.message });
        }
        else {
            res.status(500).json({ message: "Unable to login at this time", error: error.message });
        }
    }
}
exports.default = { handleRegister, handleLogin };
