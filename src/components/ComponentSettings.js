import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateComponents } from "../dashboardSlice";

const ComponentSettings = ({ componentIndex, componentData }) => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.dashboard.components);
  const theme = useSelector((state) => state.dashboard.theme);

  const [localStyles, setLocalStyles] = useState({
    ...componentData.style,
    color: componentData.style.color || theme.colors.primary
  });

  useEffect(() => {
    setLocalStyles({
      ...componentData.style,
      color: componentData.style.color || theme.colors.primary
    });
  }, [componentData, theme.colors.primary]);

  const handleStyleChange = (key, value) => {
    const updatedStyles = { ...localStyles, [key]: value };
    setLocalStyles(updatedStyles);

    dispatch(
      updateComponents(
        components.map((comp, idx) =>
          idx === componentIndex ? { ...comp, style: updatedStyles } : comp
        )
      )
    );
  };

  return (
    <Box>
      {["Navbar", "Footer", "Body"].includes(componentData.type) && (
        <>
          <FormControl mb={4}>
            <FormLabel>Text</FormLabel>
            <Input
              value={componentData.contentEditableText || ""}
              onChange={(e) =>
                dispatch(
                  updateComponents(
                    components.map((comp, idx) =>
                      idx === componentIndex
                        ? { ...comp, contentEditableText: e.target.value }
                        : comp
                    )
                  )
                )
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Font Size</FormLabel>
            <Slider
              value={parseInt(localStyles.fontSize || "16")}
              min={10}
              max={36}
              step={1}
              onChange={(value) => handleStyleChange("fontSize", `${value}px`)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Font Weight</FormLabel>
            <Select
              value={localStyles.fontWeight || "normal"}
              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
              <option value="lighter">Lighter</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Font Color</FormLabel>
            <input
              type="color"
              value={localStyles.color}
              onChange={(e) => handleStyleChange("color", e.target.value)}
            />
          </FormControl>
        </>
      )}

      {/* Specific styling options for all components */}
      <>
        {/* Width Slider */}
        {"width" in localStyles && (
          <FormControl mb={4}>
            <FormLabel>Width</FormLabel>
            <Slider
              value={parseInt(localStyles.width || "100")}
              min={50}
              max={500}
              step={1}
              onChange={(value) => handleStyleChange("width", `${value}px`)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        )}

        {/* Height Slider */}
        {"height" in localStyles && (
          <FormControl mb={4}>
            <FormLabel>Height</FormLabel>
            <Slider
              value={parseInt(localStyles.height || "100")}
              min={50}
              max={500}
              step={1}
              onChange={(value) => handleStyleChange("height", `${value}px`)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        )}
      </>
    </Box>
  );
};

export default ComponentSettings;
