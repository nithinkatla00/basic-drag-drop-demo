import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Navbar = ({ children }) => {
  const theme = useSelector((state) => state.dashboard.theme);

  return (
    <Box
      as="nav"
      bg={theme.mode === "light" ? "white" : "gray.800"}
      p={4}
      width="100%"
      height="80px"
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {children || ""}
    </Box>
  );
};

export default Navbar;
