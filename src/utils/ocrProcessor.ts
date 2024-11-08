import { createWorker } from 'tesseract.js';

interface ExtractedData {
  date?: string;
  amount?: number;
  merchant?: string;
}

export async function processReceiptImage(imageFile: File): Promise<ExtractedData> {
  const worker = await createWorker();
  
  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const imageUrl = URL.createObjectURL(imageFile);
    const { data: { text } } = await worker.recognize(imageUrl);
    
    URL.revokeObjectURL(imageUrl);
    
    // Extract date (multiple formats)
    const datePatterns = [
      /\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b/, // DD/MM/YYYY, MM/DD/YYYY
      /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/i, // Month DD, YYYY
      /\b\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b/i, // DD Month YYYY
    ];

    let dateMatch = null;
    for (const pattern of datePatterns) {
      dateMatch = text.match(pattern);
      if (dateMatch) break;
    }
    
    // Extract amount (PHP currency)
    const amountPatterns = [
      /(?:PHP|₱)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i, // PHP/₱ symbol followed by amount
      /(?:TOTAL|AMOUNT|GRAND TOTAL)[:]*\s*(?:PHP|₱)?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i, // Total/Amount labels
      /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:PHP|₱)/i, // Amount followed by PHP/₱ symbol
    ];

    let amountMatch = null;
    for (const pattern of amountPatterns) {
      amountMatch = text.match(pattern);
      if (amountMatch) break;
    }
    
    // Extract merchant name (usually in the first few lines)
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    // Look for merchant name in first 3 lines, excluding common header text
    const merchantLine = lines.slice(0, 3).find(line => 
      line.length > 3 && 
      !line.match(/receipt|invoice|tel|address|store|no\.|branch/i) &&
      !line.match(/^\d+$/) // Exclude lines with only numbers
    );

    // Format date if found
    let formattedDate = '';
    if (dateMatch) {
      const dateStr = dateMatch[0];
      try {
        const date = new Date(dateStr);
        formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      } catch {
        formattedDate = dateStr;
      }
    }

    // Format amount if found
    let formattedAmount: number | undefined;
    if (amountMatch) {
      const amountStr = amountMatch[1].replace(/,/g, '');
      formattedAmount = parseFloat(amountStr);
    }

    console.log('Extracted Text:', text); // For debugging
    console.log('Extracted Data:', {
      date: formattedDate,
      amount: formattedAmount,
      merchant: merchantLine?.trim()
    });

    return {
      date: formattedDate || undefined,
      amount: formattedAmount,
      merchant: merchantLine?.trim(),
    };
  } finally {
    await worker.terminate();
  }
}