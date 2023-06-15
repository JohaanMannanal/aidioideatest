import React from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const { course } = props;

  return (
    <div className="CourseCard">
      <div
        className="card"
        style={{ backgroundColor: "#272727", color: "white" }}
      >
        <div className="card-header">
          <h5 className="card-title">{course.name}</h5>
        </div>
        <div className="card-body">
          <p className="card-subtitle">{course.courseCode}</p>
        </div>
        <div className="card-footer">
          <Link to={`/course/${parseInt(course.id)}`} className="btn btn-link">
            View
          </Link>
          {/* <button className="btn btn-link">Open in Canvas</button> */}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
