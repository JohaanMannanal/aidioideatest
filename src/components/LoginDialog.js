import React, { useState } from 'react';
import axios from 'axios';

const LoginDialog = () => {
  const [show1, setShow1] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const rules = {
    required: (value) => !!value || 'Required Field',
    min: (v) => v.length >= 8 || 'Min 8 characters',
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail.';
    },
  };

  const login = async () => {
    setLoggingIn(true);
    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/internal/login?email=${email}&password=${password}`,
        {}
      );
      if (response.data.status !== 'success') {
        setInvalid(true);
        setPassword('');
      } else {
        // Perform necessary actions after successful login
        // this.$store.commit("SET_USER", response.data.user);
        // this.$store.commit("SET_APP_BAR", true);
        // this.$router.push("/feed");
        // this.$cookies.set("email", this.email);
        // this.$cookies.set("password", this.password);
      }
    } catch (error) {
      console.error(error);
      setInvalid(true);
    }
    setLoggingIn(false);
  };

  return (
    <div>
      <div>
        <h3>Login to Assignment Canvas</h3>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <form>
          {invalid && <p style={{ color: 'red' }}>Email or password invalid</p>}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type={show1 ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={login}>
            Login
          </button>
        </form>
      </div>

      <hr />

      {loggingIn && (
        <div>
          <p>Logging in...</p>
        </div>
      )}
    </div>
  );
};

export default LoginDialog;
