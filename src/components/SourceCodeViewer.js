// SourceCodeViewer.js
import React from "react";
import { Box, Code } from "@chakra-ui/react";

const SourceCodeViewer = ({ components }) => {
  return (
    <Box overflowX="auto">
      <Code whiteSpace="pre-wrap">
        {components.map(
          (compData, index) =>
            `<div style=${JSON.stringify(compData.style)}>${
              compData.code
            }</div>\n`
        )}
      </Code>
    </Box>
  );
};

export default SourceCodeViewer;
