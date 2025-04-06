import React, { useState } from 'react';
import './Style.css';
import Newbudget from './Newbudget';
import { Link, useNavigate  } from 'react-router-dom';

function Today({setbName, setGrid, edit, setEdit, setUserEditList}) {
  const [newModal, setNewModal] = useState(false);
  const navigate = useNavigate();

  const deleteBudget = async (edit) => {
    try {
      const response = await fetch("http://localhost:5000/api/deleteBudget", {
        method: "POST", // match with your backend
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: edit }) // assuming `edit` is the _id
      });
  
      const result = await response.json();
      setEdit(edit+1);
      setUserEditList(false);
      console.log("Deleted:", result);
    } catch (err) {
      console.error("Error deleting budget:", err);
    }
  };

  const setEditGrid=(edit)=>{
       console.log('edit ',edit)
       setUserEditList(true);
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className='today'>
        <div>
          <button className='longbuttons' onClick={() => {setNewModal(true); setUserEditList(false)}}>New Budget</button><br/>
          <button onClick={() => setEditGrid(edit)}>View Budget</button>
          <button onClick={() => deleteBudget(edit)}>Delete Budget</button>
          <br/>
          <button className='longbuttons'>Project Home</button><br/>
          <button onClick={logout} className='longbuttons'>Sign Out</button>
          
        </div>
      </div>

      <Newbudget setbName={setbName} setGrid={setGrid} flag={newModal} setFlag={setNewModal} />
    </>
  );
}

export default Today;
