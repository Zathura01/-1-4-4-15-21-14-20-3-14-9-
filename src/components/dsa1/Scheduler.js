import React, { useState } from 'react';
import './styleSch.css';
import Deletelist from './Deletelist';
import List from './List';
import Enter from './Enter';
import Midlist from './Midlist';

function Scheduler() {
    const [enter, setEnter] = useState("");
    const [list, setList] = useState([]);
    const [mid, setMid] = useState([]);
    const [del, setDel] = useState([]);

    return (
        <div className="scheduler-container">
            <Enter enter={enter} setEnter={setEnter} setList={setList} />

            <div className="task-sections">
                <div className="task-column list">
                    <h3>To Do</h3>
                    <List list={list} setList={setList} setMid={setMid} />
                </div>
                <div className="task-column mid">
                    <h3>In Progress</h3>
                    <Midlist mid={mid} setList={setList} setMid={setMid} setDel={setDel} />
                </div>
                <div className="task-column del">
                    <h3>Completed</h3>
                    <Deletelist del={del} setMid={setMid} setDel={setDel} />
                </div>
            </div>
        </div>
    );
}

export default Scheduler;
