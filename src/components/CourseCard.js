import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="CourseCard">
      <div>
        <h3>{course.name}</h3>
      </div>

      <div>
        <p>{course.courseCode}</p>
      </div>

      <div>
        <button onClick={() => { window.location.href = `/course/${parseInt(course.id)}` }}>
          View
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
