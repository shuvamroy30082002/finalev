import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./dashboard-page/Dashboard.css";
import CreateLink from "./Create-link";
import Links from "./links-page/Links";

const MainLayout = () => {
  const [greeting, setGreeting] = useState("Good Morning");
  const [showLogout, setShowLogout] = useState(false);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [links, setLinks] = useState([]);
  const linksRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const storedLinks = JSON.parse(localStorage.getItem(`${username}_links`)) || [];
    setLinks(storedLinks);

    const updateDate = () => setCurrentDate(new Date());
    const intervalId = setInterval(updateDate, 60000); // Update date every minute

    return () => clearInterval(intervalId);
  }, [username]);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleMenuClick = (path) => {
    navigate(`/dashboard/${path}`);
  };

  

 

  const userInitials = username ? username.slice(0, 2).toUpperCase() : 'BR';

  return (
    <div className="dashboard-container">
      

        <button className="create-new" onClick={handleCreateNewLinkButtonClick}>
          <span>
            <img src="/assets/plus.png" alt="" /> Create new
          </span>
        </button>
        <div className="search">
          <img className="search-logo" src="/assets/search.png" alt="" onClick={handleSearch} />
          <input
            className="search-box"
            type="text"
            placeholder="Search by remarks"
            onKeyDown={handleSearch}
          />
        </div>

        <div className="user-profile">
          <button
            className="user-initials"
            onClick={() => setShowLogout(!showLogout)}
          >
            {userInitials}
          </button>
          {showLogout && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      <div className="dashboard-main">
        <aside className="sidebar">
          <ul className="menu">
            <li
              key="dashboard"
              className={`menu-item ${
                location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/"
                  ? "active"
                  : ""
              }`}
              onClick={() => handleMenuClick("")}
            >
              <img src="/assets/dashboard-icon.png" alt="" /> Dashboard
            </li>
            <li
              key="links"
              className={`menu-item ${
                location.pathname === "/dashboard/links" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("links")}
            >
              <img className="logo" src="/assets/logo.png" alt="app-logo" />
      <header className="dashboard-header">
        <p className="dashboard-title">
          <img src="/assets/climate.png" alt="" /> {greeting}, {username} <br />
          <span className="dashboard-date">{formatDate(currentDate)}</span>
        </p>
              <img src="/assets/links-page-icons/link-icon.png" alt="" /> Links
            </li>
            <li
              key="analytics"
              className={`menu-item ${
                location.pathname === "/dashboard/analytics" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("analytics")}
            >
              <img src="/assets/analystics-icon.png" alt="" /> Analytics
            </li>
          </ul>
          <div
            key="settings"
            className={`settings ${
              location.pathname === "/dashboard/settings" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("settings")}
          >
            <p>
              <img src="/assets/settings.icon.png" alt="" /> Settings
            </p>
          </div>
        </aside>
        <main className="content">
        {location.pathname === '/dashboard/links' ? (
          <Links ref={linksRef} />
        ) : (
          <Outlet />
        )}
      </main>
      </div>

      {showCreateLink && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateLink
              onClose={handleCloseCreateLink}
              onSubmit={handleCreateNewLink}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;