import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ExtractedReceiptData } from '../../types/receipt';
import { useReceiptProcessor } from '../../hooks/useReceiptProcessor';
import { DropZone } from './DropZone';
import { ReceiptPreview } from './ReceiptPreview';
import { ErrorMessage } from '../shared/ErrorMessage';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface ReceiptUploaderProps {
  onDataExtracted: (data: Partial<ExtractedReceiptData>) => void;
  onError: (error: string) => void;
}

export const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({ 
  onDataExtracted, 
  onError 
}) => {
  const { status, processReceipt } = useReceiptProcessor(onDataExtracted, onError);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      const error = 'Please upload an image file (JPG, JPEG, or PNG).';
      onError(error);
      return;
    }

    await processReceipt(file);
  }, [processReceipt, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    disabled: status.isProcessing
  });

  return (
    <div className="space-y-4">
      <DropZone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isProcessing={status.isProcessing}
      />

      {status.isProcessing && <LoadingSpinner />}
      
      {status.preview && !status.error && (
        <ReceiptPreview imageUrl={status.preview} />
      )}

      {status.error && (
        <ErrorMessage message={status.error} />
      )}
    </div>
  );
};