import React, { useState, useMemo, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { RiSendInsLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart as FaRegHeartOutline } from "react-icons/fa6";
import StoryViewer from "../Storyviewer/Storyviewer";
import "./MainSection.css";

const fetchPosts = () => {
  const basePosts = [
    {
      profile: "/pro1.png",
      username: "itz_nila",
      time: "46 m",
      image: "/post1.png",
      likes: 141,
      comments: 3,
      shares: 1,
      caption: "Beautiful memories ❤️",
    },
    {
      profile: "/pro2.png",
      username: "the_sri",
      time: "1 h",
      image: "/post2.png",
      likes: 89,
      comments: 5,
      shares: 2,
      caption: "Good moments ✨",
    },
    {
      profile: "/pro3.png",
      username: "crazzy_squad",
      time: "4 h",
      image: "/post3.png",
      likes: 150,
      comments: 50,
      shares: 10,
      caption: "Fresh blooms.",
    },
  ];

  return Promise.resolve(
    basePosts.map((post, index) => ({
      ...post,
      id: `p${index + 1}`,
    }))
  );
};

const MainSection = ({ showNotifications, setShowNotifications }) => {
  const stories = [
    { id: "s1", image: "/pro1.png", name: "its_nila_..." },
    { id: "s2", image: "/pro2.png", name: "the_sri..." },
    { id: "s3", image: "/pro3.png", name: "crazzy_squad..." },
    { id: "s4", image: "/pro4.png", name: "priya_..." },
    { id: "s5", image: "/pro5.png", name: "kavya_..." },
    { id: "s6", image: "/pro6.png", name: "sri_..." },
    { id: "s7", image: "/pro7.png", name: "arun_..." },
    { id: "s8", image: "/pro8.png", name: "divya_..." },
    { id: "s9", image: "/pro9.png", name: "rahul_..." },
    { id: "s10", image: "/pro10.png", name: "meena_..." },
  ];

  const actions = useMemo(
    () => [
      { type: "like", icon: <FaRegHeart /> },
      { type: "comment", icon: <FaRegComment /> },
      { type: "share", icon: <LuRepeat2 /> },
      { type: "send", icon: <RiSendInsLine /> },
    ],
    []
  );

  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [selectedStory, setSelectedStory] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((newPosts) => {
      setPosts(newPosts);

      const savedPosts = JSON.parse(
        localStorage.getItem("savedPosts") || "[]"
      );

      const savedState = {};

      savedPosts.forEach((post) => {
        savedState[post.id] = true;
      });

      setSaved(savedState);
    });
  }, []);

  const handleLike = (postId) => {
    setLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleSave = (postId) => {
    setSaved((prev) => {
      const isSaved = !prev[postId];

      const existing = JSON.parse(
        localStorage.getItem("savedPosts") || "[]"
      );

      const post = posts.find((item) => item.id === postId);

      let updated;

      if (isSaved) {
        updated = existing.some((item) => item.id === postId)
          ? existing
          : [...existing, { ...post, type: "post" }];
      } else {
        updated = existing.filter((item) => item.id !== postId);
      }

      localStorage.setItem("savedPosts", JSON.stringify(updated));

      return {
        ...prev,
        [postId]: isSaved,
      };
    });
  };

  const handleAction = (type, postId) => {
    switch (type) {
      case "like":
        handleLike(postId);
        break;

      case "comment":
        console.log("open comments for", postId);
        break;

      case "share":
        console.log("share post", postId);
        break;

      case "send":
        console.log("send post", postId);
        break;

      default:
        break;
    }
  };

  return (
    <main className="main-section">
    <div className={`mobile-topbar ${
    selectedStory !== null ? "story-open" : ""
    }`}>
        <div className="mobile-topbar-logo">Instagram</div>

        <div className="mobile-topbar-search">
          <IoSearchOutline />
          <input type="text" placeholder="Search" readOnly />
        </div>

        <div className="mobile-topbar-actions">
          <FaRegHeartOutline
            className="mobile-topbar-icon"
            onClick={() =>
              setShowNotifications && setShowNotifications(true)
            }
          />
        </div>
      </div>

      <div className="stories">
        {stories.map((story, index) => (
          <div
            className="story"
            key={story.id}
            onClick={() => setSelectedStory(index)}
          >
            <div className="story-image">
              <img src={story.image} alt={story.name} />
            </div>

            <p>{story.name}</p>
          </div>
        ))}
      </div>

      {selectedStory !== null && (
        <StoryViewer
          stories={stories}
          startIndex={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <img src={post.profile} alt={post.username} />

              <div className="post-user">
                <b>{post.username}</b>
                <span> • {post.time}</span>
              </div>

              <span
                className="dots"
                onClick={() => console.log("open menu for", post.id)}
              >
                •••
              </span>
            </div>

            <div className="post-image">
              <img src={post.image} alt="post" />
            </div>

            <div className="post-actions">
              <div className="left-actions">
                {actions.map((action) => (
                  <div
                    className={`action-item ${
                      action.type === "like" && liked[post.id]
                        ? "liked"
                        : ""
                    }`}
                    key={action.type}
                    onClick={() => handleAction(action.type, post.id)}
                  >
                    {action.type === "like" && liked[post.id] ? (
                      <FaHeart />
                    ) : (
                      action.icon
                    )}

                    {action.type === "like" && (
                      <span>
                        {post.likes + (liked[post.id] ? 1 : 0)}
                      </span>
                    )}

                    {action.type === "comment" && (
                      <span>{post.comments}</span>
                    )}

                    {action.type === "share" && (
                      <span>{post.shares}</span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="bookmark"
                onClick={() => handleSave(post.id)}
              >
                {saved[post.id] ? (
                  <FaBookmark />
                ) : (
                  <FaRegBookmark />
                )}
              </div>
            </div>

            <div className="post-caption">
              <b>{post.username}</b>{" "}
              <span>{post.caption}</span>
            </div>

            <div
              className="comments"
              onClick={() =>
                console.log("expand comments for", post.id)
              }
            >
              View all {post.comments} comments
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainSection;