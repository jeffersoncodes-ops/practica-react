import React from "react";
import "../css/Modal.css";

function Modal({ onAdd, onClose }) {
  const [taskText, setTaskText] = React.useState("");

  const handleAdd = () => {
    if (taskText !== "") {
      onAdd(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="Modal-background">
      <div className="Modal-content">
        <input
          placeholder="Nueva tarea..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <div className="Modal-botones">
          <button onClick={handleAdd}>Agregar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export { Modal };
