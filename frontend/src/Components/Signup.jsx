import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl)
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    if (!formattedPhone || formattedPhone.length !== 13) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/user/send-otp`, {
        phone: formattedPhone,
      });
      console.log(res.status)

      if (res.status === 200) {
        setMessage(res.data.message);
        localStorage.setItem("tempToken", res.data.tempToken);
        alert("OTP sent successfully");
        setIsOtpSent(true); // ✅ Prevent further clicks
        navigate("/login");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSendOtp}>
          <input
            type="tel"
            placeholder="Enter your 10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <button type="submit" disabled={loading || isOtpSent}>
            {loading ? "Sending..." : isOtpSent ? "OTP Sent" : "Send OTP"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <style>
        {`
          .signup-container {
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

          button[disabled] {
            background-color: #aaa;
            cursor: not-allowed;
          }

          button:hover:enabled {
            background-color: #333;
          }

          .message {
            margin-top: 15px;
            font-size: 14px;
            color: #d9534f;
          }

          @media screen and (max-width: 480px) {
            .signup-container {
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

export default Signup;
