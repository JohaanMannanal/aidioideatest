import React, { useState, useEffect } from "react";
import axios from "axios";
import ReplyView from "../components/ReplyView";

const AnnouncementView = (props) => {
  const [loading, setLoading] = useState(true);
  const [announcement, setAnnouncement] = useState({});
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
        const announcementResponse = await axios.get(
          `https://canvasapi.toddr.org/api/announcements/${props.match.params.courseID}/${props.match.params.announcementID}`,
          {
            auth: {
              username: props.user.email,
              password: props.user.password,
            },
          }
        );
        console.log("Announcement Response:", announcementResponse.data.data);
        setAnnouncement(announcementResponse.data.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [
    props.user,
    props.history,
    props.match.params.courseID,
    props.match.params.announcementID,
  ]);

  return (
    <div>
      {!loading ? (
        <div>
          <div>
            <h1>{announcement.title}</h1>
          </div>
          <div style={{ margin: "auto" }}>
            <p>Created By: {announcement.author.display_name}</p>
            <p>Posted: {announcement.posted_at}</p>
          </div>
          <hr style={{ padding: "0.5rem" }} />
          <p dangerouslySetInnerHTML={{ __html: announcement.message }} />
          <hr style={{ padding: "0.5rem" }} />
          {announcement.replies.map((reply) => (
            <div className="reply" key={reply.id}>
              <ReplyView reply={reply} />
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementView;
