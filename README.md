# Chatbot flow builder

A Chatbot flow is built by connecting multiple messages together to decide the order of execution. 

![React flow 1](https://github.com/sum1275/Chatbot-flow-builder/assets/59500999/dfbb3d79-3f8f-4210-9900-b4ad9e492e67)

![React flow 2](https://github.com/sum1275/Chatbot-flow-builder/assets/59500999/f0c10275-a16a-4071-81b2-55d8c510268d)

## Overview

This project is focused on building a simple Chatbot Flow Builder using React. The goal is to create a tool that allows users to visually construct the flow of a chatbot by connecting messages together, determining the sequence of interactions. The design aims for extensibility, facilitating the easy addition of new features and node types in the future.

## Features

### Text Node

- **Functionality**: The flow builder currently supports Text Messages as the primary node type. This allows for the creation of basic chatbot dialogue flows.
- **Multiplicity**: Users can add multiple Text Nodes to a single flow.
- **Interaction**: Nodes are added to the flow through a drag-and-drop interface from the Nodes Panel.

### Nodes Panel

- **Purpose**: The Nodes Panel serves as the repository for all types of nodes supported by the Flow Builder.
- **Extensibility**: Although only the Text Message Node is available at present, the panel is designed to accommodate additional node types in future updates.

### Edge

- **Description**: Edges are used to connect two nodes, indicating the flow of conversation from one message to the next.

### Source Handle

- **Functionality**: Represents the starting point of an edge.
- **Constraint**: Each source handle can originate only one edge.

### Target Handle

- **Functionality**: Represents the endpoint of an edge.
- **Flexibility**: A single target handle can have multiple incoming edges.

### Settings Panel

- **Contextual Display**: The Settings Panel appears in place of the Nodes Panel when a node is selected.
- **Features**: It includes a text field for editing the content of the selected Text Node.

### Save Button

- **Purpose**: Allows users to save the current state of the chatbot flow.
- **Validation**: Pressing the save button will trigger an error if the flow includes more than one node and any node (beyond the first) has empty target handles.


- ## Setting up the Frontend in Local Environment

To set up UnstopFrontend locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sum1275/Chatbot-flow-builder.git
2. **Setup and Run**:
   To set up and run the Unicarta project, follow these commands:

   ```bash
   npm install
   npm run dev
