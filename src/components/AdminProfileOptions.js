import React from "react";
import { Link } from "react-router-dom";

function AdminProfileOptions() {
  return (
    <div id="AdminProfileOptions">
      <Link to="/admin">
        <button className="btn btn-block btn-primary" style={{ elevation: 2 }}>
          Administrator Panel
        </button>
      </Link>
    </div>
  );
}

export default AdminProfileOptions;
