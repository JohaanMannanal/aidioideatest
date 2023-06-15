import React, { useEffect, useState } from "react";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";
import AnnouncementCard from "../components/AnnouncementCard";

const CourseView = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({ name: "Unknown Course" });
  const [filter, setFilter] = useState({
    assignments: true,
    announcements: true,
  });
  const [data, setData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const assignmentClick = () => {
    let newData = [];

    setFilter((prevFilter) => ({
      ...prevFilter,
      assignments: !prevFilter.assignments,
    }));

    if (filter.assignments) {
      setData((prevData) => [...prevData, ...assignments]);
    } else {
      newData = data.filter((item) => item.discussion_type);
      setData(newData);
    }

    setData((prevData) =>
      prevData.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      )
    );
  };

  const announcementClick = () => {
    let newData = [];

    setFilter((prevFilter) => ({
      ...prevFilter,
      announcements: !prevFilter.announcements,
    }));

    if (filter.announcements) {
      setData((prevData) => [...prevData, ...announcements]);
    } else {
      newData = data.filter((item) => !item.discussion_type);
      setData(newData);
    }

    setData((prevData) =>
      prevData.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      )
    );
  };

  useEffect(() => {
    async function fetchData() {
      if (user.banned) {
        history.push("/auth/banned");
        return;
      }

      try {
        const courseResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${params.id}`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Course Response: ", courseResponse.data.data);
        setCourse(courseResponse.data.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const assignmentsResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${params.id}/assignments`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log("Assignments Response: ", assignmentsResponse.data.data);
        setAssignments(assignmentsResponse.data.data);
        setData((prevData) => [...prevData, ...assignmentsResponse.data.data]);
      } catch (error) {
        console.error(error);
      }

      try {
        const announcementsResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${params.id}/announcements`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        console.log(
          "Announcements Response: ",
          announcementsResponse.data.data
        );
        setAnnouncements(announcementsResponse.data.data);
        setData((prevData) => [
          ...prevData,
          ...announcementsResponse.data.data,
        ]);
      } catch (error) {
        console.error(error);
      }

      setData((prevData) =>
        prevData.sort((a, b) =>
          new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
        )
      );

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
    <div className="courseViewContainer">
      <v-card dark>
        <v-toolbar>
          <v-toolbar-title>{course.name}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color={filter.announcements ? "teal" : "gray"}
            className="buttonPadding"
            flat
            onClick={announcementClick}
          >
            <v-icon className="iconButtonPadding">
              mdi-message-reply-text-outline
            </v-icon>
            Announcements
          </v-btn>
          <v-btn
            color={filter.assignments ? "teal" : "gray"}
            className="buttonPadding"
            flat
            onClick={assignmentClick}
          >
            <v-icon className="iconButtonPadding">mdi-note-edit-outline</v-icon>
            Assignments
          </v-btn>
          <v-btn
            className="buttonPadding"
            flat
            to={`/course/${params.id}/calendar`}
          >
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
          <v-btn
            className="buttonPadding"
            flat
            to={`/course/${params.id}/roster`}
          >
            <v-icon>mdi-account-group</v-icon>
          </v-btn>
          <v-btn flat href={`${user.canvasURL}/courses/${parseInt(course.id)}`}>
            <v-icon className="iconButtonPadding">mdi-share</v-icon>
            Open Canvas
          </v-btn>
        </v-toolbar>
        <div className="assignmentContainer">
          {data.map((item) => (
            <div key={JSON.stringify(item)} className="assignmentCardContainer">
              {item.discussion_type === undefined ? (
                <AssignmentCard
                  assignment={item}
                  style={{ paddingBottom: "10px" }}
                />
              ) : (
                <AnnouncementCard
                  announcement={item}
                  style={{ paddingBottom: "10px" }}
                />
              )}
            </div>
          ))}
        </div>
      </v-card>
    </div>
  );
};

export default CourseView;
