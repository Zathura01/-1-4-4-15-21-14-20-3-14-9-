import React, { useState, useEffect } from 'react';
import './styleSch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function Midlist({ mid, setList, setMid, setDel }) {
  const [dragItem, setDragItem] = useState(null);

  useEffect(() => {
    console.log(mid);
  }, [mid]);

  const handleDeleteSend = (e) => {
    e.preventDefault();
    if (mid.length === 0) return;

    setDel((prev) => [mid[mid.length - 1], ...prev]);
    setMid((prev) => prev.slice(0, -1));
  };

  const handleDragStart = (e, value) => {
    setDragItem(value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragItem) return;

    setMid((prev) => prev.filter((item) => item !== dragItem));
    setList((prev) => [dragItem, ...prev]);
    setDragItem(null);
  };

  return (
    <div className="midlist-container">
      {mid.map((value, index) => (
        <h3
          className="midlist-item"
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, value)}
        >
          {index + 1}: {value}
        </h3>
      ))}

      {/* Drop area */}
      <div className="drop-box" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        📥 Send To Do
      </div>

      <button className="btn delete-btn" onClick={handleDeleteSend}>
        <FontAwesomeIcon icon={faDeleteLeft} size="2xl" /> Remove Last
      </button>

      {mid.length > 0 && <h3 className="delete-text">Sending: {mid[mid.length - 1]} To Bin</h3>}
    </div>
  );
}

export default Midlist;
