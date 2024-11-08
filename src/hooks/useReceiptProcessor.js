"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReceiptProcessor = void 0;
var react_1 = require("react");
var tesseract_js_1 = require("tesseract.js");
var receiptParser_1 = require("../utils/receiptParser");
var useReceiptProcessor = function (onDataExtracted, onError) {
    var _a = (0, react_1.useState)({
        isProcessing: false,
        error: null,
        preview: null
    }), status = _a[0], setStatus = _a[1];
    var processReceipt = (0, react_1.useCallback)(function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var previewUrl_1, worker, text, extractedData, error_1, errorMessage_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    setStatus(function (prev) { return (__assign(__assign({}, prev), { isProcessing: true, error: null })); });
                    previewUrl_1 = URL.createObjectURL(file);
                    setStatus(function (prev) { return (__assign(__assign({}, prev), { preview: previewUrl_1 })); });
                    return [4 /*yield*/, (0, tesseract_js_1.createWorker)()];
                case 1:
                    worker = _a.sent();
                    return [4 /*yield*/, worker.loadLanguage('eng')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, worker.initialize('eng')];
                case 3:
                    _a.sent();
                    // Set specific OCR parameters for better receipt recognition
                    return [4 /*yield*/, worker.setParameters({
                            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,₱$-/:& ',
                            preserve_interword_spaces: '1',
                        })];
                case 4:
                    // Set specific OCR parameters for better receipt recognition
                    _a.sent();
                    return [4 /*yield*/, worker.recognize(file)];
                case 5:
                    text = (_a.sent()).data.text;
                    return [4 /*yield*/, worker.terminate()];
                case 6:
                    _a.sent();
                    extractedData = (0, receiptParser_1.parseReceiptText)(text);
                    // Validate extracted data
                    if (!extractedData.date && !extractedData.amount && !extractedData.merchant) {
                        throw new Error('Could not extract receipt details. Please enter them manually.');
                    }
                    onDataExtracted(extractedData);
                    setStatus(function (prev) { return (__assign(__assign({}, prev), { isProcessing: false })); });
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    errorMessage_1 = error_1 instanceof Error ? error_1.message :
                        'Failed to process receipt. Please try again or enter details manually.';
                    setStatus(function (prev) { return (__assign(__assign({}, prev), { isProcessing: false, error: errorMessage_1 })); });
                    onError(errorMessage_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [onDataExtracted, onError]);
    return { status: status, processReceipt: processReceipt };
};
exports.useReceiptProcessor = useReceiptProcessor;
