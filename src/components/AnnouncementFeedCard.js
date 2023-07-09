import React from 'react';

const AnnouncementFeedCard = ({ announcement }) => {
  return (
    <div className="mx-auto" style={{ backgroundColor: "#272727", color: "white" }}>
      <div>
        <h3 className="text-h5 mb-1">
          {announcement.title}
          <a href={`/course/${parseInt(announcement.course.id)}`} style={{ textDecoration: "none", padding: "0.5rem" }}>
            <span style={{ backgroundColor: "primary", cursor: "pointer" }}>
              {announcement.course.name}
            </span>
          </a>
          <span style={{ backgroundColor: "secondary" }}>
            {announcement.author.display_name}
          </span>
        </h3>
      </div>

      <div className="announcementContent" dangerouslySetInnerHTML={{ __html: announcement.message }}></div>

      <div>
        <button onClick={() => { window.location.href = `/announcement/${parseInt(announcement.course.id)}/${parseInt(announcement.id)}` }}>
          View
        </button>
      </div>
    </div>
  );
};

export default AnnouncementFeedCard;
