import React from 'react';
import { Box, Container, Flex, Image, useBreakpointValue } from '@chakra-ui/react';

const AppBar = () => {
  // Use responsive values for padding and logo size
  const logoSize = useBreakpointValue({ base: '50px', md: '80px', lg: '100px' });
  const padding = useBreakpointValue({ base: 2, md: 4, lg: 6 });

  return (
    <Box 
      color="white" 
      bg="#3A4454" 
      p={padding}  // Responsive padding
      position="sticky" 
      top={0} 
      width="100%" 
      zIndex={1} 
      boxShadow="md"
    >
      <Container maxW="container.md">
        <Flex align="center" justify="flex-start" width="100%">
          <Image 
            src="/logo2.png" // Ensure this path matches the location and name of your logo file in the public folder
            alt="Cloggers Logo"
            boxSize={logoSize}  // Responsive logo size
            mr={4}
          />
          {/* You can add more elements like text or buttons here */}
        </Flex>
      </Container>
    </Box>
  );
};

export default AppBar;
