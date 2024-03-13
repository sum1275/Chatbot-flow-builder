import "./NodePanel.css";
import { ChatCircleDots, ArrowLeft } from "@phosphor-icons/react";
// eslint-disable-next-line react/prop-types
function NodePanel({ editing, setEditing, setNodeMessage }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const closeEditor = () => {
    setEditing(null);
  };

  const messageObject = JSON.stringify({
    type: "message",
    message: "Sample Text",
  });
  return (
    <div className="node-panel">
      {editing === null ? (
        <div
          className="type"
          onDragStart={(event) => onDragStart(event, messageObject)}
          draggable
        >
          <div className="message flex flex-col">
            <div className="p-0.5">
              <ChatCircleDots size={32} color="#B0B7D2" />
            </div>
            <div className="p-0.5">
              <h4>Message</h4>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between p-1">
            <div>
              <ArrowLeft
                size={24}
                onClick={closeEditor}
                className="cursor-pointer"
              />
            </div>
            <div>
              <h4>Message</h4>
            </div>{" "}
          </div>
          <div className="shadow-lg h-28 w-60 border-solid border-2 border-slate-400 rounded flex flex-col items-center justify-center">
            <div className="hover cursor-pointer">
              <h4 className="text-1xl font-bold p-2">Text</h4>
            </div>
            <div className="p-1">
              <textarea
                className="mt-1 p-1 border-solid border-2 border-slate-400"
                value={editing.data.message}
                onChange={(evt) => setNodeMessage(evt.target.value)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NodePanel;
