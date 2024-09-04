import React, { useRef, useState } from 'react';
import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { FaCamera, FaStop, FaImage, FaSyncAlt } from 'react-icons/fa';

const CameraCapture = ({ onCapture }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true); // State to track which camera to use
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const toast = useToast();

  // Start camera with proper constraints based on front or back camera
  const startCamera = () => {
    const constraints = {
      video: {
        facingMode: useFrontCamera ? 'user' : { exact: 'environment' }, // 'user' for front, 'environment' for back
      },
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
        toast({
          title: "Camera started",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
        toast({
          title: "Error accessing camera",
          description: "Please check your camera permissions",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  // Stop the camera and turn off the video stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    toast({
      title: "Camera stopped",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Capture image and send it back as a blob
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (videoRef.current && canvas) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          onCapture(blob);
          stopCamera();  // Automatically stop the camera after capturing
          toast({
            title: "Image captured",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      }, 'image/jpeg');
    }
  };

  // Toggle between front and back cameras
  const toggleCamera = () => {
    stopCamera();
    setUseFrontCamera(prev => !prev);
    startCamera();
  };

  return (
    <Box textAlign="center" p={4}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center" mt={4} w="100%">
        {!isCameraOn ? (
          <Button 
            bg="#439775"  
            color="white"
            _hover={{ bg: "#414770" }} 
            onClick={startCamera} 
            w={{ base: '100%', md: '50%' }}
            leftIcon={<FaCamera />}
          >
            Start Camera
          </Button>
        ) : (
          <>
            <Button 
              bg="#5D5F71"  // Hex code for grayish red
              color="white"
              _hover={{ bg: "#4b4d5b" }}  // Slightly darker grayish red on hover
              onClick={stopCamera} 
              w={{ base: '100%', md: '33%' }}
              leftIcon={<FaStop />}
            >
              Stop Camera
            </Button>
            <Button 
              bg="#5FBB97"  // Hex code for teal
              color="white"
              _hover={{ bg: "#4aa67d" }}  // Slightly darker teal on hover
              onClick={captureImage} 
              w={{ base: '100%', md: '33%' }}
              leftIcon={<FaImage />}
            >
              Capture Image
            </Button>
            <Button 
              bg="#93B7BE"  // Hex code for light blue-gray
              color="white"
              _hover={{ bg: "#7a9ea5" }}  // Slightly darker light blue-gray on hover
              onClick={toggleCamera} 
              w={{ base: '100%', md: '33%' }}
              leftIcon={<FaSyncAlt />}
            >
              Flip Camera
            </Button>
          </>
        )}
      </Stack>
      <Box mt={4} borderWidth="1px" borderRadius="lg" overflow="hidden" maxWidth="100%">
        <video ref={videoRef} style={{ width: '100%', maxHeight: '500px' }}></video>
      </Box>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </Box>
  );
};

export default CameraCapture;
