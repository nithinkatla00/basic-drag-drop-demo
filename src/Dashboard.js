import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import LeafletMap from "./components/LeafletMap";
import ThemeSettings from "./components/ThemeSettings";
import SourceCodeViewer from "./components/SourceCodeViewer";
import ComponentSettings from "./components/ComponentSettings";
import { addComponent, updateComponents } from "./dashboardSlice";

const componentMap = {
  Navbar: <Navbar />,
  Body: <Body />,
  Footer: <Footer />,
  LeafletMap: <LeafletMap />
};

const componentsList = [
  { id: "Navbar", type: "Navbar", code: "<Navbar />" },
  { id: "Body", type: "Body", code: "<Body />" },
  { id: "Footer", type: "Footer", code: "<Footer />" },
  { id: "LeafletMap", type: "LeafletMap", code: "<LeafletMap />" }
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.dashboard.components);
  const theme = useSelector((state) => state.dashboard.theme);

  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      destination.droppableId === "canvas"
    ) {
      // Reorder components within the canvas
      const reorderedComponents = Array.from(components);
      const [moved] = reorderedComponents.splice(source.index, 1);
      reorderedComponents.splice(destination.index, 0, moved);

      // Update the Redux store with reordered components
      dispatch(updateComponents(reorderedComponents));
    } else if (
      source.droppableId === "components" &&
      destination.droppableId === "canvas"
    ) {
      // Add new component to the canvas
      const newComponentData = componentsList[source.index];

      dispatch(
        addComponent({
          ...newComponentData,
          style: {},
          contentEditableText: newComponentData.type
        })
      );

      setSelectedComponentIndex(components.length);
    }
  };

  const handleComponentClick = (index) => {
    setSelectedComponentIndex(index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        {/* Left Canvas */}
        <Box
          width="70%"
          bg={theme.mode === "light" ? "white" : "gray.800"}
          color={theme.mode === "light" ? "black" : "white"}
          p={theme.padding}
          m={theme.margin}
          minHeight="100vh"
        >
          <Droppable droppableId="canvas">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                minHeight="100%"
                onClick={(e) => e.stopPropagation()} // Prevent click event propagation
              >
                {components.map((componentData, index) => (
                  <Draggable
                    key={`canvas-${index}`}
                    draggableId={`canvas-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        borderWidth={1}
                        p={0} // Remove padding
                        borderRadius="md"
                        onClick={() => handleComponentClick(index)}
                        style={{
                          ...componentData.style,
                          backgroundColor: snapshot.isDragging
                            ? "#e0f7fa"
                            : "white",
                          transition: "background-color 0.2s ease",
                          boxShadow: snapshot.isDragging
                            ? "0px 4px 8px rgba(0,0,0,0.2)"
                            : "none",
                          ...provided.draggableProps.style
                        }}
                      >
                        {React.cloneElement(componentMap[componentData.type], {
                          children: componentData.contentEditableText
                        })}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>

        {/* Right Panel */}
        <Box width="30%" bg="white" p={4}>
          <Tabs>
            <TabList>
              <Tab>Components</Tab>
              <Tab>Editor</Tab>
              <Tab>Theme</Tab>
              <Tab>Source Code</Tab>
            </TabList>

            <TabPanels>
              {/* Components Tab */}
              <TabPanel>
                <Droppable droppableId="components" isDropDisabled={true}>
                  {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                      {componentsList.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              p={2}
                              borderWidth={1}
                              borderRadius="md"
                              mb={2}
                              cursor="pointer"
                            >
                              {item.id}
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </TabPanel>

              {/* Editor Tab */}
              <TabPanel>
                {selectedComponentIndex !== null ? (
                  <ComponentSettings
                    componentIndex={selectedComponentIndex}
                    componentData={components[selectedComponentIndex]}
                  />
                ) : (
                  <Box>Select a component to edit its styles.</Box>
                )}
              </TabPanel>

              {/* Theme Tab */}
              <TabPanel>
                <ThemeSettings />
              </TabPanel>

              {/* Source Code Tab */}
              <TabPanel>
                <SourceCodeViewer components={components} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default Dashboard;
