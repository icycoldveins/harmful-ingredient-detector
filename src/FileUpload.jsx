import React, { useState } from 'react';
import { Box, Text, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { HiUpload } from 'react-icons/hi';

const FileUpload = ({ onDrop }) => {
  const [filePickerActive, setFilePickerActive] = useState(false);
  const toast = useToast();

  const handleFileChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      onDrop(selectedFile);
    } else {
      toast({
        title: 'Invalid file type.',
        description: 'Only image files are accepted.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setFilePickerActive(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, isFocused } = useDropzone({
    onDrop: handleFileChange,
    accept: 'image/*',
    multiple: false,
    onClick: (event) => {
      if (filePickerActive) {
        event.preventDefault();
      } else {
        setFilePickerActive(true);
      }
    },
  });

  const iconColor = isDragActive ? "green.500" : isDragReject ? "red.500" : isFocused ? "blue.500" : "gray.400";
  const borderColor = isDragActive || isDragReject ? iconColor : "gray.200";

  return (
    <Box
      {...getRootProps()}
      borderWidth="2px"
      borderColor={borderColor}
      borderStyle="dashed"
      p="6"
      cursor="pointer"
      transition="background-color 0.3s ease"
      _hover={{ bg: "gray.100" }}
      width={{ base: "90%", sm: "80%", md: "70%", lg: "500px" }} // Dynamic widths based on breakpoints
      height={{ base: "200px", md: "300px" }} // Dynamic heights based on breakpoints
      borderRadius="md"
      mx="auto"
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <input {...getInputProps()} />
      <Box mb="4">
        <HiUpload color={iconColor} size="40px" />
      </Box>
      <Text fontSize="lg" color="#77878B" fontWeight="bold">
        {isDragActive ? "Drop it here!" : "Drag & Drop or Click to Select"}
      </Text>
      <Text fontSize="sm" color="#77878B" mt="2">
        Only image files are accepted
      </Text>
    </Box>
  );
};

export default FileUpload;
