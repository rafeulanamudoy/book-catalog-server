"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
exports.UserRoutes = router;
router.post('/signUp', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signUpZodSchema), auth_controller_1.UserController.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.UserController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.UserController.refreshToken);
