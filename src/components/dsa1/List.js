import React, { useEffect, useState } from 'react';
import './styleSch.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function List({ list, setList, setMid }) {
  const [dragItem, setDragItem] = useState(null);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (dragItem) {
      setList((prev) => prev.filter((item) => item !== dragItem));
      setMid((prev) => [dragItem, ...prev]); // Add to Midlist
      setDragItem(null);
    }
  };

  return (
    <div className="list-container">
      {list.map((value, index) => (
        <h3
          key={index}
          className="list-item"
          draggable
          onDragStart={() => setDragItem(value)}
        >
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
           {value}
        </h3>
      ))}

      <div
        className="drop-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        📥 Send To In Process
      </div>
    </div>
  );
}

export default List;
