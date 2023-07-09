import React from 'react';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="AssignmentCard">
      <div style={{ backgroundColor: "#272727", color: "white" }}>
        <h3>
          <i className="iconButtonPadding mdi mdi-note-edit-outline"></i>
          {assignment.name}
        </h3>
      </div>

      <div>
        <p>
          Points: {assignment.points_possible} | Due: {assignment.due_at == null ? "None" : assignment.due_at}
        </p>
      </div>

      <div className="assignmentContent" dangerouslySetInnerHTML={{ __html: assignment.description }}></div>

      <div>
        <button onClick={() => { window.location.href = `/assignment/${parseInt(assignment.course.id)}/${parseInt(assignment.id)}` }}>
          View
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
