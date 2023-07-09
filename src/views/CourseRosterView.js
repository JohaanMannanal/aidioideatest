import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const CoursesView = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (props.user.banned) {
        props.history.push("/auth/banned");
      }

      try {
        const response = await axios.get(
          "https://canvasapi.toddr.org/api/courses",
          {
            auth: {
              username: props.user.email,
              password: props.user.password,
            },
          }
        );
        console.log("Response: ", response.data.data);
        setCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.user]);

  return (
    <div className="courses">
      {!loading && (
        <React.Fragment>
          <h1>All Courses</h1>
          <div className="courseContainer">
            {courses.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </React.Fragment>
      )}

      {loading && (
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

export default CoursesView;
