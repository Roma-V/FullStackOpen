"use strict";
/**
 * @file Express route for diagnoses endpoint
 * @author Roman Vasilyev
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseServise_1 = __importDefault(require("../servises/diagnoseServise"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnoseServise_1.default.getDiagnosesShort());
});
router.post('/', (_req, res) => {
    const result = diagnoseServise_1.default.addDiagnose();
    res.send(result);
});
exports.default = router;
