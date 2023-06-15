import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementsView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://canvasapi.toddr.org/api/announcements",
          {
            auth: {
              username: user.email,
              password: user.password,
            },
          }
        );
        setAnnouncements(response.data.data);
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

  return (
    <div className="announcements">
      {!loading ? (
        <React.Fragment>
          <h1 style={{ paddingBottom: "1rem" }}>All Announcements</h1>
          <div className="announcementsContainer">
            {announcements.map((item) => (
              <AnnouncementFeedCard key={item.id} announcement={item} />
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

export default AnnouncementsView;
