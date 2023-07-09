import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignmentView = (props) => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState({});
  const [course, setCourse] = useState({ name: "Loading Course Name" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.user.banned) {
          props.history.push("/auth/banned");
        }

        const courseResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${props.match.params.courseID}`,
          {
            auth: {
              username: props.user.email,
              password: props.user.password,
            },
          }
        );
        console.log("Course Response:", courseResponse.data.data);
        setCourse(courseResponse.data.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get(
          `https://canvasapi.toddr.org/api/assignments/${props.match.params.courseID}/${props.match.params.assignmentID}`,
          {
            auth: {
              username: props.user.email,
              password: props.user.password,
            },
          }
        );
        console.log("Response:", response.data.data);
        setAssignment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    props.user,
    props.history,
    props.match.params.courseID,
    props.match.params.assignmentID,
  ]);

  return (
    <div>
      {!loading ? (
        <div>
          <div style={{ paddingBottom: "1rem" }}>
            <h1>{assignment.name}</h1>
          </div>
          <div style={{ margin: "auto" }}>
            {assignment.due_at && <p>Due: {assignment.due_at}</p>}
            <p>Points: {assignment.points_possible}</p>
          </div>
          <div style={{ padding: "0.5rem" }}>
            <p dangerouslySetInnerHTML={{ __html: assignment.description }} />
          </div>
        </div>
      ) : (
        <div className="loading">
          <div>
            <v-progress-circular
              size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentView;
