import React, { useState } from "react";
import "./Style.css";

function Newbudget({bName, setbName, setGrid, flag, setFlag }) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const [flagMonth, setFlagMonth] = useState(false);
  const [thisMonth, setThisMonth] = useState(new Date())
  const [age] = useState(2012);
  const [years, setYears] = useState([]);
  const defaultPlan = "1 MONTH";
const monthFr = new Date().getMonth() + 1;
const monthName = months[new Date().getMonth()].toUpperCase();
const year = new Date().getFullYear();
  const [budgetName, setBudgetName] = useState(`${year}/${monthFr}-${monthName} ${defaultPlan}`)
  const [budgetPlans, setBudgetPlans] = useState([
    '1 MONTH',
    '3 MONTH',
    '6 MONTH',
    '1 YEAR',
    '5 YEARS',
    '10 YEARS',
    'RETIREMENT',
    'CUSTOM'
  ])

  React.useEffect(() => {
    const generatedYears = [];
    for (let i = 0; i < 61; i++) {
      generatedYears.push(age + i);
    }
    setYears(generatedYears);
  }, [age]);

  const sendBudget =()=>{
    setFlag(false);
    setbName(budgetName)
    setGrid(true);

  }

  const setName =(e)=>{
    let selected = e.target.value;
    if(selected==="CUSTOM"){
     setFlagMonth(true);
    }else{
      setFlagMonth(false)
    let monthFr = thisMonth.getMonth()+1
    let name = thisMonth.getFullYear()+'/'+monthFr+'-'+months[thisMonth.getMonth() ].toUpperCase() + " "+ e.target.value 
    setBudgetName(name) 
    }
  }
  

  const handleClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setFlag(false);
    }
  };

  return (
    flag && (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content">
          <h2>New Budget</h2>

          <form className="budget-form">
            {/* Budget Term */}
            <div className="form-group">
              <label>Term of Budget</label>
              <select onChange={setName}>
              {
                budgetPlans.map((budgetPlan,i)=>(
                  <option key={i} value={budgetPlan} >{budgetPlan}</option>
                ))
              }
              </select>
            </div>

           {flagMonth &&
           <>
            <div className="form-group">
              <label>Start Date</label>
              <div className="select-container">
                <select>
                  {months.map((month, i) => (
                    <option key={i}>{month}</option>
                  ))}
                </select>
                <select>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>End Date</label>
              <div className="select-container">
                <select>
                  {months.map((month, i) => (
                    <option key={i}>{month}</option>
                  ))}
                </select>
                <select>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <input type="text" onChange={(e)=>setBudgetName(e.target.value)} placeholder="Budget Name" />
            </>
          }
          </form>
          {!flagMonth && <h5>Budget Name - {budgetName}</h5> }
          <button className="close-btn" onClick={sendBudget}>Start Budget</button>
          <button className="close-btn" onClick={() => setFlag(false)}>Close</button>
        </div>
      </div>
    )
  );
}

export default Newbudget;
