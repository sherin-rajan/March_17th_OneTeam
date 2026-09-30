import { useState,useEffect } from "react";
import axios from "axios"
 function Task(){
    const [task, setTask]=useState("")
    const [description, setDescription]=useState("")
    const [tasks, setTasks]=useState([])
    const [loading, setLoading]=useState(false)
    
    useEffect(()=>{fetchTask()},[])

    const addTask=async(e)=>{
        e.preventDefault();
        setLoading(true)
        if (!task.trim()){
            alert("Task cannot be empty")
            return;
        }
        try{
            const response=await axios.post("http://127.0.0.1:8000/api/list-create/",{task:task,description:description})
            alert("New task added")
        }catch{
            alert("Failed to add task")
        }finally{
            setTask("")
            setLoading(false)
            fetchTask()
        }
    }
    const fetchTask=async()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/list-create/")
            setTasks(response.data)
        }catch{
            alert("Failed to fetch tasks")
        }
    }

    return(
        <div>
            <h1>My Tasks Management</h1>
            <form onSubmit={addTask}>
                <label>Task : </label>
                <input type="text" value={task} onInput={(e)=>setTask(e.target.value)}/>
                <label>Description : </label>
                <input type="text" value={description} onInput={(e)=>setDescription(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>
      {tasks.map((task)=>(
        <div key={task.id}>
           <h3>{task.task}</h3>
           <p>{task.description}</p>
        </div>
      ))}
        </div>
    )

 }
 export default Task;