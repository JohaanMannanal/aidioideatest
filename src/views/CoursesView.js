import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const CoursesView = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user.banned) {
        history.push("/auth/banned");
        return;
      }

      try {
        const response = await axios.get(
          "https://canvasapi.toddr.org/api/courses",
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Response: ", response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <v-progress-circular
          size={50}
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    );
  }

  return (
    <div className="courses">
      <h1>All Courses</h1>
      <div className="courseContainer">
        {courses.map((item) => (
          <CourseCard key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
};

export default CoursesView;
