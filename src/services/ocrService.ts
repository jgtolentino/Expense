import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<string> {
  const worker = await createWorker();
  
  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const imageUrl = URL.createObjectURL(file);
    const { data: { text } } = await worker.recognize(imageUrl);
    
    URL.revokeObjectURL(imageUrl);
    await worker.terminate();
    
    return text;
  } catch (error) {
    console.error('OCR processing failed:', error);
    await worker.terminate();
    throw error;
  }
}