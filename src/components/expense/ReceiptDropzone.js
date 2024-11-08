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
exports.ReceiptDropzone = void 0;
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var ocrService_1 = require("../../services/ocrService");
var ReceiptDropzone = function (_a) {
    var onExtractComplete = _a.onExtractComplete;
    var _b = (0, react_1.useState)(false), isProcessing = _b[0], setIsProcessing = _b[1];
    var _c = (0, react_1.useState)(null), previewUrl = _c[0], setPreviewUrl = _c[1];
    var onDrop = (0, react_1.useCallback)(function (acceptedFiles) { return __awaiter(void 0, void 0, void 0, function () {
        var file, preview, extractedText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = acceptedFiles[0];
                    if (!file)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    preview = URL.createObjectURL(file);
                    setPreviewUrl(preview);
                    // Process OCR
                    setIsProcessing(true);
                    return [4 /*yield*/, (0, ocrService_1.extractTextFromImage)(file)];
                case 2:
                    extractedText = _a.sent();
                    onExtractComplete(extractedText);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to process receipt:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [onExtractComplete]);
    var _d = (0, react_dropzone_1.useDropzone)({
        onDrop: onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    }), getRootProps = _d.getRootProps, getInputProps = _d.getInputProps, isDragActive = _d.isDragActive;
    return (<div className="space-y-4">
      <div {...getRootProps()} className={"border-2 border-dashed p-6 text-center cursor-pointer transition-colors\n          ".concat(isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400')}>
        <input {...getInputProps()}/>
        {isProcessing ? (<div className="text-gray-600">
            <svg className="animate-spin h-6 w-6 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing receipt...
          </div>) : (<div>
            <p className="text-gray-600">
              {isDragActive ? 'Drop the receipt here...' : 'Drag and drop receipt, or click to select file'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPEG, PNG
            </p>
          </div>)}
      </div>

      {previewUrl && !isProcessing && (<div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Receipt Preview:</p>
          <img src={previewUrl} alt="Receipt preview" className="max-h-48 mx-auto rounded-lg shadow-sm"/>
        </div>)}
    </div>);
};
exports.ReceiptDropzone = ReceiptDropzone;
