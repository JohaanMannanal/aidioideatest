import React from "react";
import { Link } from "react-router-dom";

function AnnouncementFeedCard(props) {
  const { announcement } = props;

  return (
    <div className="mx-auto">
      <div
        className="card"
        style={{ backgroundColor: "#272727", color: "white" }}
      >
        <div className="card-body">
          <h5 className="card-title">
            {announcement.title}
            <Link
              to={`/course/${parseInt(announcement.course.id)}`}
              style={{ textDecoration: "none", padding: "0.5rem" }}
            >
              <span
                className="badge badge-primary"
                style={{ cursor: "pointer" }}
              >
                {announcement.course.name}
              </span>
            </Link>
            <span className="badge badge-secondary">
              {announcement.author.display_name}
            </span>
          </h5>
          <p
            className="announcementContent"
            dangerouslySetInnerHTML={{ __html: announcement.message }}
          ></p>
        </div>
        <div className="card-footer">
          <Link
            to={`/announcement/${parseInt(announcement.course.id)}/${parseInt(
              announcement.id
            )}`}
            className="btn btn-link"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementFeedCard;
