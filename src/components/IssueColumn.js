import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import IssueCard from "./IssueCard";

const IssueColumn = ({
  column,
  issues,
  index,
  currentColumns,
  setCurrentColumns,
}) => {
  const [dragOver, setDragOver] = useState("");

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.setData("columnIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleOnDrop = (e) => {
    setDragOver(false);
    const dragIndex = parseInt(e.dataTransfer.getData("columnIndex"));
    if (dragIndex !== index) {
      const newColumns = [...currentColumns];
      const [draggedColumn] = newColumns.splice(dragIndex, 1);
      newColumns.splice(index, 0, draggedColumn);
      setCurrentColumns(newColumns);
    }
  };

  return (
    <div className="col">
      <Card
        border={dragOver ? "danger" : "primary"}
        style={{ width: "95%", height: "100%" }}
        key={column.id}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        className={dragOver ? "drag-over" : ""}
      >
        <Card.Header>{column.title}</Card.Header>
        <Card.Body>
          <IssueCard issues={issues} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default IssueColumn;
