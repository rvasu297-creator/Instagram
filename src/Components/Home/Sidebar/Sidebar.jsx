import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { LuSquarePlay } from "react-icons/lu";
import { RiSendInsLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import { LuLayoutGrid } from "react-icons/lu";
import { LuImagePlus } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

import Create from "../../Create/Create";

import "./Sidebar.css";

const Sidebar = ({
  showNotifications = false,
  setShowNotifications = () => {},
  hideOnMobile = false,
}) => {
  const [open, setOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMeta, setShowMeta] = useState(false);

  const navigate = useNavigate();

  const moreMenuRef = useRef(null);
  const moreButtonRef = useRef(null);
  const metaMenuRef = useRef(null);
  const metaButtonRef = useRef(null);
  const createWrapperRef = useRef(null);

  const handleMoreClick = () => {
    setShowMore((prev) => !prev);
    setShowMeta(false);
  };

  const handleMetaClick = () => {
    setShowMeta((prev) => !prev);
    setShowMore(false);
  };

  const closeMoreAndMeta = () => {
    setShowMore(false);
    setShowMeta(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showMore &&
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setShowMore(false);
      }

      if (
        showMeta &&
        metaMenuRef.current &&
        !metaMenuRef.current.contains(event.target) &&
        metaButtonRef.current &&
        !metaButtonRef.current.contains(event.target)
      ) {
        setShowMeta(false);
      }

      if (
        showCreate &&
        createWrapperRef.current &&
        !createWrapperRef.current.contains(event.target)
      ) {
        setShowCreate(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMore, showMeta, showCreate]);

  const menuItems = [
    {
      icon: <GrHomeRounded />,
      name: "Home",
      path: "/homepage",
    },
    {
      icon: <LuSquarePlay />,
      name: "Reels",
      path: "/reels",
    },
    {
      icon: <RiSendInsLine />,
      name: "Messages",
      path: "/messages",
    },
    {
      icon: <IoSearch />,
      name: "Search",
      path: "/search",
    },
    {
      icon: <FaRegHeart />,
      name: "Notifications",
    },
    {
      icon: <AiOutlinePlus />,
      name: "Create",
    },
    {
      icon: (
        <img
          src="/profile.png"
          alt="Profile"
          className="profile-icon"
        />
      ),
      name: "Profile",
      path: "/profile",
    },
  ];

  const bottomItems = [
    {
      icon: <LuMenu />,
      name: "More",
    },
    {
      icon: <LuLayoutGrid className="meta-icon" />,
      name: "Also from Meta",
    },
  ];

  const handleItemClick = (item) => {
    if (item.name === "Home") {
      closeMoreAndMeta();
      setShowCreate(false);
      setShowNotifications(false);
      navigate(item.path);
      return;
    }

    if (item.name === "Notifications") {
      setShowNotifications((prev) => !prev);
      setShowCreate(false);
      return;
    }

    if (item.name === "Create") {
      setShowCreate((prev) => !prev);
      setShowNotifications(false);
      return;
    }

    if (item.path) {
      setShowCreate(false);
      setShowNotifications(false);
      navigate(item.path);
    }
  };

  const handlePostClick = () => {
    setCreatePost(true);
    setShowCreate(false);
  };

  const handleCloseCreate = () => {
    setCreatePost(false);
  };

  return createPortal(
    <>
      <aside
        className={`sidebar ${open ? "open" : ""} ${
          hideOnMobile ? "sidebar-hide-mobile" : ""
        }`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!showMore && !showMeta) {
            setOpen(false);
          }
        }}
      >
        <div
          className="instagram-logo"
          onClick={() => {
            closeMoreAndMeta();
            setShowCreate(false);
            setShowNotifications(false);
            navigate("/homepage");
          }}
        >
          <FaInstagram />
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => {
            if (item.name === "Create") {
              return (
                <div
                  className="create-nav-wrapper"
                  key={index}
                  ref={createWrapperRef}
                >
                  <div
                    className="sidebar-item"
                    data-name={item.name}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon}
                    {open && <span>{item.name}</span>}
                  </div>

                  {showCreate && (
                    <div
                      className="create-post-item"
                      onClick={handlePostClick}
                    >
                      <span>Post</span>
                      <LuImagePlus />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`sidebar-item ${
                  item.name === "Notifications" && showNotifications
                    ? "active"
                    : ""
                }`}
                data-name={item.name}
                onClick={() => handleItemClick(item)}
              >
                {item.icon}

                {open && <span>{item.name}</span>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          {bottomItems.map((item, index) => (
            <React.Fragment key={index}>
              <div
                ref={
                  item.name === "More"
                    ? moreButtonRef
                    : item.name === "Also from Meta"
                    ? metaButtonRef
                    : null
                }
                className={`sidebar-item ${
                  (item.name === "More" && showMore) ||
                  (item.name === "Also from Meta" && showMeta)
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (item.name === "More") {
                    handleMoreClick();
                  } else if (item.name === "Also from Meta") {
                    handleMetaClick();
                  }
                }}
              >
                {item.icon}

                {open && <span>{item.name}</span>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </aside>

      {showMore && (
        <div className="more-menu" ref={moreMenuRef}>
          <div className="more-menu-item">
            <FiSettings />
            <span>Settings</span>
          </div>

          <div className="more-menu-item">
            <FiActivity />
            <span>Your Activity</span>
          </div>

          <div className="more-menu-item">
            <FiBookmark />
            <span>Saved</span>
          </div>

          <div className="more-menu-item">
            <FiMoon />
            <span>Switch appearance</span>
          </div>

          <div className="more-menu-item">
            <FiAlertCircle />
            <span>Report a problem</span>
          </div>

          <div className="more-divider"></div>

          <div className="more-menu-item">
            <FaThreads />
            <span>Threads</span>
          </div>

          <div className="more-divider"></div>

          <div className="more-menu-item">
            <span>Switch accounts</span>
          </div>

          <div className="more-divider"></div>

          <div className="more-menu-item">
            <span>Log out</span>
          </div>
        </div>
      )}

      {showMeta && (
        <div className="meta-menu" ref={metaMenuRef}>
          <div className="meta-menu-item">
            <div className="meta-ai-icon">◯</div>
            <span>Meta AI</span>
          </div>

          <div className="meta-menu-item">
            <FaWhatsapp />
            <span>WhatsApp</span>
          </div>

          <div className="meta-menu-item">
            <FaThreads />
            <span>Threads</span>
          </div>
        </div>
      )}

      {createPost && <Create onClose={handleCloseCreate} />}
    </>,
    document.body
  );
};

export default Sidebar;