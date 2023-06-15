import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function App() {
  const history = useHistory();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    const login = async () => {
      console.log("Trying login with:", email, password);
      if (email && password) {
        try {
          const response = await axios.get(
            `https://canvasapi.toddr.org/internal/login?email=${email}&password=${password}`
          );
          if (response.data.status === "success") {
            setUser(response.data.user);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            console.log(history.location.pathname);
            if (
              history.location.pathname === "/" ||
              history.location.pathname === "/home"
            ) {
              console.log("redirecting to feed");
              if (response.data.user.banned) {
                history.push("/auth/banned");
              } else {
                history.push("/feed");
              }
            }
          }
        } catch (error) {
          console.error(error);
          setInvalid(true);
        }
      } else {
        history.push("/");
      }
    };

    login();
  }, []);

  const logout = () => {
    setUser({});
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    history.push("/");
  };

  return (
    <div id="app">
      {showAppBar && (
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Assignment Canvas
          </a>
          <span className="navbar-text">v2.5.0</span>
        </nav>
      )}
      <div className="container-fluid">
        <div className="row">
          {showAppBar && (
            <div className="col-3">
              <div className="list-group">
                <a
                  className="list-group-item list-group-item-action"
                  href="/feed"
                >
                  <i className="mdi mdi-rss"></i> Feed
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="/courses"
                >
                  <i className="mdi mdi-account-multiple"></i> My Courses
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="/announcements"
                >
                  <i className="mdi mdi-message-reply-text-outline"></i>{" "}
                  Announcements
                </a>
                <a
                  className="list-group-item list-group-item-action"
                  href="/assignments"
                >
                  <i className="mdi mdi-note-edit-outline"></i> Assignments
                </a>
              </div>
              <div className="list-group mt-3">
                <a
                  className="list-group-item list-group-item-action"
                  href="/profile"
                >
                  <i className="mdi mdi-account"></i> Profile
                </a>
              </div>
              <div className="p-2">
                <button className="btn btn-block btn-primary" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          )}
          <div className="col">
            <div className="container" style={{ backgroundColor: "#111" }}>
              {showAppBar && (
                <nav
                  className="breadcrumb"
                  style={{ backgroundColor: "transparent" }}
                >
                  <ol className="breadcrumb">
                    {breadcrumbs.map((breadcrumb, index) => (
                      <li key={index} className="breadcrumb-item">
                        {breadcrumb}
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              {showRouter && (
                <div>
                  <RouterView />
                  <nav>
                    <Link to="/">Home</Link> | <Link to="/about">About</Link>
                  </nav>
                </div>
              )}
              {!showRouter && <RouterView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
