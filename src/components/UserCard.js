import React from "react";
import "./UserCard.css";

const UserCard = ({ user, admin }) => {
  return (
    <div className="UserCard">
      <div className="card dark">
        <div className="card-title text-h6">
          <i className="iconButtonPadding mdi mdi-account"></i>
          {user.name}
        </div>

        <div
          className="card-subtitle userContent"
          dangerouslySetInnerHTML={{ __html: user.email }}
        ></div>

        {admin && (
          <div className="card-actions">
            <button
              className="btn"
              onClick={() => {
                window.location.href = "/user/" + user.id;
              }}
            >
              Edit
            </button>
            {user.banned && (
              <button className="btn" style={{ color: "red" }}>
                Banned
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
