import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';
import { ExtractedReceiptData, ProcessingStatus } from '../types/receipt';
import { parseReceiptText } from '../utils/receiptParser';

export const useReceiptProcessor = (
  onDataExtracted: (data: Partial<ExtractedReceiptData>) => void,
  onError: (error: string) => void
) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    error: null,
    preview: null
  });

  const processReceipt = useCallback(async (file: File) => {
    try {
      setStatus(prev => ({ ...prev, isProcessing: true, error: null }));
      
      // Create and display preview
      const previewUrl = URL.createObjectURL(file);
      setStatus(prev => ({ ...prev, preview: previewUrl }));

      // Initialize Tesseract worker with specific configuration
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      // Set specific OCR parameters for better receipt recognition
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,₱$-/:& ',
        preserve_interword_spaces: '1',
      });

      // Perform OCR
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      // Parse the extracted text
      const extractedData = parseReceiptText(text);

      // Validate extracted data
      if (!extractedData.date && !extractedData.amount && !extractedData.merchant) {
        throw new Error('Could not extract receipt details. Please enter them manually.');
      }

      onDataExtracted(extractedData);
      setStatus(prev => ({ ...prev, isProcessing: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 
        'Failed to process receipt. Please try again or enter details manually.';
      setStatus(prev => ({ ...prev, isProcessing: false, error: errorMessage }));
      onError(errorMessage);
    }
  }, [onDataExtracted, onError]);

  return { status, processReceipt };
};