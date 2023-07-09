import React, { useState } from "react";
import OnboardingDialog from "../components/OnboardingDialog";
import LoginDialog from "../components/LoginDialog";

const HomeView = () => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const login = () => {
    setDialog(true);
  };

  const onboarding = () => {
    setOnboardingOpen(true);
  };

  return (
    <div>
      <div className="overflow-hidden no-padding">
        <div className="dark">
          <div className="dark">
            <img
              src="https://toddr.org/assets/images/t-logo.png"
              alt="Logo"
              style={{ maxHeight: 40, maxWidth: 40 }}
            />

            <div style={{ flex: 1 }}></div>
            <button
              className="green"
              style={{ marginRight: "1rem" }}
              onClick={login}
            >
              <i
                className="mdi mdi-login-variant"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Login
            </button>
            <button
              className="blue"
              style={{ marginRight: "1rem" }}
              onClick={onboarding}
            >
              <i
                className="mdi mdi-arrow-right"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <section className="centered">
        <div className="my-5">
          <div className="text-xs-center">
            <h1>Assignment Canvas</h1>
            <h2 className="headline">
              The best way to view your Canvas courses
            </h2>
          </div>
        </div>
        <div>
          <div className="row wrap align-center">
            <div className="xs12 md4">
              <div className="dark" style={{ height: "300px" }}>
                <div className="text-xs-center">
                  <i
                    className="blue--text text--lighten-2 mdi mdi-security"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <div className="layout justify-center">
                  <div className="headline text-xs-center">Privacy Focused</div>
                </div>
                <div>
                  Assignment Canvas <i>never</i> stores any of your academic
                  data. All information retreived from Canvas is sent straight
                  to your browser and never stored on our servers. We also never
                  write anything to Canvas on your behalf, so you can be sure
                  that your data is safe on Canvas and nowhere else.
                </div>
              </div>
            </div>
            <div className="xs12 md4">
              <div className="dark" style={{ height: "300px" }}>
                <div className="text-xs-center">
                  <i
                    className="blue--text text--lighten-2 mdi mdi-newspaper-variant-multiple-outline"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <div className="layout justify-center">
                  <div className="headline">One Central Feed</div>
                </div>
                <div>
                  Gone is the endless clicking between courses to get your
                  assignments and view announcements. Assignment Canvas
                  centralizes this information into one always up to date feed,
                  with easy to use filtering tools to quickly find exactly what
                  you want to know.
                </div>
              </div>
            </div>
            <div className="xs12 md4">
              <div className="dark" style={{ height: "300px" }}>
                <div className="text-xs-center">
                  <i
                    className="blue--text text--lighten-2 mdi mdi-share"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <div className="layout justify-center">
                  <div className="headline text-xs-center">Easily Sharable</div>
                </div>
                <div>
                  Assignment Canvas uses Canvas' global ID system, so you can
                  share an Assignment Canvas link with someone else, and if they
                  have access to that same canvas course, it will work right out
                  of the box for them.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="blue" style={{ position: "absolute", padding: 0 }}>
        <div className="justify-center">
          <p style={{ paddingTop: "1rem" }}>
            © 2022
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="https://toddr.org"
            >
              <b>Todd Rylaarsdam</b>
            </a>
          </p>
        </div>
      </footer>
      {onboardingOpen && <OnboardingDialog />}
      <div className={dialog ? "open" : ""}>
        <LoginDialog />
      </div>
    </div>
  );
};

export default HomeView;
