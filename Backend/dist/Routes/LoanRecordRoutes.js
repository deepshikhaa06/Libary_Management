"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const LoanRecordController_1 = __importDefault(require("../controllers/LoanRecordController"));
const Validation_1 = require("../middleware/Validation");
const router = express_1.default.Router();
router.get('/', LoanRecordController_1.default.getAllRecords);
router.post('/', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.loan.create, 'body'), LoanRecordController_1.default.createdRecord);
router.put('/', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.loan.update, 'body'), LoanRecordController_1.default.updatedRecord);
router.post('/query', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.loan.query, 'body'), LoanRecordController_1.default.getRecordByProperty);
module.exports = router;
