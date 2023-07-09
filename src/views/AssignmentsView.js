import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";

const AssignmentsView = (props) => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.user.banned) {
          props.history.push("/auth/banned");
        }

        const response = await axios.get(
          "https://canvasapi.toddr.org/api/assignments",
          {
            auth: {
              username: props.user.email,
              password: props.user.password,
            },
          }
        );
        console.log("Response:", response.data.data);
        setAssignments(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.user, props.history]);

  return (
    <div>
      {!loading ? (
        <div>
          <h1 style={{ paddingBottom: "1rem", color: "white" }}>
            All Assignments
          </h1>
          <div className="announcementsContainer">
            {assignments.map((item) => (
              <div key={item.id}>
                <AssignmentCard assignment={item} />
              </div>
            ))}
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

export default AssignmentsView;
