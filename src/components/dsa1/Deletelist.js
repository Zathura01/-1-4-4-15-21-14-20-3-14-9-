import React, { useState } from 'react';
import './styleSch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function Deletelist({ del, setMid, setDel }) {
  const [dragItem, setDragItem] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    setDel((prev) => prev.slice(0, -1));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragItem) return;
    setMid((prev) => [dragItem, ...prev]);
    setDel((prev) => prev.filter((item) => item !== dragItem));
    setDragItem(null);
  };

  return (
    <div className="delete-container">
      {del.map((value, index) => (
        <h3
          key={index}
          className="delete-item"
          draggable
          onDragStart={() => setDragItem(value)}
        >
          {index + 1}: {value}
        </h3>
      ))}

      <div className="drop-box" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        ♻️ Recycle
      </div>

      <button className="btn delete-btn" onClick={handleDelete}>
        <FontAwesomeIcon icon={faDeleteLeft} size="2xl" /> Delete Last
      </button>

      {del.length > 0 && <h3 className="delete-text">Removing: {del[del.length - 1]}</h3>}
    </div>
  );
}

export default Deletelist;
