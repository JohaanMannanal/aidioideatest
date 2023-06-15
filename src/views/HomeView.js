import React, { useState } from "react";
import AssignmentCanvasLogo from "../assets/images/t-logo.png";
import OnboardingDialog from "../components/OnboardingDialog";
import LoginDialog from "../components/LoginDialog";

const HomeView = () => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const handleLogin = () => {
    setDialog(true);
    // Handle login logic
    // Example: Dispatch login action or navigate to login page
  };

  const handleOnboarding = () => {
    setOnboardingOpen(true);
  };

  return (
    <div>
      <v-card className="overflow-hidden no-padding" dark>
        <v-app-bar dark>
          <v-img src={AssignmentCanvasLogo} max-height={40} max-width={40} />

          <v-spacer></v-spacer>
          <v-btn
            color="green"
            style={{ marginRight: "1rem" }}
            onClick={handleLogin}
          >
            <v-icon style={{ marginRight: "0.5rem" }}>mdi-login-variant</v-icon>
            Login
          </v-btn>
          <v-btn
            color="blue"
            style={{ marginRight: "1rem" }}
            onClick={handleOnboarding}
          >
            <v-icon style={{ marginRight: "0.5rem" }}>mdi-arrow-right</v-icon>
            Get Started
          </v-btn>
        </v-app-bar>
      </v-card>
      <section className="centered">
        <v-layout column wrap className="my-5" align-center>
          <v-flex xs12 sm4 className="my-3">
            <div className="text-xs-center">
              <h1>Assignment Canvas</h1>
              <h2 className="headline">
                The best way to view your Canvas courses
              </h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card rounded dark height="300px">
                    <v-card-text className="text-xs-center">
                      <v-icon x-large className="blue--text text--lighten-2">
                        mdi-security
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      className="layout justify-center"
                    >
                      <div className="headline text-xs-center">
                        Privacy Focused
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Assignment Canvas <i>never</i> stores any of your academic
                      data. All information retrieved from Canvas is sent
                      straight to your browser and never stored on our servers.
                      We also never write anything to Canvas on your behalf, so
                      you can be sure that your data is safe on Canvas and
                      nowhere else.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card rounded dark height="300px">
                    <v-card-text className="text-xs-center">
                      <v-icon x-large className="blue--text text--lighten-2">
                        mdi-newspaper-variant-multiple-outline
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      className="layout justify-center"
                    >
                      <div className="headline">One Central Feed</div>
                    </v-card-title>
                    <v-card-text>
                      Gone is the endless clicking between courses to get your
                      assignments and view announcements. Assignment Canvas
                      centralizes this information into one always up-to-date
                      feed, with easy-to-use filtering tools to quickly find
                      exactly what you want to know.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card dark height="300px">
                    <v-card-text className="text-xs-center">
                      <v-icon x-large className="blue--text text--lighten-2">
                        mdi-share
                      </v-icon>
                    </v-card-text>
                    <v-card-title
                      primary-title
                      className="layout justify-center"
                    >
                      <div className="headline text-xs-center">
                        Easily Sharable
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Assignment Canvas uses Canvas' global ID system, so you
                      can share an Assignment Canvas link with someone else, and
                      if they have access to that same Canvas course, it will
                      work right out of the box for them.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <v-footer color="blue" absolute padless>
        <v-row justify="center" no-gutters>
          <p style={{ paddingTop: "1rem" }}>
            © 2022
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="https://toddr.org"
            >
              <b>Todd Rylaarsdam</b>
            </a>
          </p>
        </v-row>
      </v-footer>
      {onboardingOpen && <OnboardingDialog />}
      <v-dialog v-model={dialog} width="500">
        <LoginDialog />
      </v-dialog>
    </div>
  );
};

export default HomeView;
