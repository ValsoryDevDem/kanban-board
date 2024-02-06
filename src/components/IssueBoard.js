import React, { useState } from "react";
import IssueColumn from "./IssueColumn";

const IssueBoard = ({ issues }) => {
  const columns = [
    { title: "ToDo", id: 1 },
    { title: "In Progress", id: 2 },
    { title: "Done", id: 3 },
  ];
  const [currentColumns, setCurrentColumns] = useState(columns);

  return (
    <div className="row">
      {currentColumns.map((column, index) => (
        <IssueColumn
          key={column.id}
          column={column}
          issues={
            column.title === "ToDo"
              ? issues.filter(
                  (issue) => issue.state === "open" && !issue.assignee
                )
              : column.title === "In Progress"
              ? issues.filter(
                  (issue) => issue.state === "open" && issue.assignee
                )
              : issues.filter((issue) => issue.state === "closed")
          }
          index={index}
          currentColumns={currentColumns}
          setCurrentColumns={setCurrentColumns}
        />
      ))}
    </div>
  );
};

export default IssueBoard;
