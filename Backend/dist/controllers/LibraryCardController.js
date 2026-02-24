"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibraryCardService_1 = require("../services/LibraryCardService");
const LibraryError_1 = require("../utils/LibraryError");
async function getLibraryCard(req, res) {
    const { cardId } = req.params;
    try {
        let libraryCard = await (0, LibraryCardService_1.findLibraryCard)(cardId);
        res.status(200).json({ message: "Library card fetched successfully", libraryCard });
    }
    catch (error) {
        if (error instanceof LibraryError_1.LibraryCardDoesNotExistError) {
            res.status(404).json({ message: "Library card does not exist with this ID" });
        }
        else {
            res.status(500).json({ message: "Unable to get library card at this time", error: error.message });
        }
    }
}
async function createLibraryCard(req, res) {
    const card = req.body;
    try {
        let libraryCard = await (0, LibraryCardService_1.registerLibraryCard)(card);
        res.status(201).json({ message: "Library card created successfully", libraryCard });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to create library card at this time", error: error.message });
    }
}
exports.default = { getLibraryCard, createLibraryCard };
