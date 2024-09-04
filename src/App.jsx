import React, { useState } from 'react';
import FileUpload from './FileUpload';
import CameraCapture from './CameraCapture';
import { useOCR } from './useOCR';
import { createClient } from '@supabase/supabase-js';
import AppBar from './AppBar';
import { Box, Container, VStack, Text, Heading, Spinner } from '@chakra-ui/react';
import SafetyAlert from './SafetyAlert';
import { isMobile } from 'react-device-detect';

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
      return { hasHarmfulIngredients: false, harmfulWords: [] };
    }

    const harmfulWords = ingredients.map(ingredient => ingredient.name);
    const hasHarmfulIngredients = harmfulWords.length > 0;

    return { hasHarmfulIngredients, harmfulWords };
  } catch (error) {
    console.error('Error checking harmful ingredients:', error);
    return { hasHarmfulIngredients: false, harmfulWords: [] };
  }
};

// Function to detect mobile devices
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase()));
};

function App() {
  const [loading, setLoading] = useState(false);
  const [isSafe, setIsSafe] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [harmfulWords, setHarmfulWords] = useState([]);

  const handleCapture = async (file) => {
    setLoading(true);

    const extractedText = await useOCR(file);
    setExtractedText(extractedText);

    const { hasHarmfulIngredients, harmfulWords } = await checkHarmfulIngredients(extractedText);
    setHarmfulWords(harmfulWords);
    setIsSafe(!hasHarmfulIngredients);

    setLoading(false);
  };

  const renderHighlightedText = (text, harmfulWords) => {
    const words = text.split(/\s+/);
    return words.map((word, index) => (
      <Text
        as="span"
        key={index}
        color={harmfulWords.includes(word) ? 'red.500' : 'inherit'}
        fontWeight={harmfulWords.includes(word) ? 'bold' : 'normal'}
      >
        {word}{' '}
      </Text>
    ));
  };

  return (
    <>
      <AppBar />
      <Box bg="gray.800" px={4} py={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
        <Container maxW="container.md" centerContent>
          <VStack spacing="5%" width="100%">
            <Heading as="h1" size="xl" color="#77878B" textAlign="center">
              Welcome to Cloggers
            </Heading>
            <Text color="white" textAlign="center" fontSize={['sm', 'md', 'lg']}>
              Cloggers is your go-to tool for identifying potentially harmful ingredients in your skincare products. 
              Simply upload a photo or use your camera to scan product labels, and our app will highlight any ingredients 
              known to clog pores or cause acne. Stay informed and keep your skin clear with Cloggers!
            </Text>
            <FileUpload onDrop={handleCapture} />
            {!isMobile && <CameraCapture onCapture={handleCapture} />}
            {loading && <Spinner color="white" />}
            {extractedText && (
              <Box bg="#25283D" p="5%" borderRadius="md" width="100%" textAlign="center" color="#77878B">
                <Text fontSize={['sm', 'md', 'lg']} mb="2%">
                  Scanned:
                </Text>
                <Text fontSize={['sm', 'md']}>
                  {renderHighlightedText(extractedText, harmfulWords)}
                </Text>
              </Box>
            )}
            {isSafe !== null && !loading && <SafetyAlert isSafe={isSafe} />}
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default App;
