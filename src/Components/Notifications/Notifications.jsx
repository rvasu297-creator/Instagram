import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./Notifications.css";

const TABS = ["All", "People you follow", "Comments", "Follows", "Tags and mentions", "Verified"];


const followRequests = {
  avatars: ["/msg7.png", "/msg3.png"],
  text: "The_Sky + 3 others",
};


const allData = {
  thisMonth: [
    { id: 1, type: "follow", avatar: "/msg3.png", username: "Nila", action: "started following you.", time: "28 Aug", following: true },
    { id: 2, type: "system", text: "Reminder: Review Instagram's Terms of Use and Privacy Policy", time: "22 Aug" },
  ],
  earlier: [
    { id: 3, type: "follow", avatar: "/msg4.png", username: "Raj", action: "started following you.", time: "15 Jul", following: true },
    { id: 4, type: "follow", avatar: "/msg2.png", username: "Saya", action: "started following you.", time: "11 Jul", following: true },
  ],
};


const followsData = {
  list: [
    { id: 1, avatar: "/msg1.png", username: "Vasu", action: "started following you.", time: "28 Aug", following: true },
    { id: 2, avatar: "/msg2.png", username: "Saya", action: "started following you.", time: "15 Jul", following: true },
    { id: 3, avatar: null, username: "Sapna", action: "started following you.", time: "11 Jul", following: true },
    { id: 4, avatar: "/msg6.png", username: "", action: "started following you.", time: "03 Jul", following: true },
    { id: 5, avatar: "/msg4.png", username: "Jay", action: "started following you.", time: "25 Jun", following: false },
    { id: 6, avatar: null, username: "The_Sky", action: "started following you.", time: "20 Jun", following: true },
  ],
};

const Notification = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("All");
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const renderFollowRow = (item) => (
    <div className="notif-row" key={item.id}>
      <div
        className="notif-avatar"
        style={item.avatar ? { backgroundImage: `url(${item.avatar})` } : {}}
      />
      <div className="notif-text">
        <span className="notif-username">{item.username}</span>{" "}
        <span>{item.action}</span>{" "}
        <span className="notif-time">{item.time}</span>
      </div>
      <button
        className={`notif-following-btn ${!item.following ? "follow-back" : ""}`}
      >
        {item.following ? "Following" : "Follow Back"}
      </button>
    </div>
  );

  const renderSystemRow = (item) => (
    <div className="notif-row" key={item.id}>
      <div className="notif-avatar notif-shield">
        <div className="notif-shield-icon" />
      </div>
      <div className="notif-text">
        <span>{item.text}</span> <span className="notif-time">{item.time}</span>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "All") {
      return (
        <>
          <div className="notif-section">
            <h4>This month</h4>
            {allData.thisMonth.map((item) =>
              item.type === "system" ? renderSystemRow(item) : renderFollowRow(item)
            )}
          </div>
          <div className="notif-section">
            <h4>Earlier</h4>
            {allData.earlier.map((item) => renderFollowRow(item))}
          </div>
        </>
      );
    }

    if (activeTab === "Follows") {
      return (
        <div className="notif-section no-title">
          {followsData.list.map((item) => renderFollowRow(item))}
        </div>
      );
    }

    return (
      <div className="notif-empty">
        <p>Nothing to show here yet</p>
      </div>
    );
  };

  return (
    <div className="notif-overlay">
      <div className="notif-panel" ref={panelRef}>
        <div className="notif-header">
          <h2>Notifications</h2>
          <button
            type="button"
            className="notif-close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="notif-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`notif-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="notif-body">
          <div className="notif-row notif-requests-row">
            <div className="notif-avatar-group">
              {followRequests.avatars.slice(0, 2).map((a, i) => (
                <div
                  key={i}
                  className="notif-avatar stacked"
                  style={{ backgroundImage: `url(${a})` }}
                />
              ))}
            </div>
            <div className="notif-text">
              <span className="notif-username">Follow requests</span>
              <div className="notif-subtext">{followRequests.text}</div>
            </div>
            <div className="notif-dot" />
            <span className="notif-arrow">›</span>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Notification;