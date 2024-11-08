import React from 'react';
import { DropzoneProps } from 'react-dropzone';

interface CustomDropZoneProps extends Pick<DropzoneProps, 'getRootProps' | 'getInputProps'> {
  isDragActive: boolean;
  isProcessing: boolean;
}

export const DropZone: React.FC<CustomDropZoneProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isProcessing
}) => {
  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      {!isProcessing && (
        <div className="space-y-2">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            stroke="currentColor" 
            fill="none" 
            viewBox="0 0 48 48" 
            aria-hidden="true"
          >
            <path 
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
              strokeWidth={2} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          <div className="text-sm text-gray-600">
            {isDragActive ? (
              <p>Drop the receipt here...</p>
            ) : (
              <p>
                Drag and drop a receipt image, or click to select
                <br />
                <span className="text-xs text-gray-500">Supports JPG, JPEG, PNG</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};