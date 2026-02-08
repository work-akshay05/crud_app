import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './app.scss'
import { useEffect } from 'react'


const Card = ({note}) => {
  const [showInput,setShowInput]=useState(false);
  const [des, setDes]=useState("");
  
  return (
    <div className='card'>
        <h1 className='title'>{note.title}</h1>
        <p className='description'>{note.description}</p>
        <button onClick={()=>{
          axios.delete(`https://crud-app-kxxw.onrender.com/api/notes/${note._id}`)
          .then((res)=>{
            console.log(res);
          })
        }}>Delete</button>
        <button onClick={() => setShowInput(!showInput)}>update</button>
        
        {showInput && 
          <form onSubmit={(e) => {
            e.preventDefault();
            axios.patch(`https://crud-app-kxxw.onrender.com/api/notes/${note._id}`, {description:des})
            .then((res) => {
              console.log(res);
              axios.get('https://crud-app-kxxw.onrender.com/api/notes')
                .then((res)=>{
                  console.log(res.data.notes);
                }
              ) 
            })
            .catch((err) => { console.log(err) });
            setDes("");
            setShowInput(false);
          }}>
            <input 
              type="text"
              placeholder='type something'
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
        }
    </div>
  )
}


const App = () => {
    const [arr, setArr] = useState([])
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const fetchData=()=>{
      axios.get('https://crud-app-kxxw.onrender.com/api/notes')
        .then((res)=>{
          console.log(res.data.notes);
          setArr(res.data.notes);
        }
      )
    }
    useEffect(() => {
      fetchData();
    }, []);

    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(title,description);
      axios.post('https://crud-app-kxxw.onrender.com/api/notes',{title,description})
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.error(err);
      })
      setTitle("");
      setDescription("");
      fetchData();
    }
    

  return (
    <div className='hero'>
      <form action="" className='form' onSubmit={submitHandler}>
        <input 
        type="text" 
        placeholder='title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <input 
        type="text" 
        placeholder='description' 
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />

        <button >submit</button>
      </form>
      <div className='cardHolder'>
      
        {arr.map((note) => {
            return <Card note={note}/>
        })}
    </div>
    </div>
    
  )
}

export default App;