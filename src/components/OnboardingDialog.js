import { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [canvasKey, setCanvasKey] = useState("");
  const [canvasURL, setCanvasURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  const rules = {
    required: (value) => !!value || "This field is required.",
    email: (value) => /.+@.+\..+/.test(value) || "Invalid email format.",
    canvasKey: (value) => value.length === 40 || "Invalid Canvas API Key.",
    min: (value) =>
      value.length >= 8 || "Minimum password length is 8 characters.",
    emailMatch: (value) => value === password || "Passwords do not match.",
  };

  const hash = async (value) => {
    // Implement your hashing logic here
    return value;
  };

  const checkData = async () => {
    // Implement your data validation logic here
  };

  const createAccount = async () => {
    setCreatingAccount(true);

    const hashedPassword = await hash(password);

    try {
      const response = await axios.post(
        "https://canvasapi.toddr.org/internal/users/new",
        {
          email: email,
          first: first,
          last: last,
          canvasURL: canvasURL,
          canvasKey: canvasKey,
          password: hashedPassword,
        },
        {
          auth: {
            username: "your-email",
            password: "your-password",
          },
        }
      );

      if (response.data.status === "success") {
        // Account created successfully
      } else {
        console.log("Account creation failed.");
      }

      setCreatingAccount(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
      </div>
      <div>
        <label>Canvas API Key</label>
        <input
          type="text"
          value={canvasKey}
          onChange={(e) => setCanvasKey(e.target.value)}
        />
      </div>
      <div>
        <label>Canvas URL</label>
        <input
          type="text"
          value={canvasURL}
          onChange={(e) => setCanvasURL(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div>
        <button onClick={checkData} disabled={creatingAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
