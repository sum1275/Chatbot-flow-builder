import { memo } from "react";
import { Handle, Position } from "reactflow";

import "./MessageNode.css";

// eslint-disable-next-line react/prop-types
export default memo(function MessageNode({ data, isConnectable }) {
  return (
    <div className="node-wrapper">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div id={`header-${data.id}`} className="header">
        Send Message
      </div>
      <div id={`body-${data.id}`} className="content">
        {data.message}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </div>
  );
});

