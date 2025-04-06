import React, { useEffect, useState } from 'react';
import './Style.css';

function BudgetList({edit, setEdit}) {
  const [List, setList] = useState([]);
  
  const data = async () => {
    const fdata = await fetch("http://localhost:5000/api/getBudgetList", {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const jsonFData = await fdata.json();
    setList(jsonFData);
  };

  useEffect(() => {
    data();
    console.log(edit, " this is edit")
  }, [edit]);

  

  return (
    <div className='budget'>
      <h2>Budget List</h2>
      {List.length === 0 ? (
        <p>No data found.</p>
      ) : (
        List.map((budget, index) => (
          <div className='budget-card' onClick={()=>setEdit(budget._id)} key={index}>
            <h3>{budget.bName}</h3>
            <p><strong>Comment:</strong> {budget.Comment.length>3?budget.Comment:"Open Budget To View Comment"}</p>
            <p><strong>Created At:</strong> {new Date(budget.createdAt).toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default BudgetList;
