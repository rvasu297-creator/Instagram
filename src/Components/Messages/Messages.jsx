import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Home,
  PlaySquare,
  Search,
  Heart,
  PlusSquare,
  User,
  Menu,
  Grid3x3,
  Send,
  SquarePen,
  Phone,
  Video,
  Info,
  Smile,
  Mic,
  Image as ImageIcon,
  Sticker,
  ArrowLeft,
} from "lucide-react";
import "./Messages.css";
import Sidebar from "../Home/Sidebar/Sidebar";
import Notification from "../Notifications/Notifications";

const stories = [
  { id: 1, label: "Current\nobsession...", avatar: null, isNote: true },
  {
    id: 2,
    label: "Ondra Renda",
    sub: "Bombay Jayas...",
    avatar: "/pro1.png",
  },
];

const messages = [
  {
    id: 1,
    name: "saya",
    username: "saya",
    heart: true,
    preview: "reacted the message",
    time: "12h",
    avatar: "/msg2.png",
    unread: false,
    thread: [],
  },
  {
    id: 2,
    name: "Santhosh",
    username: "santhosh",
    preview: "liked the message",
    time: "22h",
    avatar: "/msg5.png",
    unread: true,
    thread: [],
  },
  {
    id: 3,
    name: "Nila",
    username: "Nila",
    preview: "You sent an attachment.",
    time: "22h",
    avatar: null,
    unread: false,
    thread: [],
  },
  {
    id: 4,
    name: "Sri",
    username: "Sri",
    preview: "Sent a photo",
    time: "1d",
    avatar: "/msg6.png",
    unread: true,
    thread: [],
  },
  {
    id: 5,
    name: "Raj",
    username: "Raj",
    preview: "Ok cool 👍",
    time: "1d",
    avatar: null,
    unread: false,
    thread: [],
  },
  {
    id: 6,
    name: "Vasu",
    username: "Vasu",
    preview: "You: See you tomorrow",
    time: "2d",
    avatar: "/msg1.png",
    unread: false,
    thread: [],
  },
  {
    id: 7,
    name: "Divya",
    username: "Divya",
    preview: "Sent a reel",
    time: "3d",
    avatar: "/msg7.png",
    unread: false,
    thread: [],
  },
  {
    id: 8,
    name: "Subha",
    username: "Subha",
    preview: "Started following you",
    time: "4d",
    avatar: "/msg3.png",
    unread: true,
    thread: [],
  },
  {
    id: 9,
    name: "Sapna",
    username: "Sapna",
    heart: true,
    preview: "reacted 😍 to your story",
    time: "5d",
    avatar: null,
    unread: false,
    thread: [],
  },
  {
    id: 10,
    name: "Zaya",
    username: "Zaya",
    preview: "You sent an attachment.",
    time: "1w",
    avatar: "/msg7.png",
    unread: false,
    thread: [],
  },
];

const navItems = [
  { icon: Home, active: false },
  { icon: PlaySquare, active: false },
  { icon: Send, active: true },
  { icon: Search, active: false },
  { icon: Heart, active: false, dot: true },
  { icon: PlusSquare, active: false },
  { icon: User, active: false },
  { icon: Menu, active: false },
  { icon: Grid3x3, active: false },
];

