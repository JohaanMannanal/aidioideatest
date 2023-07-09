import React from 'react';

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className="AnnouncementContent">
      <div style={{ backgroundColor: "#272727", color: "white" }}>
        <h3 className="text-h6">
          <i className="iconButtonPadding mdi mdi-message-reply-text-outline"></i>
          {announcement.title}
        </h3>
      </div>

      <div className="announcementContent" dangerouslySetInnerHTML={{ __html: announcement.message }}></div>

      <div>
        <button onClick={() => { window.location.href = `/announcement/${parseInt(announcement.course.id)}/${parseInt(announcement.id)}` }}>
          View
        </button>
        {/* <button> Open in Canvas </button> */}
      </div>
    </div>
  );
};

export default AnnouncementCard;
