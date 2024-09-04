import React, { useRef, useState } from "react";
import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { FaCamera, FaStop, FaImage, FaSyncAlt } from "react-icons/fa";

const CameraCapture = ({ onCapture }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const toast = useToast();

  // Helper to detect iOS devices
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const startCamera = () => {
    if (isIOS) {
      toast({
        title: "Use the photo upload option",
        description: "Camera live feed not supported directly on iOS devices.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const constraints = {
      video: {
        facingMode: useFrontCamera ? "user" : { exact: "environment" },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
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
      .catch((err) => {
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

  return (
    <Box textAlign="center" p={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify="center"
        mt={4}
        w="100%"
      >
        {!isCameraOn ? (
          <Button
            bg="#439775"
            color="white"
            _hover={{ bg: "#414770" }}
            onClick={startCamera}
            w={{ base: "100%", md: "50%" }}
            leftIcon={<FaCamera />}
          >
            Start Camera
          </Button>
        ) : (
          <>
            <Button
              bg="#5D5F71"
              color="white"
              _hover={{ bg: "#4b4d5b" }}
              onClick={stopCamera}
              w={{ base: "100%", md: "33%" }}
              leftIcon={<FaStop />}
            >
              Stop Camera
            </Button>
            <Button
              bg="#5FBB97"
              color="white"
              _hover={{ bg: "#4aa67d" }}
              onClick={captureImage}
              w={{ base: "100%", md: "33%" }}
              leftIcon={<FaImage />}
            >
              Capture Image
            </Button>
            <Button
              bg="#93B7BE"
              color="white"
              _hover={{ bg: "#7a9ea5" }}
              onClick={toggleCamera}
              w={{ base: "100%", md: "33%" }}
              leftIcon={<FaSyncAlt />}
            >
              Flip Camera
            </Button>
          </>
        )}
      </Stack>
      {isCameraOn && (
        <Box
          mt={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          maxWidth="100%"
        >
          <video
            ref={videoRef}
            style={{ width: "100%", maxHeight: "500px" }}
            autoPlay
          ></video>
        </Box>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </Box>
  );
};

export default CameraCapture;
