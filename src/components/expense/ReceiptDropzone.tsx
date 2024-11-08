import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { extractTextFromImage } from '../../services/ocrService';

interface ReceiptDropzoneProps {
  onExtractComplete: (text: string) => void;
}

export const ReceiptDropzone: React.FC<ReceiptDropzoneProps> = ({ onExtractComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Process OCR
      setIsProcessing(true);
      const extractedText = await extractTextFromImage(file);
      onExtractComplete(extractedText);
    } catch (error) {
      console.error('Failed to process receipt:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onExtractComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <div className="text-gray-600">
            <svg className="animate-spin h-6 w-6 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing receipt...
          </div>
        ) : (
          <div>
            <p className="text-gray-600">
              {isDragActive ? 'Drop the receipt here...' : 'Drag and drop receipt, or click to select file'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPEG, PNG
            </p>
          </div>
        )}
      </div>

      {previewUrl && !isProcessing && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Receipt Preview:</p>
          <img
            src={previewUrl}
            alt="Receipt preview"
            className="max-h-48 mx-auto rounded-lg shadow-sm"
          />
        </div>
      )}
    </div>
  );
};