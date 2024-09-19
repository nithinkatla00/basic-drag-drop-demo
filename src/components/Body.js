import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Body = ({ children }) => {
  const theme = useSelector((state) => state.dashboard.theme);

  return (
    <Box
      p={4}
      bg={theme.mode === "light" ? "white" : "gray.800"}
      width="100%"
      height="100px"
      overflowY="auto"
      boxShadow="sm"
    >
      {children || ""}
    </Box>
  );
};

export default Body;
