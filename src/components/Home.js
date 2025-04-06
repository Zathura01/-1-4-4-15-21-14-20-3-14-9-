import React, { useState } from 'react';
import BudgetList from './BudgetList';
import Today from './Today';
import Tools from './Tools';
import Stats from './Stats';
import './Style.css';
import CalendarComponent from './CalendarComponent';

function Home() {
  const [bName, setbName] = useState("");
  const [grid, setGrid] = useState(false);
  const [edit, setEdit] = useState(0);
  const [userEditList, setUserEditList] = useState(false);


  return (
    <div className='Home'>
      <BudgetList edit={edit} setEdit={setEdit}/>
      <div className='mid'>
        <div className='top'>
          <Today edit={edit} setbName={setbName} setGrid={setGrid} setEdit={setEdit} setUserEditList={setUserEditList} />
          <Stats />
        </div>
        <div className='bottom'>
          <Tools bName={bName} edit={edit} grid={grid} userEditList={userEditList} setEdit={setEdit} setGrid={setGrid} setUserEditList={setUserEditList} className='tools' />
          <CalendarComponent className='calendar' />
        </div>
      </div>
    </div>
  );
}

export default Home;
