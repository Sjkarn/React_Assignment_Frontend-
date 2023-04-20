import { useState } from 'react';
import axios from 'axios';
import "./CreateStudent.css";

export default function MyApp() {
    const [name , setname]=useState("")
    const [email , setemail]=useState("")
    const [roll , setroll]=useState("")
    const [course , setcourse]=useState("")
    
    const HandleSubmit= (e)=>{
      e.preventDefault()
      
      let obj={
         name:name,
         email:email,
         roll:roll,
         course:course,
      }
      axios.post("http://localhost:3001/student",obj).then((e)=>{
        window.location.href = 'http://localhost:3000/student_details';
      console.log(e)
    })
    }

return (
    <div>
     <form onSubmit={HandleSubmit}>
        <div className='box'>
        <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roll</th>
          <th>Course</th>
        </tr>
      </table>
      <div className='input-box'>
      <input type="text" placeholder="Enter name" value={name} onChange={((e)=>setname(e.target.value))} required></input>
      <input type="text" placeholder="Enter email" value={email} onChange={((e)=>setemail(e.target.value))} required></input>
      <input type="text" placeholder="Enter roll" value={roll} onChange={((e)=>setroll(e.target.value))} required></input>
      <input type="text" placeholder="Enter course" value={course} onChange={((e)=>setcourse(e.target.value))} required></input>
      </div>
      <button className='btn'>
        Submit
      </button>
        </div>
      </form>
    </div>
  );
}