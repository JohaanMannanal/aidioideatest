import React, { useEffect, useState } from "react";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";

const AssignmentsView = () => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://canvasapi.toddr.org/api/assignments",
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Response: ", response.data.data);
        setAssignments(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
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
        text: "Assignments",
        disabled: false,
        href: "/assignments",
        exact: true,
      },
    ];

    // Set breadcrumbs using the breadcrumbs variable
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="announcements">
          <h1 style={{ paddingBottom: "1rem", color: "white" }}>
            All Assignments
          </h1>
          <div className="announcementsContainer">
            {assignments.map((item) => (
              <AssignmentCard key={item.id} assignment={item} />
            ))}
          </div>
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

export default AssignmentsView;
