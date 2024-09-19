import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {
    mode: "light",
    colors: {
      primary: "#3182CE",
      secondary: "#2B6CB0"
    },
    padding: "16px",
    margin: "16px",
    font: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "normal"
  },
  components: []
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.theme.mode = action.payload;
    },
    setColors(state, action) {
      state.theme.colors = { ...state.theme.colors, ...action.payload };
    },
    setPadding(state, action) {
      state.theme.padding = action.payload;
    },
    setMargin(state, action) {
      state.theme.margin = action.payload;
    },
    setFont(state, action) {
      state.theme.font = action.payload;
    },
    setFontSize(state, action) {
      state.theme.fontSize = action.payload;
    },
    setFontWeight(state, action) {
      state.theme.fontWeight = action.payload;
    },
    addComponent(state, action) {
      state.components.push(action.payload);
    },
    updateComponents(state, action) {
      state.components = action.payload; // Directly assign new array
    }
  }
});

export const {
  setThemeMode,
  setColors,
  setPadding,
  setMargin,
  setFont,
  setFontSize,
  setFontWeight,
  addComponent,
  updateComponents
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
