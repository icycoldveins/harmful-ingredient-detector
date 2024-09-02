import React, { useState } from 'react';
import FileUpload from './FileUpload';
import CameraCapture from './CameraCapture';
import { useOCR } from './useOCR';
import { createClient } from '@supabase/supabase-js';
import AppBar from './AppBar';
import { Box, Container, VStack } from '@chakra-ui/react';
import SafetyAlert from './SafetyAlert';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to check harmful ingredients in text
const checkHarmfulIngredients = async (text) => {
  try {
    const { data: ingredients, error } = await supabase
      .from('harmful_ingredients')
      .select('name')
      .in('name', text.split(/\s+/));

    if (error) {
      console.error('Error querying Supabase:', error);
      return false;
    }

    return ingredients.length > 0;
  } catch (error) {
    console.error('Error checking harmful ingredients:', error);
    return false;
  }
};

// Main App component
function App() {
  const [loading, setLoading] = useState(false);
  const [isSafe, setIsSafe] = useState(null);

  // Handle file capture from either upload or camera
  const handleCapture = async (file) => {
    try {
      setLoading(true);

      const extractedText = await useOCR(file);
      const hasHarmfulIngredients = await checkHarmfulIngredients(extractedText);

      setIsSafe(!hasHarmfulIngredients);
    } catch (error) {
      console.error('Error during OCR or Supabase query:', error);
      setIsSafe(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar />
      <Box minHeight="100vh" bg="gray.800">
        <Container maxW="container.md" centerContent pt={12}>
          <VStack spacing={8} p={4} width="100%">
            <FileUpload onDrop={handleCapture} />
            <CameraCapture onCapture={handleCapture} />
            {isSafe !== null && <SafetyAlert isSafe={isSafe} />}
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default App;
