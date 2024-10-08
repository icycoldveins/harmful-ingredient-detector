import Tesseract from 'tesseract.js';

export const useOCR = async (file) => {
  try {
    const { data: { text } } = await Tesseract.recognize(file, 'eng', {
    });
    
    return text; // Extracted text from the image
  } catch (error) {
    console.error('Error during OCR processing:', error);
    return ''; // Return empty string or handle error appropriately
  }
};
