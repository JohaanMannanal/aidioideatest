import React, { useState } from 'react';

const NavigationDrawer = () => {
  const [drawer, setDrawer] = useState(true);
  const [mini, setMini] = useState(true);

  const toggleMini = () => {
    setMini(!mini);
  };

  const items = [
    { title: "Home", icon: "mdi-home-city" },
    { title: "My Account", icon: "mdi-account" },
    { title: "Users", icon: "mdi-account-group-outline" },
  ];

  return (
    <div>
      <div>
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Profile" />
        <h3>John Leider</h3>
        <button onClick={toggleMini}>
          <i className="mdi mdi-chevron-left"></i>
        </button>
      </div>

      <hr />

      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <i className={item.icon}></i>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationDrawer;
