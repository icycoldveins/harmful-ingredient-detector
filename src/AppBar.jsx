import React from 'react';
import { Box, Container, Flex, Image, Text } from '@chakra-ui/react';

const AppBar = () => {
  return (
    <Box 
      color="white" 
      bg="#3A4454" 
      p={4} 
      position="sticky" 
      top={0} 
      width="100%" 
      zIndex={1} 
      boxShadow="md"
    >
      <Container maxW="container.md">
        <Flex align="center" justify="flex-start" width="100%">
          <Flex align="center" mr={4}>
            <Image 
              src="/logo2.png" // Ensure this path matches the location and name of your logo file in the public folder
              alt="Cloggers Logo"
              boxSize="100px" // Adjust the size as needed
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default AppBar;
