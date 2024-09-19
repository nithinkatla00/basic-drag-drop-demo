import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Footer = ({ children }) => {
  const theme = useSelector((state) => state.dashboard.theme);

  return (
    <Box
      as="footer"
      bg={theme.mode === "light" ? "white" : "gray.800"}
      p={2}
      width="100%"
      textAlign="center"
      boxShadow="md"
    >
      {children || ""}
    </Box>
  );
};

export default Footer;
