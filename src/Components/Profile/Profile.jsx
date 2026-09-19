
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiCamera,
  FiSettings,
  FiPlus,
  FiGrid,
  FiBookmark,
  FiChevronDown,
} from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";
import "./Profile.css";
import Sidebar from "../Home/Sidebar/Sidebar";
import Message from "../Home/Message/Message";
import Notification from "../Notifications/Notifications";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const [savedPosts, setSavedPosts] = useState([]);
  const [savedReels, setSavedReels] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadSavedItems = () => {
      const posts = JSON.parse(
        localStorage.getItem("savedPosts") || "[]"
      );

      const reels = JSON.parse(
        localStorage.getItem("savedReels") || "[]"
      );

      setSavedPosts(posts);
      setSavedReels(reels);
    };

    loadSavedItems();

    window.addEventListener("storage", loadSavedItems);

    return () => {
      window.removeEventListener("storage", loadSavedItems);
    };
  }, [activeTab]);

  return (
    <div className="profile-page">

      <div className="mobile-profile-topbar">
        <FiSettings className="mobile-top-icon" />

        <div className="mobile-top-username">
          <span>Mona</span>
          <FiChevronDown />
        </div>

        <div className="mobile-threads-icon">
          <FaThreads />
        </div>
      </div>

      <div className="profile-header">

        <div className="profile-avatar-wrapper">
          <div className="profile-note">Note...</div>

          <div className="profile-avatar">
            <img src="./Public/Profile.png" alt="" />
          </div>
        </div>

        <div className="profile-info">

          <div className="profile-username-row">
            <h2 className="profile-username">Mona</h2>
            <FiSettings className="profile-settings-icon" />
          </div>

          <div className="profile-stats">
            <span>
              <strong>0</strong> posts
            </span>

            <span>
              <strong>22</strong> followers
            </span>

            <span>
              <strong>27</strong> following
            </span>
          </div>

        </div>

        <div className="profile-actions">
          <button type="button" className="profile-btn">
            Edit Profile
          </button>

          <button type="button" className="profile-btn">
            View archive
          </button>
        </div>

      </div>

      <div className="profile-story-row">
        <div className="profile-story-add">

          <div className="profile-story-circle">
            <FiPlus />
          </div>

          <span>New</span>

        </div>
      </div>

      <div className="profile-tabs">

        <div
          className={`profile-tab ${
            activeTab === "posts" ? "active" : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <FiGrid />
        </div>

        <div
          className={`profile-tab ${
            activeTab === "saved" ? "active" : ""
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <FiBookmark />
        </div>

        <div
          className={`profile-tab ${
            activeTab === "tagged" ? "active" : ""
          }`}
          onClick={() => setActiveTab("tagged")}
        >
          <BsPersonSquare />
        </div>

      </div>

      {activeTab === "posts" && (
        <div className="profile-empty-state">

          <div className="profile-empty-icon">
            <FiCamera />
          </div>

          <h3>Share photos</h3>

          <p>
            When you share photos, they will appear on your profile.
          </p>

          <button
            type="button"
            className="profile-share-link"
          >
            Share your first photo
          </button>

        </div>
      )}

      {activeTab === "saved" && (
        <div className="profile-saved-section">

          {savedPosts.length === 0 && savedReels.length === 0 ? (
            <div className="profile-empty-state">

              <div className="profile-empty-icon">
                <FiBookmark />
              </div>

              <h3>Save</h3>

              <p>
                Only you can see what you've saved.
              </p>

            </div>
          ) : (
            <div className="profile-saved-grid">

              {savedPosts.map((post) => (
                <div
                  className="profile-saved-item"
                  key={`post-${post.id}`}
                >
                  <img
                    src={post.image}
                    alt={post.username}
                  />
                </div>
              ))}

              {savedReels.map((reel) => (
                <div
                  className="profile-saved-item"
                  key={`reel-${reel.id}`}
                >
                  <video
                    src={reel.video}
                    muted
                    playsInline
                  />

                  <span className="saved-reel-icon">
                    ▶
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>
      )}

      {activeTab === "tagged" && (
        <div className="profile-empty-state">

          <div className="profile-empty-icon">
            <BsPersonSquare />
          </div>

          <h3>Photos of you</h3>

          <p>
            When people tag you in photos, they'll appear here.
          </p>

        </div>
      )}

    <Sidebar
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        hideOnMobile={true}
      />

      {showNotifications &&
        createPortal(
          <Notification onClose={() => setShowNotifications(false)} />,
          document.body
        )}
      <Message />

    </div>
  );
};

export default Profile;


