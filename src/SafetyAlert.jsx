import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const SafetyAlert = ({ isSafe }) => {
  return (
    <Alert
      status={isSafe ? 'success' : 'error'}  // 'success' for safe, 'error' for harmful
      bg={isSafe ? '#68D391' : '#F56565'}  // Background color using recognized hex values
      color={isSafe ? '#2C7A7B' : '#9B2C2C'}  // Text color
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} color={isSafe ? '#38A169' : '#E53E3E'} />  {/* Icon color */}
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {isSafe ? "Product is Safe!" : "Harmful Ingredients Detected!"}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {isSafe
          ? "This product contains no harmful ingredients and is safe to use."
          : "This product contains harmful ingredients. Please consider using an alternative."}
      </AlertDescription>
    </Alert>
  );
};

export default SafetyAlert;
