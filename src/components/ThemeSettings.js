import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setThemeMode, setPadding, setMargin } from "../dashboardSlice";

const ThemeSettings = () => {
  const dispatch = useDispatch();

  const handleThemeChange = (event) => {
    dispatch(setThemeMode(event.target.value));
  };

  const handlePaddingChange = (value) => {
    dispatch(setPadding(`${value}px`));
  };

  const handleMarginChange = (value) => {
    dispatch(setMargin(`${value}px`));
  };

  return (
    <Box>
      {/* Theme Mode Selector */}
      <FormControl mb={4}>
        <FormLabel>Theme</FormLabel>
        <Select onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </FormControl>

      {/* Padding Control */}
      <FormControl mb={4}>
        <FormLabel>Padding</FormLabel>
        <Slider
          defaultValue={16}
          min={0}
          max={50}
          step={1}
          onChangeEnd={handlePaddingChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      {/* Margin Control */}
      <FormControl mb={4}>
        <FormLabel>Margin</FormLabel>
        <Slider
          defaultValue={16}
          min={0}
          max={50}
          step={1}
          onChangeEnd={handleMarginChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default ThemeSettings;
