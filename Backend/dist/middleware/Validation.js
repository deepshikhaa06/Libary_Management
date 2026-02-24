"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
exports.ValidateSchema = ValidateSchema;
const joi_1 = __importDefault(require("joi"));
function ValidateSchema(schema, property) {
    return async (req, res, next) => {
        try {
            switch (property) {
                case 'query':
                    await schema.validateAsync(req.query);
                    break;
                case 'params':
                    await schema.validateAsync(req.params);
                    break;
                default:
                    await schema.validateAsync(req.body);
            }
            next();
        }
        catch (error) {
            return res.status(422).json({ message: "Object validation failed",
                details: error.details?.map((d) => d.message),
            });
        }
    };
}
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            type: joi_1.default.string().valid("ADMIN", "EMPLOYEE", "PARTRON").required(),
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            email: joi_1.default.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password: joi_1.default.string().required()
        }),
        login: joi_1.default.object({
            email: joi_1.default.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password: joi_1.default.string().required()
        }),
        userId: joi_1.default.object({
            userId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: joi_1.default.string().valid("ADMIN", "EMPLOYEE", "PARTRON").optional(),
            firstname: joi_1.default.string().optional(),
            lastname: joi_1.default.string().optional(),
            email: joi_1.default.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).optional(),
            password: joi_1.default.string().optional()
        })
    },
    book: {
        create: joi_1.default.object({
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required(),
            title: joi_1.default.string().required(),
            cover: joi_1.default.string().required(),
            authors: joi_1.default.array().required(),
            description: joi_1.default.string().required(),
            subjects: joi_1.default.array().required(),
            publisher: joi_1.default.string().required(),
            publicationDate: joi_1.default.date().required(),
            pages: joi_1.default.number().required(),
            genre: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required()
        }),
        delete: joi_1.default.object({
            barcode: joi_1.default.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required()
        })
    },
    libraryCard: {
        create: joi_1.default.object({
            user: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: joi_1.default.object({
            cardId: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan: {
        create: joi_1.default.object({
            status: joi_1.default.string().valid("AVAILABLE", "LOANED").required(),
            loanedDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            dueDate: joi_1.default.date().required(),
            patron: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            employeeOut: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status: joi_1.default.string().valid("AVAILABLE", "LOANED").required(),
            loanedDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            dueDate: joi_1.default.date().required(),
            patron: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
            employeeOut: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        query: joi_1.default.object({
            property: joi_1.default.string().valid("_id", "status", "loanedDate", "dueDate", "returnedDate", "patron", "employeeIn", "employeeOut", "item").required(),
            value: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.date()).required()
        })
    }
};
