import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
 
import './App.css';
import 'reactflow/dist/style.css';

import FunctionalityPanel from './components/FunctionalityPanel';
import MessageNode from './components/MessageNode';
import NodePanel from './components/NodePanel';
 
const initialNodes = [];
const initialEdges = [];

const flowKey = 'node-message-flow';

const nodeTypes = {
  messageNode: MessageNode,
};

let id = 0;
const getId = () => `node-${id++}`;
 
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [editing, setEditing] = useState(null)
  const [nodeMessage, setNodeMessage] = useState(null);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.id === editing.data.id) {
          node.data = {
            ...node.data,
            message: nodeMessage,
          };
        }

        return node;
      })
    );
  }, [nodeMessage, setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const eventDataString = event.dataTransfer.getData('application/reactflow');
      if (typeof eventDataString === 'undefined' || !eventDataString) return;

      const eventData = JSON.parse(eventDataString);
      let label = '';
      let nodeType = '';
      let message = '';
      switch(true) {
        case eventData.type === 'message':
          label = 'Send Message';
          nodeType = 'messageNode';
          message = eventData.message;
          break;
      }
      console.log(eventData, label, nodeType);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: { id, label, message },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, reactFlowInstance],
  );

  const onNodeClick = useCallback((event) => {
    event.preventDefault();
    const namedId = event.target.id;
    const id = namedId.replace('body-', '').replace('header-', '');

    const editing = nodes.filter((nds) => {
      return nds.data.id === Number(id);
    })[0];
    setEditing(editing);
  }, [nodes]);

  return (
    <ReactFlowProvider>
      <div className="workspace">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          minZoom={1}
          maxZoom={3}
        >
          <Background color="#333" variant="dots" gap="14" />
          <Controls />
        </ReactFlow>
      </div>
      <FunctionalityPanel reactFlowInstance={reactFlowInstance}></FunctionalityPanel>
      <NodePanel editing={editing} setEditing={setEditing} setNodeMessage={setNodeMessage}></NodePanel>
    </ReactFlowProvider>
  );
}

export default App
