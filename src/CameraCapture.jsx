import React, { useRef, useState } from 'react';
import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { FaCamera, FaStop, FaImage } from 'react-icons/fa';

const CameraCapture = ({ onCapture }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const toast = useToast();

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
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

  return (
    <Box textAlign="center" p={4}>
      <Stack direction="row" spacing={4} justify="center" mt={4} w="100%">
        {!isCameraOn ? (
          <Button 
            bg="#28a745"  // Hex code for green
            color="white"
            _hover={{ bg: "#218838" }}  // Darker green on hover
            onClick={startCamera} 
            w="50%"
            leftIcon={<FaCamera />}
          >
            Start Camera
          </Button>
        ) : (
          <>
            <Button 
              bg="#dc3545"  // Hex code for red
              color="white"
              _hover={{ bg: "#c82333" }}  // Darker red on hover
              onClick={stopCamera} 
              w="50%"
              leftIcon={<FaStop />}
            >
              Stop Camera
            </Button>
            <Button 
              bg="#007bff"  // Hex code for blue
              color="white"
              _hover={{ bg: "#0056b3" }}  // Darker blue on hover
              onClick={captureImage} 
              w="50%"
              leftIcon={<FaImage />}
            >
              Capture Image
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
