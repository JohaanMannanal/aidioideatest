import React from 'react'; const AdminProfileOptions = () => { return (
<div id="AdminProfileOptions">
      <button className="btn" style={{ boxShadow: "2px 2px 0px 0px", backgroundColor: "primary" }} onClick={() => { window.location.href = "/admin"; }}>
        Administrator Panel
      </button>
    </div>
); }; export default AdminProfileOptions;
