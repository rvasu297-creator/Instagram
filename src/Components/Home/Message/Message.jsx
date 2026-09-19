import React, { useState, useRef, useEffect } from "react";
import {
  RiSendInsLine,
  RiCloseLine,
  RiExpandDiagonalLine,
  RiPencilLine,
} from "react-icons/ri";
import "./Message.css";


const chats = [
  {
    id: 1,
    name: "Santhosh",
    preview: "Santhosh sent an att...",
    time: "4h",
    img: "/msg5.png",
    bold: true,
    online: false,
  },
  {
    id: 2,
    name: "vasu",
    preview: "You: Mm",
    time: "1w",
    img: "/msg1.png",
    online: false,
  },
  {
    id: 3,
    name: "sri",
    preview: "Active now",
    time: "",
    img: "/msg6.png",
    online: true,
  },
  {
    id: 4,
    name: "raj",
    preview: "You: Mm",
    time: "2w",
    img: "/msg4.png",
    online: false,
  },
  {
    id: 5,
    name: "Saya ",
    preview: "",
    time: "3w",
    img: "/msg2.png",
    online: false,
  },
  {
    id: 6,
    name: "zaya",
    preview: "🧿 🖤",
    time: "4w",
    img: "/msg7.png",
    online: false,
  },
  {
    id: 7,
    name: "subha",
    preview: "",
    time: "",
    img: "/msg3.png",
    online: false,
  },
];

const Message = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="message-wrapper" ref={panelRef}>
      {open && (
        <div className="message-panel">
          <div className="panel-header">
            <h3>Messages</h3>
            <div className="panel-header-icons">
              <RiExpandDiagonalLine className="panel-icon" />
              <RiCloseLine
                className="panel-icon"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>

          <div className="panel-chats">
            {chats.map((c) => (
              <div className="chat-item" key={c.id}>
                <div className="chat-avatar-wrap">
                  {c.noImg ? (
                    <div className="chat-avatar chat-avatar-blank" />
                  ) : (
                    <img src={c.img} alt={c.name} className="chat-avatar" />
                  )}
                  {c.online && <span className="online-dot" />}
                </div>
                <div className="chat-info">
                  <p className={c.bold ? "chat-name bold" : "chat-name"}>
                    {c.name}
                  </p>
                  <p className={c.bold ? "chat-preview bold" : "chat-preview"}>
                    {c.preview}
                    {c.time && <span> · {c.time}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="panel-fab">
            <RiPencilLine />
          </div>
        </div>
      )}

      <div className="message-box" onClick={() => setOpen((prev) => !prev)}>
        <div className="message-left">
          <RiSendInsLine className="message-icon" />
          <span className="message-count">1</span>
          <b>Messages</b>
        </div>

        <img src="/msg4.png" alt="profile" className="message-profile" />
      </div>
    </div>
  );
};

export default Message;