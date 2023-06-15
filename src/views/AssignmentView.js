import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignmentView = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState({});
  const [course, setCourse] = useState({ name: "Loading Course Name" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${routeParams.courseID}`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Response: ", courseResponse.data.data);
        setCourse(courseResponse.data.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const assignmentResponse = await axios.get(
          `https://canvasapi.toddr.org/api/assignments/${routeParams.courseID}/${routeParams.assignmentID}`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Response: ", assignmentResponse.data.data);
        setAssignment(assignmentResponse.data.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user.banned) {
      // Redirect to banned page
      // Replace "/auth/banned" with the appropriate route or redirect logic
      window.location.href = "/auth/banned";
    }
  }, []);

  useEffect(() => {
    const breadcrumbs = [
      {
        text: course.name,
        disabled: false,
        href: `/course/${routeParams.courseID}`,
        exact: true,
      },
      {
        text: assignment.name.substring(0, 30),
        disabled: false,
        href: `/assignment/${routeParams.courseID}/${routeParams.assignmentID}`,
      },
    ];

    // Set breadcrumbs using the breadcrumbs variable
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          <v-row no-gutters>
            <v-col cols="12" sm="8">
              <h1>{assignment.name}</h1>
            </v-col>
            <v-col cols="12" sm="4" style={{ margin: "auto" }}>
              {assignment.due_at && <p>Due: {assignment.due_at}</p>}
              <p>Points: {assignment.points_possible}</p>
            </v-col>
          </v-row>
          <v-divider dark style={{ padding: "0.5rem" }} />
          <p dangerouslySetInnerHTML={{ __html: assignment.description }} />
        </div>
      ) : (
        <div className="loading">
          <v-progress-circular
            size={50}
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      )}
    </div>
  );
};

export default AssignmentView;
