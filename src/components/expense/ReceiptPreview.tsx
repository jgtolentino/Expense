import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ReceiptPreviewProps {
  imageUrl: string;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <>
      <div className="mt-4 relative group">
        <img 
          src={imageUrl} 
          alt="Receipt preview" 
          className="max-h-48 mx-auto rounded-lg shadow-md cursor-pointer transition-opacity group-hover:opacity-95"
          onClick={() => setIsOpen(true)}
        />
        <button
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(true)}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setScale(1);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                <button
                  onClick={handleZoomIn}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Zoom In (+)
                </button>
                <button
                  onClick={handleZoomOut}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Zoom Out (-)
                </button>
                <span className="text-sm text-gray-500">
                  {Math.round(scale * 100)}%
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setScale(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="overflow-auto max-h-[80vh]">
              <div className="flex items-center justify-center min-h-[400px]">
                <img
                  src={imageUrl}
                  alt="Receipt full view"
                  style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  className="max-w-full object-contain"
                />
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};