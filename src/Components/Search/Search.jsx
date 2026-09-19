import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaSearch, FaPlay } from "react-icons/fa";
import "./Search.css";
import Sidebar from "../Home/Sidebar/Sidebar";
import Notification from "../Notifications/Notifications";
import Message from "../Home/Message/Message";
const searchGridData = [
  { id: 1, video: "/public/reels1.mp4", isVideo: true },
  { id: 2, video: "/public/reels2.mp4", isVideo: true },
  { id: 3, video: "/public/reels3.mp4", isVideo: true,},
  { id: 4, video: "/public/reels4.mp4", isVideo: true,},
  { id: 5, video: "/public/reels5.mp4", isVideo: true },
  { id: 6, video: "/public/reels6.mp4", isVideo: true },
  { id: 7, video: "/public/reels7.mp4", isVideo: true },
  { id: 8, video: "/public/reels8.mp4", isVideo: true },
  { id: 9, video: "/public/reels9.mp4", isVideo: true },
  { id: 10, video: "/public/reels10.mp4", isVideo: true },
  { id: 11, video: "/public/reels11.mp4", isVideo: true },
  { id: 12, video:"/public/reels12.mp4", isVideo: true },
  { id: 13, video:"/public/reels13.mp4", isVideo: true },
  { id: 14, video: "/public/reels14.mp4", isVideo: true },
  { id: 15, video:"/public/reels15.mp4", isVideo: true },
  { id: 16, video: "/public/reels16.mp4", isVideo: true },
  { id: 17, video: "/public/reels17.mp4", isVideo: true },
  { id: 18, video:"/public/reels18.mp4", isVideo: true },
  { id: 19, video:"/public/reels19.mp4", isVideo: true },
  { id: 20, video: "/public/reels20.mp4", isVideo: true },
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