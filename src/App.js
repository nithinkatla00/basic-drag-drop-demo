import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Dashboard />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
