import React, { useEffect, useState } from 'react'
import './Style.css';
import Grid from './Grid';
import Header from './Header';
import EditGrid from './EditGrid';



function Tools({bName, grid, edit, userEditList, setEdit, setGrid, setUserEditList}) {
    const [count, setCount] = useState([
        { type: "Income", c: 0 }, { type: "Investment", c: 0 }, { type: "Expense", c: 0 }, { type: "Saving", c: 0 }, { type: "Misc", c: 0 }
    ])


    useEffect(() => {

        console.log(count)

    }, [count])



    return (
        <>
            <div className='tools'>

               {/*  {
                    count.map((value, i) => {
                        return (
                            <div key={i}>
                                <label>{value.type} {value.c}</label>
                                <Grid/>
                                <br/>
                                <button onClick={() => setCount(prev => {
                                    let newCount = [...count];
                                    newCount[i] = { ...newCount[i], c: newCount[i].c + 1 }
                                    return newCount;
                                })}>Click</button>
                            </div>
                        )
                    })
                }
               */}{ grid && <>
               <Header  bName={bName}/>
                 <Grid bName={bName} edit={edit} setGrid={setGrid} setEdit={setEdit} /> 
               </> }
               {
                userEditList && <>
                  <EditGrid edit={edit} userEditList={userEditList} setEdit={setEdit} setUserEditList={setUserEditList} />
                </>
               }
            </div>
        </>
    )
}

export default Tools