import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const App = (props) => {
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    props.setUser({});
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    history.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("password");
      console.log("Trying login with: ", email, password);
      if (email !== undefined && password !== undefined) {
        try {
          const response = await axios.get(
            `https://canvasapi.toddr.org/internal/login?email=${email}&password=${password}`
          );
          if (response.data.status === "success") {
            props.setUser(response.data.user);
            props.setShowAppBar(true);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            console.log(location.pathname);
            if (location.pathname === "/" || location.pathname === "/home") {
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
          // handle error
        }
      } else {
        history.push("/");
      }
    };

    fetchData();
  }, [history, location, props]);

  return (
    <div className="app">
      {props.showAppBar && (
        <React.Fragment>
          <v-navigation-drawer app dark permanent>
            <v-list>
              <v-list-item className="px-2">
                <v-list-item-avatar>
                  <v-img src="https://toddr.org/assets/images/t-logo.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title className="text-h6">
                    Assignment Canvas
                  </v-list-item-title>
                  <v-list-item-subtitle>v2.5.0</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
              <v-list-item link to="/feed">
                <v-list-item-icon>
                  <v-icon>mdi-rss</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Feed</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/courses">
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My Courses</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/announcements">
                <v-list-item-icon>
                  <v-icon>mdi-message-reply-text-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Announcements</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/assignments">
                <v-list-item-icon>
                  <v-icon>mdi-note-edit-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Assignments</v-list-item-title>
              </v-list-item>
            </v-list>
            <template slot="append">
              <v-list nav dense>
                <v-list-item link to="/profile">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
              </v-list>

              <div className="pa-2">
                <v-btn block onClick={logout}>
                  Logout
                </v-btn>
              </div>
            </template>
          </v-navigation-drawer>

          <v-app-bar app dark>
            <v-breadcrumbs dark:items={props.breadcrumbs}></v-breadcrumbs>
          </v-app-bar>
        </React.Fragment>
      )}

      <v-main style={{ backgroundColor: "#111" }}>
        <v-container fluid>
          {props.showAppBar ? (
            <React.Fragment>{props.children}</React.Fragment>
          ) : (
            <router-view></router-view>
          )}
        </v-container>
      </v-main>
    </div>
  );
};

export default App;
