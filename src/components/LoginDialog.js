import React, { useState } from "react";
import axios from "axios";

const LoginDialog = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const rules = {
    required: (value) => !!value || "Required Field",
    min: (v) => v.length >= 8 || "Min 8 characters",
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    },
  };

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/internal/login?email=${email}&password=${password}`,
        {}
      );
      if (response.data.status !== "success") {
        setInvalid(true);
        setPassword("");
      } else {
        // Perform the necessary actions upon successful login
        // e.g., set user state, navigate to a new page, etc.
      }
    } catch (error) {
      console.error(error);
      setInvalid(true);
    }
    setLoggingIn(false);
  };

  return (
    <div className="LoginDialog">
      <h2>Login to Assignment Canvas</h2>

      <div style={{ marginTop: "1rem" }}>
        {invalid && <p style={{ color: "red" }}>Email or password invalid</p>}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          disabled={password.length < 8 || !rules.email(email)}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      {loggingIn && <div>Loading...</div>}
    </div>
  );
};

export default LoginDialog;
