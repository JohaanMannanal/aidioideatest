import React from 'react';
import { Link } from 'react-router-dom';

function AnnouncementCard(props) {
  const { announcement } = props;

  return (
    <div className="AnnouncementContent">
      <div className="card" style={{ backgroundColor: '#272727', color: 'white' }}>
        <div className="card-header">
          <h6 className="card-title">
            <i className="mdi mdi-message-reply-text-outline iconButtonPadding"></i>
            {announcement.title}
          </h6>
        </div>

        <div className="card-body announcementContent">
          <p dangerouslySetInnerHTML={{ __html: announcement.message }}></p>
        </div>

        <div className="card-footer">
          <Link
            to={`/announcement/${parseInt(announcement.course.id)}/${parseInt(announcement.id)}`}
            className="btn btn-link"
          >
            View
          </Link>
          {/* <button className="btn btn-link">Open in Canvas</button> */}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCard;
