import React, { useEffect, useState } from 'react';
import './styleSch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

function Enter({ enter, setEnter, setList }) {
  

const handleListSend=(e)=>{
e.preventDefault();
setList(function(prev){
  let newList = [...prev]
  newList.unshift(enter);
  return newList;
})
setEnter("");
}


  return (
    <>
      <form className='formEnter'>
        <input 
          value={enter} 
          name='enter' 
          onChange={(e) => setEnter(e.target.value)} 
          placeholder='Enter Task...' 
          className='btn Inp'
        />
        <button onClick={handleListSend} className='btn Inp'>
          <FontAwesomeIcon icon={faSquareCheck} size="2xl" />
        </button>
      </form>
    </>
  );
}

export default Enter;
