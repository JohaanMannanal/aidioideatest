import React from "react";
import { Link } from "react-router-dom";

function AssignmentCard(props) {
  const { assignment } = props;

  return (
    <div className="AssignmentCard">
      <div
        className="card"
        style={{ backgroundColor: "#272727", color: "white" }}
      >
        <div className="card-header">
          <div className="row no-gutters">
            <div className="col-12 col-sm-8">
              <p>
                <i className="mdi mdi-note-edit-outline iconButtonPadding"></i>
                {assignment.name}
              </p>
            </div>
            <div className="col-12 col-sm-4" style={{ margin: "auto" }}>
              <p style={{ fontSize: "16px" }}>
                Points: {assignment.points_possible} | Due:{" "}
                {assignment.due_at === null ? "None" : assignment.due_at}
              </p>
            </div>
          </div>
        </div>
        <div className="card-body assignmentContent">
          <p dangerouslySetInnerHTML={{ __html: assignment.description }}></p>
        </div>
        <div className="card-footer">
          <Link
            to={`/assignment/${parseInt(assignment.course.id)}/${parseInt(
              assignment.id
            )}`}
            className="btn btn-link"
          >
            View
          </Link>
          {/* <button className="btn btn-link">Open in Canvas</button> */}
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard;
