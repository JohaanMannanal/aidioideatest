import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [mini, setMini] = useState(true);

  const toggleMini = () => {
    setMini(!mini);
  };

  const items = [
    { title: "Home", icon: "mdi-home-city", path: "/" },
    { title: "My Account", icon: "mdi-account", path: "/account" },
    { title: "Users", icon: "mdi-account-group-outline", path: "/users" },
  ];

  return (
    <div>
      <div className={`sidebar ${mini ? "mini" : ""}`}>
        <div className="sidebar-header">
          <div className="avatar">
            <img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Avatar"
            />
          </div>
          <div className="sidebar-title">John Leider</div>
          <button className="toggle-btn" onClick={toggleMini}>
            <i className="mdi mdi-chevron-left"></i>
          </button>
        </div>
        <div className="sidebar-menu">
          <ul>
            {items.map((item) => (
              <li key={item.title}>
                <Link to={item.path}>
                  <i className={`mdi ${item.icon}`}></i>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content">{/* Content area */}</div>
    </div>
  );
}

export default Sidebar;
