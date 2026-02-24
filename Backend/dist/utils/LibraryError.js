"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRecordDoesNotExistError = exports.LibraryCardDoesNotExistError = exports.BookDoesNotExistError = exports.UserDoesNotExistError = exports.InvalidUsernameOrPasswordError = exports.UnableToSaveError = void 0;
class UnableToSaveError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnableToSaveError = UnableToSaveError;
class InvalidUsernameOrPasswordError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidUsernameOrPasswordError = InvalidUsernameOrPasswordError;
class UserDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
class BookDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BookDoesNotExistError = BookDoesNotExistError;
class LibraryCardDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LibraryCardDoesNotExistError = LibraryCardDoesNotExistError;
class LoanRecordDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LoanRecordDoesNotExistError = LoanRecordDoesNotExistError;
