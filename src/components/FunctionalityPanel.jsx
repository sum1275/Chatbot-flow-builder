import { useCallback, useState } from "react";
import "./FunctionalityPanel.css";

const flowKey = "node-message-flow";

function FunctionalityPanel({ reactFlowInstance }) {
  const [issueSaving, setIssueSaving] = useState(false);

  const areNodesValid = (flow) => {
    if (flow.nodes.length <= 1) return true;

    const nodes = flow.nodes.map((node) => ({ id: node.id, used: false }));
    flow.edges.forEach((edge) => {
      nodes.forEach((node) => {
        if (node.id === edge.source) {
          node.used = true;
        }
        if (node.id === edge.target) {
          node.used = true;
        }
      });
    });
    const valid = nodes.every((node) => node.used === true);
    return valid;
  };

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      // eslint-disable-next-line react/prop-types
      const flow = reactFlowInstance.toObject();
      if (areNodesValid(flow) === true) {
        setIssueSaving(false);
        localStorage.setItem(flowKey, JSON.stringify(flow));
      } else {
        setIssueSaving(true);
      }
    }
  }, [reactFlowInstance]);

  return (
    <div className="fixed top-0 left-0 w-full text-right bg-white h-16 p-1">
      {issueSaving ? (
        <span className="bg-red-600 p-2 text-white mr-72">
          Cannot Save Flow
        </span>
      ) : undefined}
      <button
        onClick={onSave}
        className="p-2 m-1 border-2 border-cyan-300 mr-8 rounded-xl"
      >
        Save Changes
      </button>
    </div>
  );
}

export default FunctionalityPanel;
