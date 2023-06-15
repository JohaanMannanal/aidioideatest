import React, { useEffect, useState } from "react";
import axios from "axios";
import ReplyView from "../components/ReplyView";

const AnnouncementView = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [announcement, setAnnouncement] = useState({});
  const [course, setCourse] = useState({ name: "Loading Course Name" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          `https://canvasapi.toddr.org/api/courses/${match.params.courseID}`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        setCourse(courseResponse.data.data);

        const announcementResponse = await axios.get(
          `https://canvasapi.toddr.org/api/announcements/${match.params.courseID}/${match.params.announcementID}`,
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        setAnnouncement(announcementResponse.data.data);

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
        text: `${course.name}`,
        disabled: false,
        href: `/course/${match.params.courseID}`,
        exact: true,
      },
      {
        text: `${announcement.title.substring(0, 30)}`,
        disabled: false,
        href: `/assignment/${match.params.courseID}/${match.params.announcementID}`,
      },
    ];

    // Set breadcrumbs using the breadcrumbs variable
  }, [course, announcement]);

  return (
    <div>
      {!loading ? (
        <React.Fragment>
          <v-row no-gutters>
            <v-col cols="12" sm="8">
              <h1>{announcement.title}</h1>
            </v-col>
            <v-col cols="12" sm="4" style={{ margin: "auto" }}>
              <p>Created By: {announcement.author.display_name}</p>
              <p>Posted: {announcement.posted_at}</p>
            </v-col>
          </v-row>
          <v-divider dark style={{ padding: "0.5rem" }} />
          <p dangerouslySetInnerHTML={{ __html: announcement.message }} />
          <v-divider dark style={{ padding: "0.5rem" }} />
          <div className="reply">
            {announcement.replies.map((reply) => (
              <ReplyView key={reply.id} reply={reply} />
            ))}
          </div>
        </React.Fragment>
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

export default AnnouncementView;
