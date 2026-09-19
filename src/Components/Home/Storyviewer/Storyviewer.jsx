import React, { useState, useEffect, useRef } from "react";

import {
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaEllipsisH,
  FaRegHeart,
} from "react-icons/fa";

import { MdVerified } from "react-icons/md";
import {
  IoSend,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

import "./Storyviewer.css";

const STORY_DURATION = 5000;

const Storyviewer = ({ stories = [], startIndex = 0, onClose = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [reply, setReply] = useState("");

  const intervalRef = useRef(null);

  const activeStory = stories[activeIndex];

  const closeStories = () => {
    onClose();
  };

  const goNext = () => {
    setProgress(0);

    if (activeIndex < stories.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      closeStories();
    }
  };

  const goPrev = () => {
    setProgress(0);

    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isPaused || !activeStory) return;

    setProgress(0);

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = (elapsed / STORY_DURATION) * 100;

      if (percentage >= 100) {
        clearInterval(intervalRef.current);

        if (activeIndex < stories.length - 1) {
          setActiveIndex((prev) => prev + 1);
          setProgress(0);
        } else {
          closeStories();
        }
      } else {
        setProgress(percentage);
      }
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [activeIndex, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeStories();
      }

      if (e.key === "ArrowRight") {
        goNext();
      }

      if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, stories.length]);

  if (!activeStory) {
    return (
      <div className="story-not-found">
        <h2>Story not found</h2>

        <button onClick={closeStories}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="stories-page">
      <div className="stories-page-logo">Instagram</div>

      <button className="stories-page-close" onClick={closeStories}>
        <FaTimes />
      </button>

      <div className="stories-page-content">
        {activeIndex > 0 && (
          <div className="story-side story-side-left">
            <button className="story-nav-arrow" onClick={goPrev}>
              <IoChevronBack />
            </button>

            <div className="story-side-thumb" onClick={goPrev}>
              <img src={stories[activeIndex - 1].image} alt="" />

              <div className="story-side-info">
                <span>{stories[activeIndex - 1].name}</span>
                <small>{stories[activeIndex - 1].time || "1h"}</small>
              </div>
            </div>
          </div>
        )}

        <div className="story-main">
          <div className="story-progress-bar">
            <div
              className="story-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="story-header">
            <img
              className="story-avatar"
              src={activeStory.image}
              alt={activeStory.name}
            />

            <div className="story-user-info">
              <div className="story-username">
                {activeStory.name}

                {activeStory.verified && (
                  <MdVerified className="story-verified-icon" />
                )}
              </div>

              <span className="story-time">
                {activeStory.time || "1h"}
              </span>
            </div>

            <div className="story-header-actions">
              <button
                className="story-icon-btn"
                onClick={() => setIsMuted((prev) => !prev)}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

              <button
                className="story-icon-btn"
                onClick={() => setIsPaused((prev) => !prev)}
              >
                {isPaused ? <FaPlay /> : <FaPause />}
              </button>

              <button className="story-icon-btn">
                <FaEllipsisH />
              </button>
            </div>
          </div>

          <div className="story-content">
            <img
              src={activeStory.image}
              alt={activeStory.name}
              className="story-media"
            />

            {activeStory.caption && (
              <div className="story-caption-overlay">
                {activeStory.caption}
              </div>
            )}
          </div>

          <div className="story-footer">
            <div className="story-reply-box">
              <input
                type="text"
                placeholder={`Reply to ${activeStory.name}...`}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>

            <button className="story-footer-icon">
              <FaRegHeart />
            </button>

            <button className="story-footer-icon">
              <IoSend />
            </button>
          </div>
        </div>

        {activeIndex < stories.length - 1 && (
          <div className="story-side story-side-right">
            <div className="story-side-thumb" onClick={goNext}>
              <img src={stories[activeIndex + 1].image} alt="" />

              <div className="story-side-info">
                <span>{stories[activeIndex + 1].name}</span>
                <small>{stories[activeIndex + 1].time || "1h"}</small>
              </div>
            </div>

            <button className="story-nav-arrow" onClick={goNext}>
              <IoChevronForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Storyviewer;