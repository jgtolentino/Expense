export interface ExtractedReceiptData {
  date: string;
  amount: string;
  merchant: string;
  currency?: string;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  error: string | null;
  preview: string | null;
}