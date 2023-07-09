import React from "react";
import md5 from "md5";
import AdminProfileOptions from "../components/AdminProfileOptions";

const ProfileView = () => {
  const gravatarURL =
    "https://www.gravatar.com/avatar/" +
    md5(this.$store.state.user.email.toLowerCase()) +
    "?d=retro";

  return (
    <div className="profile">
      <v-card flat dark style={{ padding: "0.5rem" }}>
        <v-card-text>
          <v-row className="mb-4" align="center">
            <v-avatar color="grey" className="mr-4">
              <img src={gravatarURL} alt="Profile Picture" />
            </v-avatar>
            <strong className="text-h6">
              Hello, {this.$store.state.user.name}
            </strong>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-row>
          <h3>Your Account Information:</h3>
          <p>
            Email: <strong>{this.$store.state.user.email}</strong>
            <br />
            Role: <strong>{this.$store.state.user.role}</strong>
            <br />
            User ID: <strong>{this.$store.state.user.id}</strong>
          </p>
          <hr />
          <br />
          <h3>Your Canvas Information:</h3>
          <p>
            Canvas API Key:{" "}
            <strong>
              {this.$store.state.user.canvasKey.length >= 1
                ? "Configured"
                : "Not configured"}
            </strong>
            <br />
            Canvas URL: <strong>{this.$store.state.user.canvasURL}</strong>
          </p>
          <hr />
          <br />
          <h3>Support:</h3>
          <v-container>
            <v-row no-gutters dark>
              <v-col cols="12" sm="6" md="8">
                <v-card className="pa-2" tile dark flat>
                  <p>
                    If your canvas API key has changed, or you need to change
                    other account information, you can redo the onboarding
                    process.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" md="4" dark>
                <v-card className="pa-2" tile dark flat>
                  <v-btn color="primary" elevation="2">
                    Restart Onboarding
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutters dark>
              <v-col cols="12" sm="6" md="8">
                <v-card className="pa-2" tile dark flat>
                  <p>
                    If you want to delete your account, or want to make other
                    changes (like your email address/name, etc) to your account,
                    you can contact us here:
                  </p>
                </v-card>
              </v-col>
              <v-col cols="6" md="4" dark>
                <v-card className="pa-2" tile dark flat>
                  <v-btn
                    color="primary"
                    elevation="2"
                    href="mailto:todd@toddr.org"
                  >
                    Email Todd
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          {this.$store.state.user.role === "Administrator" && (
            <AdminProfileOptions />
          )}
        </v-card-text>
      </v-card>
    </div>
  );
};

export default ProfileView;
