import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationDialog = () => {
  const [dialog, setDialog] = useState(true);
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [canvasKey, setCanvasKey] = useState("");
  const [canvasURL, setCanvasURL] = useState("");
  const [password, setPassword] = useState("");
  const [checkingData, setCheckingData] = useState(true);
  const [confirmationStatus, setConfirmationStatus] = useState("checking");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [show1, setShow1] = useState(false);

  const rules = {
    required: (value) => !!value || "Required Field",
    min: (v) => v.length >= 8 || "Min 8 characters",
    canvasKey: (v) => v.length >= 1 || "Not a valid canvas API key format",
    emailMatch: () => `The email and password you entered don't match`,
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    },
  };

  const hash = async (string) => {
    const msgUint8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const checkData = async () => {
    setCheckingData(true);
    setConfirmationStatus("checking");
    if (
      !(canvasURL.startsWith("https://") || canvasURL.startsWith("http://"))
    ) {
      setCanvasURL("https://" + canvasURL);
    }
    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/internal/users/test?canvasURL=${canvasURL}&canvasKey=${canvasKey}`,
        {
          auth: {
            username: email, // provide the email value here
            password: password, // provide the password value here
          },
        }
      );
      if (response.data.status !== "success") {
        setConfirmationStatus("error");
      }

      const emailResponse = await axios.get(
        `https://canvasapi.toddr.org/internal/users/check?email=${email}`,
        {
          auth: {
            username: email, // provide the email value here
            password: password, // provide the password value here
          },
        }
      );
      if (emailResponse.data.status !== "unique") {
        setConfirmationStatus("taken");
      }
      if (confirmationStatus === "checking") {
        setConfirmationStatus("success");
      }
      setCheckingData(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createAccount = async () => {
    setCreatingAccount(true);
    try {
      const response = await axios.post(
        `https://canvasapi.toddr.org/internal/users/new?canvasURL=${canvasURL}&canvasKey=${canvasKey}&email=${email}&name=${first} ${last}&password=${await hash(
          password
        )}`,
        {
          auth: {
            username: email, // provide the email value here
            password: password, // provide the password value here
          },
        }
      );
      if (response.data.status === "success") {
        setCreatingAccount(false);
        // Perform necessary actions after successful account creation
        // this.$store.commit("SET_USER", response.data.user);
        // this.$cookies.set("email", response.data.user.email);
        // this.$cookies.set("password", response.data.user.password);
        // this.$router.push("/feed");
      } else {
        setCreatingAccount(false);
      }
      setCheckingData(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Perform any necessary initialization or side effects here
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setDialog(true)}>Open Dialog</button>
      </div>

      <div>
        <h3>Registration</h3>
      </div>

      <div>
        <div>
          <h4>Your Account</h4>
          <form>
            <input
              type="text"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              placeholder="Last Name"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type={show1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              onClick={() => {
                if (
                  password.length >= 8 &&
                  rules.email(email) === true &&
                  first.length > 0 &&
                  last.length > 0
                ) {
                  checkData();
                }
              }}
            >
              Continue
            </button>
          </form>
        </div>

        <div>
          <h4>Canvas Configuration</h4>
          <form>
            <input
              type="text"
              value={canvasURL}
              onChange={(e) => setCanvasURL(e.target.value)}
              placeholder="Canvas URL"
            />
            <p>
              Your canvas URL is the domain where your canvas instance is
              hosted. This is usually "[institution].instructure.com". If you
              are at George Fox University, your URL is
              <i>georgefox.instructure.com</i>. Do not include anything after
              the domain.
            </p>
            <input
              type="text"
              value={canvasKey}
              onChange={(e) => setCanvasKey(e.target.value)}
              placeholder="Canvas API Key"
            />
            <p>
              If you entered your URL correctly, the button to the right should
              bring you to your profile settings. Scroll down to{" "}
              <i>Approved Integrations</i> and click "New Access Token". Enter a
              purpose and leave the expiry date blank. Hit "Generate" and then
              copy the token that appears into the field below.
            </p>
            <button
              onClick={() => {
                if (canvasKey.length >= 1 && canvasURL.length > 0) {
                  checkData();
                }
              }}
            >
              Continue
            </button>
          </form>
        </div>

        <div>
          <h4>Confirmation</h4>
          {checkingData ? (
            <div>
              <p>Checking...</p>
            </div>
          ) : (
            <div>
              {confirmationStatus === "success" ? (
                <div>
                  <p>
                    Congratulations, the Canvas information you entered was
                    valid and works correctly. To create your account, simply
                    press "Create Account" and you'll be all set up.
                  </p>
                  <button onClick={() => createAccount()}>
                    Complete Setup
                  </button>
                </div>
              ) : confirmationStatus === "error" ? (
                <div>
                  <p>
                    Your Canvas URL and/or Canvas API key were invalid. Please
                    double check that those values are both valid. If you need
                    more help, contact{" "}
                    <a href="mailto:todd@toddr.org">todd@toddr.org</a>
                  </p>
                  <button onClick={() => setE1(2)}>Back</button>
                </div>
              ) : confirmationStatus === "taken" ? (
                <div>
                  <p>
                    The email you entered is already in use by another account.
                    Please go back and use a different email.
                  </p>
                  <button onClick={() => setE1(2)}>Back</button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationDialog;
