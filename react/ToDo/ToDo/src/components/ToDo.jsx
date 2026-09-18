import { useState } from "react"
import axios from "axios"

function ToDo(){
    const [task,setTask]=useState("")
    const [loading,setLoading]=useState(false)
    const addTask=async(e)=>{
        e.preventDefault();
        setLoading(true)
        if (!task.trim()){
            alert("Task cannot be empty")
            return;
        };
        try{
            const response=await axios.post("http://127.0.0.1:8000/api/list-create-todo",{task})
            console.log(response.data)
            alert("New task added")
        }catch{
            alert("Failed to add task")
        }finally{
            setTask("")
            setLoading(false)
        }
    }
    return (
        <div>
            <h1>ToDo</h1>
            <form onSubmit={addTask}>
                <input type="text" value={task} onInput={(e)=>setTask(e.target.value)}/>
                <button type="submit">{loading?"Saving...":"Add Task"}</button>
            </form>
        </div>
    )
}

export default ToDo;