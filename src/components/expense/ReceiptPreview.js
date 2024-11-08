"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptPreview = void 0;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/24/outline");
var ReceiptPreview = function (_a) {
    var imageUrl = _a.imageUrl;
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, react_1.useState)(1), scale = _c[0], setScale = _c[1];
    var handleZoomIn = function () {
        setScale(function (prev) { return Math.min(prev + 0.5, 3); });
    };
    var handleZoomOut = function () {
        setScale(function (prev) { return Math.max(prev - 0.5, 0.5); });
    };
    return (<>
      <div className="mt-4 relative group">
        <img src={imageUrl} alt="Receipt preview" className="max-h-48 mx-auto rounded-lg shadow-md cursor-pointer transition-opacity group-hover:opacity-95" onClick={function () { return setIsOpen(true); }}/>
        <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" onClick={function () { return setIsOpen(true); }}>
          <outline_1.MagnifyingGlassIcon className="h-5 w-5 text-gray-600"/>
        </button>
      </div>

      <react_2.Dialog open={isOpen} onClose={function () {
            setIsOpen(false);
            setScale(1);
        }} className="relative z-50">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true"/>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <react_2.Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                <button onClick={handleZoomIn} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">
                  Zoom In (+)
                </button>
                <button onClick={handleZoomOut} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">
                  Zoom Out (-)
                </button>
                <span className="text-sm text-gray-500">
                  {Math.round(scale * 100)}%
                </span>
              </div>
              <button onClick={function () {
            setIsOpen(false);
            setScale(1);
        }} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="overflow-auto max-h-[80vh]">
              <div className="flex items-center justify-center min-h-[400px]">
                <img src={imageUrl} alt="Receipt full view" style={{
            transform: "scale(".concat(scale, ")"),
            transition: 'transform 0.2s ease-in-out'
        }} className="max-w-full object-contain"/>
              </div>
            </div>
          </react_2.Dialog.Panel>
        </div>
      </react_2.Dialog>
    </>);
};
exports.ReceiptPreview = ReceiptPreview;
