import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { formatDistanceToNow } from "date-fns";

const IssueCard = ({ issues }) => {
  const [orderedIssues, setOrderedIssues] = useState([]);

  useEffect(() => {
    setOrderedIssues(issues);
  }, [issues]);

  const [dragOver, setDragOver] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.setData("columnIndex", index.toString());
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

  const handleOnDrop = (e, index) => {
    setDragOver(false);
    const dragIndex = parseInt(e.dataTransfer.getData("columnIndex"));
    if (dragIndex !== index) {
      const newOrder = [...orderedIssues];
      const [draggedIssue] = newOrder.splice(dragIndex, 1);
      newOrder.splice(index, 0, draggedIssue);
      setOrderedIssues(newOrder);
    }
  };

  return (
    <div className={`card ${dragOver ? "drag-over" : ""}`}>
      {orderedIssues.map((issue, index) => (
        <Card
          key={index}
          text="white"
          bg="primary"
          className="mb-2"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleOnDrop(e, index)}
        >
          <Card.Body>
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>
              #{issue.number} opened{" "}
              {formatDistanceToNow(new Date(issue.created_at), {
                addSuffix: true,
              })}
            </Card.Text>
            <Card.Text>
              {issue.user.login} |{" "}
              {issue.comments === 1
                ? "1 comment"
                : `${issue.comments} comments`}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default IssueCard;
