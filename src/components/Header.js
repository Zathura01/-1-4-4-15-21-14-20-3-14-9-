import React from 'react'

function Header({bName}) {
  return (
    <>
    <div className='header'>
        <h2>Budget Name: {bName} </h2>
    </div>
    </>
  )
}

export default Header