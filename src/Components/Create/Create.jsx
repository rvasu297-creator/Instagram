import React, { useRef, useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import "./Create.css";

const Create = ({ onClose = () => {} }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="create-overlay">
      <button type="button" className="create-close" onClick={handleClose}>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="create-wrapper" onClick={(e) => e.stopPropagation()}>
        <h2 className="create-title">Create new post</h2>

        <div className="create-modal">
          <div className="create-body">
            {!selectedFile ? (
              <>
                <div className="create-media-icon">
                  <FaImage className="image-icon" />
                  <FaVideo className="video-icon" />
                </div>

                <h3>Drag photos and videos here</h3>

                <button
                  type="button"
                  className="select-computer-btn"
                  onClick={handleSelectFile}
                >
                  Select From Computer
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  hidden
                />
              </>
            ) : (
              <div className="selected-file">
                {selectedFile.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
                ) : (
                  <video src={URL.createObjectURL(selectedFile)} controls />
                )}

                <button
                  type="button"
                  className="change-file-btn"
                  onClick={handleSelectFile}
                >
                  Choose another
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  hidden
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;