"use strict";
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
exports.processReceiptImage = processReceiptImage;
var tesseract_js_1 = require("tesseract.js");
function processReceiptImage(imageFile) {
    return __awaiter(this, void 0, void 0, function () {
        var worker, imageUrl, text, datePatterns, dateMatch, _i, datePatterns_1, pattern, amountPatterns, amountMatch, _a, amountPatterns_1, pattern, lines, merchantLine, formattedDate, dateStr, date, formattedAmount, amountStr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, tesseract_js_1.createWorker)()];
                case 1:
                    worker = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, , 6, 8]);
                    return [4 /*yield*/, worker.loadLanguage('eng')];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, worker.initialize('eng')];
                case 4:
                    _b.sent();
                    imageUrl = URL.createObjectURL(imageFile);
                    return [4 /*yield*/, worker.recognize(imageUrl)];
                case 5:
                    text = (_b.sent()).data.text;
                    URL.revokeObjectURL(imageUrl);
                    datePatterns = [
                        /\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b/, // DD/MM/YYYY, MM/DD/YYYY
                        /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/i, // Month DD, YYYY
                        /\b\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b/i, // DD Month YYYY
                    ];
                    dateMatch = null;
                    for (_i = 0, datePatterns_1 = datePatterns; _i < datePatterns_1.length; _i++) {
                        pattern = datePatterns_1[_i];
                        dateMatch = text.match(pattern);
                        if (dateMatch)
                            break;
                    }
                    amountPatterns = [
                        /(?:PHP|₱)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i, // PHP/₱ symbol followed by amount
                        /(?:TOTAL|AMOUNT|GRAND TOTAL)[:]*\s*(?:PHP|₱)?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i, // Total/Amount labels
                        /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:PHP|₱)/i, // Amount followed by PHP/₱ symbol
                    ];
                    amountMatch = null;
                    for (_a = 0, amountPatterns_1 = amountPatterns; _a < amountPatterns_1.length; _a++) {
                        pattern = amountPatterns_1[_a];
                        amountMatch = text.match(pattern);
                        if (amountMatch)
                            break;
                    }
                    lines = text.split('\n')
                        .map(function (line) { return line.trim(); })
                        .filter(function (line) { return line.length > 0; });
                    merchantLine = lines.slice(0, 3).find(function (line) {
                        return line.length > 3 &&
                            !line.match(/receipt|invoice|tel|address|store|no\.|branch/i) &&
                            !line.match(/^\d+$/);
                    } // Exclude lines with only numbers
                    );
                    formattedDate = '';
                    if (dateMatch) {
                        dateStr = dateMatch[0];
                        try {
                            date = new Date(dateStr);
                            formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
                        }
                        catch (_c) {
                            formattedDate = dateStr;
                        }
                    }
                    formattedAmount = void 0;
                    if (amountMatch) {
                        amountStr = amountMatch[1].replace(/,/g, '');
                        formattedAmount = parseFloat(amountStr);
                    }
                    console.log('Extracted Text:', text); // For debugging
                    console.log('Extracted Data:', {
                        date: formattedDate,
                        amount: formattedAmount,
                        merchant: merchantLine === null || merchantLine === void 0 ? void 0 : merchantLine.trim()
                    });
                    return [2 /*return*/, {
                            date: formattedDate || undefined,
                            amount: formattedAmount,
                            merchant: merchantLine === null || merchantLine === void 0 ? void 0 : merchantLine.trim(),
                        }];
                case 6: return [4 /*yield*/, worker.terminate()];
                case 7:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}