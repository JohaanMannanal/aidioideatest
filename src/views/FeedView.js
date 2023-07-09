import React, { useEffect, useState } from "react";
import axios from "axios";
import AssignmentCard from "../components/AssignmentCard";
import AnnouncementFeedCard from "../components/AnnouncementFeedCard";

const FeedView = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({ name: "Feed" });
  const [filter, setFilter] = useState({
    assignments: true,
    announcements: true,
  });
  const [data, setData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const assignmentClick = () => {
    let newData = [];

    setFilter((prevState) => ({
      ...prevState,
      assignments: !prevState.assignments,
    }));

    if (filter.assignments) {
      setData([...data, ...assignments]);
    } else {
      newData = data.filter((item) => item.discussion_type !== undefined);
      setData(newData);
    }
  };

  const announcementClick = () => {
    let newData = [];

    setFilter((prevState) => ({
      ...prevState,
      announcements: !prevState.announcements,
    }));

    if (filter.announcements) {
      setData([...data, ...announcements]);
    } else {
      newData = data.filter((item) => item.discussion_type === undefined);
      setData(newData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await this.$store.commit("SET_APP_BAR", true);

      if (this.$store.state.user.banned) {
        this.$router.push("/auth/banned");
      }

      try {
        const assignmentsResponse = await axios.get(
          "https://canvasapi.toddr.org/api/assignments",
          {
            auth: {
              username: this.$store.state.user.email,
              password: this.$store.state.user.password,
            },
          }
        );
        console.log("Response: ", assignmentsResponse.data.data);
        setAssignments(assignmentsResponse.data.data);
        setData([...data, ...assignmentsResponse.data.data]);
      } catch (error) {
        console.error(error);
      }

      try {
        const announcementsResponse = await axios.get(
          "https://canvasapi.toddr.org/api/announcements/",
          {
            auth: {
              username: this.$store.state.user.email,
              password: this.$store.state.user.password,
            },
          }
        );
        console.log("Response: ", announcementsResponse.data.data);
        setAnnouncements(announcementsResponse.data.data);
        setData([...data, ...announcementsResponse.data.data]);
      } catch (error) {
        console.error(error);
      }

      setData(
        [...data].sort((a, b) =>
          new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
        )
      );

      this.$store.commit("SET_BREADCRUMBS", [
        {
          text: "Feed",
          disabled: false,
          href: "/feed",
          exact: true,
        },
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="courseViewContainer">
      {!loading ? (
        <v-card dark>
          <v-toolbar>
            <v-toolbar-title>Your {course.name}</v-toolbar-title>

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
              <v-icon className="iconButtonPadding">
                mdi-note-edit-outline
              </v-icon>
              Assignments
            </v-btn>
          </v-toolbar>
          <div className="assignmentContainer">
            {data.map((item) =>
              item.discussion_type === undefined ? (
                <AssignmentCard
                  key={JSON.stringify(item)}
                  assignment={item}
                  style={{ paddingBottom: "10px" }}
                />
              ) : (
                <AnnouncementFeedCard
                  key={JSON.stringify(item)}
                  announcement={item}
                  style={{ paddingBottom: "10px" }}
                />
              )
            )}
          </div>
        </v-card>
      ) : (
        <div className="loading">
          <v-progress-circular
            size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      )}
    </div>
  );
};

export default FeedView;
