// AppBar.js
import React from 'react';
import { Box, Container, Flex, Heading, Button } from '@chakra-ui/react';

const AppBar = () => {
  return (
    <Box 
      bg="gray" 
      color="white" 
      p={4} 
      position="sticky" 
      top={0} 
      width="100%" 
      zIndex={1} 
      boxShadow="md" // Optional: Adds shadow to make the navbar stand out
    >
      <Container maxW="container.md" centerContent>
        <Flex align="center" justify="space-between" width="100%">
          <Heading as="h1" size="lg">Harmful Ingredient Detector</Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default AppBar;
