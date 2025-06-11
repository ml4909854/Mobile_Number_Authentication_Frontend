import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
const Layout = () => {
  const accessToken = localStorage.getItem("accessToken");
const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem("accessToken");
    alert("Logout successfully!");
    navigate("/signup")
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/privatePage">PrivatePage</Link>
        {accessToken ? (
          <>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                ouline: "none",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Singup</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
