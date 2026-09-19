import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaSearch, FaPlay } from "react-icons/fa";
import "./Search.css";
import Sidebar from "../Home/Sidebar/Sidebar";
import Notification from "../Notifications/Notifications";
import Message from "../Home/Message/Message";
const searchGridData = [
  { id: 1, video: "/reels1.mp4", isVideo: true },
  { id: 2, video: "/reels2.mp4", isVideo: true },
  { id: 3, video: "/reels3.mp4", isVideo: true,},
  { id: 4, video: "/reels4.mp4", isVideo: true,},
  { id: 5, video: "/reels5.mp4", isVideo: true },
  { id: 6, video: "/reels6.mp4", isVideo: true },
  { id: 7, video: "/reels7.mp4", isVideo: true },
  { id: 8, video: "/reels8.mp4", isVideo: true },
  { id: 9, video: "/reels9.mp4", isVideo: true },
  { id: 10, video: "/reels10.mp4", isVideo: true },
  { id: 11, video: "/reels11.mp4", isVideo: true },
  { id: 12, video:"/reels12.mp4", isVideo: true },
  { id: 13, video:"/reels13.mp4", isVideo: true },
  { id: 14, video: "/reels14.mp4", isVideo: true },
  { id: 15, video:"/reels15.mp4", isVideo: true },
  { id: 16, video: "/reels16.mp4", isVideo: true },
  { id: 17, video: "/reels17.mp4", isVideo: true },
  { id: 18, video:"/reels18.mp4", isVideo: true },
  { id: 19, video:"/reels19.mp4", isVideo: true },
  { id: 20, video: "/reels20.mp4", isVideo: true },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="search-page">
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <FaSearch className="search-bar-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="search-grid-wrapper">
        <div className="search-grid">
          {searchGridData.map((item) => (
            <div className="search-grid-item" key={item.id}>
              <video
                src={item.video}
                className="search-grid-video"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
              {item.isVideo && <FaPlay className="grid-play-icon" />}
              {item.label && <span className="grid-label">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
         <Sidebar
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      {showNotifications &&
  createPortal(
    <Notification onClose={() => setShowNotifications(false)} />,
    document.body
  )}
    <Message/>
    </div>
  );
};

export default Search;