export default function Messages() {
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const selected = messages.find((m) => m.id === selectedId);

  return (
    <div className={`ig-app ${selectedId ? "ig-chat-open" : ""}`}>
      <aside className="ig-inbox">
        <header className="ig-inbox-header">
          <h1>
            Mona<span className="ig-chevron">⌄</span>
          </h1>
          <button className="ig-icon-btn" aria-label="New message">
            <SquarePen size={22} strokeWidth={1.8} />
          </button>
        </header>

        <div className="ig-search">
          <Search size={16} strokeWidth={2} />
          <span>Search</span>
        </div>

        <div className="ig-stories" style={{ display: "flex", gap: 14, padding: "0 20px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 68 }}>
            <div style={{ height: 46, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
              {editingNote ? (
                <input
                  autoFocus
                  value={note}
                  maxLength={40}
                  placeholder="Note..."
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={() => setEditingNote(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingNote(false)}
                  style={{
                    width: 90,
                    background: "#3a3b3c",
                    color: "#fff",
                    border: "none",
                    outline: "none",
                    borderRadius: 18,
                    padding: "8px 12px",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                />
              ) : (
                <div
                  onClick={() => setEditingNote(true)}
                  style={{
                    background: "#3a3b3c",
                    color: "#fff",
                    borderRadius: 18,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {note || "Note..."}
                </div>
              )}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #3a3b3c",
                }}
              />
            </div>
            <div
              onClick={() => setEditingNote(true)}
              style={{
                marginTop: 4,
                width: 56,
                height: 56,
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src="./profile.png"
                alt="Your note"
                style={{ width: 56, height: 56, objectFit: "cover", display: "block" }}
              />
            </div>
            <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#f5f5f5", textAlign: "center" }}>
              Your note
            </span>
          </div>

          {stories
            .filter((s) => s.avatar)
            .map((s) => (
              <div
                key={s.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 68 }}
              >
                <div style={{ height: 46, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#f5f5f5",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="4" width="3" height="16" rx="1.2" />
                      <rect x="10.5" y="4" width="3" height="16" rx="1.2" />
                      <rect x="18" y="4" width="3" height="16" rx="1.2" />
                    </svg>
                    {s.label}
                  </div>
                  {s.sub && (
                    <div style={{ fontSize: 11, color: "#a8a8a8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 90 }}>
                      {s.sub}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img src={s.avatar} alt={s.label} style={{ width: 56, height: 56, objectFit: "cover", display: "block" }} />
                </div>
                {s.id === 2 && (
                  <span style={{ marginTop: 4, fontSize: 13, color: "#d63b8e", textAlign: "center" }}>♥</span>
                )}
              </div>
            ))}
        </div>

        <div className="ig-tabs">
          <span className="ig-tab ig-tab-active">Messages</span>
          <span className="ig-tab">Requests</span>
        </div>

        <ul className="ig-message-list">
          {messages.map((m) => (
            <li
              className={`ig-message-item ${selectedId === m.id ? "ig-message-item-active" : ""}`}
              key={m.id}
              onClick={() => setSelectedId(m.id)}
            >
              <div className="ig-avatar">
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} />
                ) : (
                  <div className="ig-avatar-placeholder">
                    <User size={22} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <div className="ig-message-body">
                <div className="ig-message-name">
                  {m.name}
                  {m.heart && <span className="ig-name-heart">💗</span>}
                </div>
                <div className={`ig-message-preview ${m.unread ? "ig-unread" : ""}`}>
                  {m.preview} <span className="ig-dot">·</span> {m.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {selected ? (
        <main className="ig-chat">
          <header className="ig-chat-header">
            <div className="ig-chat-user">
              <button
                className="ig-back-btn"
                aria-label="Back"
                onClick={() => setSelectedId(null)}
              >
                <ArrowLeft size={22} strokeWidth={1.8} />
              </button>
              <div className="ig-avatar ig-chat-avatar">
                {selected.avatar ? (
                  <img src={selected.avatar} alt={selected.name} />
                ) : (
                  <div className="ig-avatar-placeholder">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <div className="ig-chat-userinfo">
                <span className="ig-chat-name">
                  {selected.name}
                  {selected.heart && <span className="ig-name-heart">💗</span>}
                </span>
                <span className="ig-chat-username">{selected.username}</span>
              </div>
            </div>
            <div className="ig-chat-actions">
              <Phone size={22} strokeWidth={1.7} />
              <Video size={24} strokeWidth={1.7} />
              <Info size={22} strokeWidth={1.7} />
            </div>
          </header>

          <div className="ig-chat-body">
            {selected.thread.length === 0 && (
              <div className="ig-chat-empty">No messages yet</div>
            )}
            {selected.thread.map((t) =>
              t.type === "shared-reel" ? (
                <div className="ig-reel-card" key={t.id}>
                  <div className="ig-reel-page">
                    <img src={t.pageAvatar} alt={t.page} className="ig-reel-page-avatar" />
                    <span>{t.page}</span>
                    <svg className="ig-verified" width="14" height="14" viewBox="0 0 24 24" fill="#3897f0">
                      <path d="M12 2l2.4 1.2 2.6-.6 1.6 2.2 2.6.6.6 2.6 2.2 1.6-.6 2.6L24 14l-1.2 2.4.6 2.6-2.2 1.6-.6 2.6-2.6.6-1.6 2.2-2.6-.6L12 22l-2.4-1.2-2.6.6-1.6-2.2-2.6-.6-.6-2.6L0 14l1.2-2.4L.6 9l2.2-1.6.6-2.6 2.6-.6L7.6 2 12 2z" />
                    </svg>
                  </div>
                  <div className="ig-reel-media">
                    <img src={t.image} alt="shared reel" />
                    <div className="ig-reel-playicon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="ig-reel-reaction">{t.reaction}</span>
                  </div>
                </div>
              ) : t.type === "profile-share" ? (
                <div className="ig-profile-share-card" key={t.id}>
                  <div className="ig-profile-share-avatar-ring">
                    {selected.avatar ? (
                      <img src={selected.avatar} alt={selected.name} />
                    ) : (
                      <div className="ig-avatar-placeholder">
                        <User size={30} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {(t.caption || t.caption2) && (
                    <div className="ig-profile-share-caption">
                      {t.caption && <span>{t.caption}</span>}
                      {t.caption2 && <span>{t.caption2}</span>}
                    </div>
                  )}

                  <div className="ig-profile-share-username">
                    {selected.username} <span className="ig-profile-share-dot">·</span> Instagram
                  </div>

                  <button className="ig-profile-share-btn">View Profile</button>

                  <div className="ig-profile-share-time">{t.timestamp}</div>
                </div>
              ) : null
            )}
          </div>

          <div className="ig-chat-input-bar">
            <Smile size={22} strokeWidth={1.7} />
            <input className="ig-chat-input" placeholder="Message..." />
            <div className="ig-chat-input-icons">
              <Mic size={20} strokeWidth={1.7} />
              <ImageIcon size={20} strokeWidth={1.7} />
              <Sticker size={20} strokeWidth={1.7} />
            </div>
          </div>
        </main>
      ) : (
        <main className="ig-empty-state">
          <div className="ig-empty-circle">
            <Send size={40} strokeWidth={1.5} />
          </div>
          <h2>Your messages</h2>
          <p>Send private photos and messages to a friend or group.</p>
          <button className="ig-send-btn">Send message</button>
        </main>
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
    </div>
  );
}