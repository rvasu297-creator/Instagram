import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { RiSendInsLine } from "react-icons/ri";
import { IoChevronUp, IoChevronDown, IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import "./Reels.css";
import Sidebar from "../Home/Sidebar/Sidebar";
import Notification from "../Notifications/Notifications";
import Message from "../Home/Message/Message";
const Reels = () => {
  const reels = [
    {
      id: 1,
      video: "/reels1.mp4",
      profile: "/pro1.png",
      username: "akshara.indhu",
      caption: "Edhachum caption - Charu",
      hashtags: "#fyp #tamil #baddies #viral #transition",
      music: "invi Shah, Madhan Karky . Mona G",
      likes: "95.8K",
      comments: 412,
      shares: 351,
    },
    {
      id: 2,
      video: "/reels2.mp4",
      profile: "/pro2.png",
      username: "the_sri",
      caption: "Good vibes only ✨",
      hashtags: "#reels #trending #tamilnadu",
      music: "Original audio",
      likes: "42.1K",
      comments: 210,
      shares: 98,
    },
    {
      id: 3,
      video: "/reels3.mp4",
      profile: "/pro3.png",
      username: "crazzy_squad",
      caption: "Squad goals 🔥",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 50,
      shares: 10,
    },
     {
      id: 4,
      video: "/reels4.mp4",
      profile: "/pro5.png",
      username: "sri",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 40,
      shares: 10,
    },
    {
      id: 5,
      video: "/reels5.mp4",
      profile: "/pro6.png",
      username: "itz_maya",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: "1k",
      shares: "10K",
    },
    {
      id: 6,
      video: "/reels6.mp4",
      profile: "/pro7.png",
      username: "The_Poorni",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 900,
      shares: 100,
    },
    {
      id: 7,
      video: "/reels7.mp4",
      profile: "/pro8.png",
      username: "Jay",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 400,
      shares: 100,
    },
    {
      id: 8,
      video: "/reels8.mp4",
      profile: "/pro9.png",
      username: "Vasu",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 1000,
      shares: "20k",
    },
    {
      id: 9,
      video: "/reels9.mp4",
      profile: "/pro10.png",
      username: "sri",
      caption: "Itz_santhosh",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 900,
      shares: 100,
    },
    {
      id: 10,
      video: "/reels10.mp4",
      profile: "/pro1.png",
      username: "Eye Killer",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 800,
      shares: 900,
    },
    {
      id: 11,
      video: "/reels11.mp4",
      profile: "/pro5.png",
      username: "sri",
      caption: "Ammu",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 450,
      shares: 1000,
    },
    {
      id: 12,
      video: "/reels12.mp4",
      profile: "/pro5.png",
      username: "sri",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 300,
      shares: 100,
    },
    {
      id: 13,
      video: "/reels13.mp4",
      profile: "/pro2.png",
      username: "saya",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 800,
      shares: 200,
    },
    {
      id: 14,
      video: "/reels14.mp4",
      profile: "/pro3.png",
      username: "Zaya",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 700,
      shares: 100,
    },
    {
      id: 15,
      video: "/reels15.mp4",
      profile: "/pro4.png",
      username: "sri",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 40,
      shares: 10,
    },
    {
      id: 16,
      video: "/reels16.mp4",
      profile: "/pro5.png",
      username: "Nila",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 600,
      shares: 700,
    },
    {
      id: 17,
      video: "/reels17.mp4",
      profile: "/pro6.png",
      username: "sri",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 40,
      shares: 10,
    },
    {
      id: 18,
      video: "/reels18.mp4",
      profile: "/pro7.png",
      username: "subha",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 40,
      shares: 10,
    },
    {
      id: 19,
      video: "/reels19.mp4",
      profile: "/pro8.png",
      username: "Itz_Sapna",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: "50k",
      shares: 900,
    },
     {
      id: 20,
      video: "/reels20.mp4",
      profile: "/pro9.png",
      username: "jay",
      caption: "cute",
      hashtags: "#friends #fun #masti",
      music: "Trending sound - Unknown",
      likes: "150K",
      comments: 800,
      shares: 500,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  useEffect(() => {
  const savedReels = JSON.parse(
    localStorage.getItem("savedReels") || "[]"
  );

  const savedState = {};

  savedReels.forEach((reel) => {
    savedState[reel.id] = true;
  });

  setSaved(savedState);
}, []);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);


  const goNext = () => {
    if (current < reels.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };


  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
  };

  const handleWheel = (e) => {
    if (isScrolling.current) return; // avoid skipping multiple reels on one scroll gesture
    if (e.deltaY > 30) {
      goNext();
      isScrolling.current = true;
      setTimeout(() => (isScrolling.current = false), 500);
    } else if (e.deltaY < -30) {
      goPrev();
      isScrolling.current = true;
      setTimeout(() => (isScrolling.current = false), 500);
    }
  };

 const toggleLike = (id) => {
  setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
};

const toggleSave = (id) => {
  setSaved((prev) => {
    const isSaved = !prev[id];

    const existing = JSON.parse(
      localStorage.getItem("savedReels") || "[]"
    );

    const reel = reels.find((item) => item.id === id);

    let updated;

    if (isSaved) {
      updated = existing.some((item) => item.id === id)
        ? existing
        : [...existing, { ...reel, type: "reel" }];
    } else {
      updated = existing.filter((item) => item.id !== id);
    }

    localStorage.setItem("savedReels", JSON.stringify(updated));

    return {
      ...prev,
      [id]: isSaved,
    };
  });
};

const reel = reels[current];

  return (
    <div
      className="reels-page"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="reels-container">
        <div className="reel-video-wrapper">
          <video
            ref={videoRef}
            key={reel.id}
            className="reel-video"
            src={reel.video}
            autoPlay
            loop
            muted={muted}
            playsInline
          />

          <button
            className="mute-btn"
            onClick={() => setMuted((m) => !m)}
          >
            {muted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>

          
          <div className="reel-info">
            <div className="reel-user-row">
              <img src={reel.profile} alt={reel.username} className="reel-profile-pic" />
              <span className="reel-username">{reel.username}</span>
              <span className="verified-dot">✔</span>
              <button className="follow-btn">Follow</button>
            </div>

            <div className="reel-music-row">
              <span>♫ {reel.music}</span>
            </div>

            <div className="reel-caption">{reel.caption}</div>
            <div className="reel-hashtags">{reel.hashtags}</div>
          </div>
        </div>

  
        <div className="reel-actions">
          <div
            className="reel-action-item"
            onClick={() => toggleLike(reel.id)}
          >
            {liked[reel.id] ? (
              <FaHeart className="liked-icon" />
            ) : (
              <FaRegHeart />
            )}
            <span>{reel.likes}</span>
          </div>

          <div className="reel-action-item">
            <FaRegComment />
            <span>{reel.comments}</span>
          </div>

          <div className="reel-action-item">
            <LuRepeat2 />
            <span>{reel.shares}</span>
          </div>

          <div
            className="reel-action-item"
            onClick={() => toggleSave(reel.id)}
          >
            {saved[reel.id] ? <FaBookmark /> : <FaRegBookmark />}
          </div>

          <div className="reel-action-item">
            <HiDotsHorizontal />
          </div>

          <div className="reel-action-item mini-thumb">
            <img src={reel.profile} alt="thumb" />
          </div>
        </div>
      </div>

   
      <div className="reel-nav-buttons">
        <button
          className="reel-nav-btn"
          onClick={goPrev}
          disabled={current === 0}
        >
          <IoChevronUp />
        </button>
        <button
          className="reel-nav-btn"
          onClick={goNext}
          disabled={current === reels.length - 1}
        >
          <IoChevronDown />
        </button>
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

export default Reels;