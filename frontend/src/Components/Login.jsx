import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tempToken = localStorage.getItem("tempToken");
  console.log(tempToken);
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/user/verify-otp`,
        { otp },
        {
          headers: {
            authorization: `Bearer ${tempToken}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setMessage(res.data.message);
        alert("User logged successFully!");
        localStorage.removeItem("token");
        localStorage.setItem("accessToken", res.data.accessToken); // Store token
        navigate("/privatePage");
      }

      // Redirect on success
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Verification failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <style>
        {`
          .login-container {
            max-width: 400px;
            margin: 40px auto;
            padding: 20px;
            background: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
          }

          h1 {
            margin-bottom: 20px;
            color: #333;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }

          button {
            padding: 10px;
            font-size: 16px;
            background-color: #1e1e2f;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
          }

          button:hover {
            background-color: #333;
          }

          .message {
            margin-top: 15px;
            font-size: 14px;
            color: #d9534f;
          }

          @media screen and (max-width: 480px) {
            .login-container {
              margin: 20px;
              padding: 16px;
            }

            input, button {
              font-size: 14px;
              padding: 8px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Login;
