import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "campusUser",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "campusToken",
        response.data.token
      );

      alert(response.data.message);

      setEmail("");
      setPassword("");

      // Open CampusCart home page after successful login
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <p className="section-tag">
          WELCOME BACK
        </p>

        <h1>Login</h1>

        <p>
          Login to continue shopping on CampusCart.
        </p>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button
          type="submit"
          className="form-button"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="form-footer">
          Don't have an account?
          <Link to="/register">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;