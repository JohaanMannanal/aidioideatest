import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
const AdminView = () => {
  const [tab, setTab] = useState("2");
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [gravatarURL, setGravatarURL] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://canvasapi.toddr.org/internal/users",
          {
            auth: { username: user.email, password: user.password },
          }
        );
        setUsers(response.data.users);
        const errorResponse = await axios.get(
          "https://canvasapi.toddr.org/internal/errors",
          { auth: { username: user.email, password: user.password } }
        );
        setErrors(errorResponse.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);
  useEffect(() => {
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
      user.email.toLowerCase()
    )}?d=retro`;
    setGravatarURL(gravatarUrl);
  }, [user]);
  useEffect(() => {
    if (user.banned) {
      //Redirect to banned page
      // Replace "/auth/banned" with the appropriate route or redirect logic
      window.location.href = "/auth/banned";
    }
  }, [user]);
  return (
    <div className="admin-panel">
      {user.role === "Administrator" ? (
        <React.Fragment>
          <Toolbar dark dense>
            <Tabs
              value={tab}
              onChange={(value) => setTab(value)}
              fixedTabs
              dark
            >
              {tabs.map((i) => (
                <Tab key={i} href={`#tab-${i}`}>
                  {i}
                </Tab>
              ))}
            </Tabs>
          </Toolbar>

          <TabsItems value={tab} dark>
            <TabItem value="tab-Users">
              <Card dark>
                <List>
                  {users.map((aUser) => (
                    <UserCard key={aUser.id} user={aUser} admin={true} />
                  ))}
                </List>
              </Card>
            </TabItem>
            <TabItem value="tab-System">
              <Card dark>
                <CardText dark>THIS IS SOME TEXT</CardText>
              </Card>
            </TabItem>
            <TabItem value="tab-Errors">
              <Card dark>
                <List threeLine style={{ padding: "1rem" }}>
                  {errors.map((error) => (
                    <React.Fragment key={error.id}>
                      <ListItemContent dark>
                        Error ID: {error.id} | User ID: {error.userID}
                      </ListItemContent>
                      <ListItemSubTitle dark>
                        {JSON.stringify(error.error)}
                      </ListItemSubTitle>
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </TabItem>
          </TabsItems>
        </React.Fragment>
      ) : (
        <Alert dark type="error">
          You do not have authorization to view this panel.
        </Alert>
      )}
    </div>
  );
};
export default AdminView;
