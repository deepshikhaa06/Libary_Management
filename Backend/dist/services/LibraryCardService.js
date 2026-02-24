"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLibraryCard = registerLibraryCard;
exports.findLibraryCard = findLibraryCard;
const LibraryCardDoa_1 = __importDefault(require("../daos/LibraryCardDoa"));
const LibraryError_1 = require("../utils/LibraryError");
async function registerLibraryCard(card) {
    try {
        const savedCard = new LibraryCardDoa_1.default(card);
        return await savedCard.save();
    }
    catch (e) {
        let c = await LibraryCardDoa_1.default.findOne({ user: card.user }).populate("user");
        if (c)
            return c;
        throw e;
    }
}
async function findLibraryCard(libraryCardId) {
    try {
        let card = await LibraryCardDoa_1.default.findOne({ _id: libraryCardId }).populate("user");
        if (card)
            return card;
        throw new LibraryError_1.LibraryCardDoesNotExistError("Library card does not exist with this ID");
    }
    catch (e) {
        throw e;
    }
}
