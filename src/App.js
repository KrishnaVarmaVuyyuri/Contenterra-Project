import React, { useEffect, useState } from 'react'
import './App.css'



function App()
{
  let [list, updateList]=useState([]);
  useEffect(()=>{
    Getapi()
  },[])

  async function Getapi()
  {
    let res = await fetch('https://www.reddit.com/r/reactjs.json')
    let jdata =await  res.json()
    updateList(jdata.data.children)
    console.log({list})
  }

  return(
    <div className='d1'>  
      {list.map((i)=><p className='card'><strong>Title :</strong> {i.data.title}<br/>
      <strong>SelfText HTML :</strong> {i.data.selftext_html}<br/>
      <strong>URL :</strong>{i.data.url}<br/>
      <strong>Score : </strong>{i.data.score}
      </p>)}
     
    </div>)
}

export default App;

    