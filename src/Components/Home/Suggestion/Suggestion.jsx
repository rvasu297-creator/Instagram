import React from "react";
import "./Suggestion.css";

const Suggestion = () => {

  const suggestions = [
    {
      image: "/sug2.png",
      name: "jay",
      text: "Following viji"
    },
    {
      image: "/sug1.png",
      name: " Maya",
      text: "Following viji + 1"
    },
    {
      image: "/sug3.png",
      name: "Poorni ...",
      text: "Followed by nila+ 3"
    },
    {
      image: "/sug4.png",
      name: "Eye killer💜",
      text: "Followed by __magic_mellow_"
    },
    {
      image: "/sug5.png",
      name: "Ammu",
      text: "Suggested for you"
    }
  ];

  return (
    <aside className="suggestion">
      <div className="my-profile">
        <img
          src="/profile.png"
          alt="profile"
        />
        <div className="my-profile-name">
          <b>Mona</b>
        </div>
        <button>Switch</button>
      </div>
      <div className="suggestion-heading">
        <b>Suggested for you</b>
        <span>See all</span>
      </div>
      <div className="suggestion-list">
        {suggestions.map((user, index) => (
          <div
            className="suggestion-user"
            key={index}
          >
            <img
              src={user.image}
              alt={user.name}
            />
            <div className="suggestion-info">
              <b>{user.name}</b>
              <p>{user.text}</p>
            </div>
            <button>Follow</button>
          </div>
        ))}
      </div>
      <div className="suggestion-footer">
        <p>
          About · Help · Press · API · Jobs · Privacy · Terms ·
          <br />
          Locations · Language · Meta Verified
        </p>
        <span>
          © 2026 INSTAGRAM FROM META
        </span>
      </div>
    </aside>
  );
};

export default Suggestion;