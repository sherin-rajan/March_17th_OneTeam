import { useState, useEffect } from "react";
import axios from "axios"
function Task() {
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState("")
    const [editingDescription, setEditingDescription]=useState("")

    useEffect(() => { fetchTask() }, [])

    const addTask = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!task.trim()) {
            alert("Task cannot be empty")
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/list-create/", { task: task, description: description })
            alert("New task added")
        } catch {
            alert("Failed to add task")
        } finally {
            setTask("")
            setDescription("")
            setLoading(false)
            fetchTask()
        }
    }
    const fetchTask = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/list-create/")
            setTasks(response.data)
        } catch {
            alert("Failed to fetch tasks")
        }
    }
    const startEdit = (task) => {
        setEditingId(task.id)
        setEditingText(task.task)
        setEditingDescription(task.description)
    }
    const stopEdit = () => {
        setEditingId(null)
        setEditingText("")
        setEditingDescription("")
    }
    const save=async(task)=>{
        const response=await axios.put(`http://127.0.0.1:8000/api/details/${task.id}/`,
            {task:editingText,description:editingDescription,is_completed:!task.is_completed})
            stopEdit()
            fetchTask()
            alert("Task updated successfully")
    }
    const isCompleted=async(task)=>{
        const response=await axios.patch(`http://127.0.0.1:8000/api/details/${task.id}/`,
            {is_completed:task.is_completed})
            fetchTask()
            alert("Status updated")
    }
    const deleteTask=async(task)=>{
        const response=await axios.delete(`http://127.0.0.1:8000/api/details/${task.id}/`)
        fetchTask()
        alert("Task has been deleted successfully")
    }

    return (
        <div>
            <h1>My Tasks Management</h1>
            <form onSubmit={addTask}>
                <label>Task : </label>
                <input type="text" value={task} onInput={(e) => setTask(e.target.value)} />
                <label>Description : </label>
                <input type="text" value={description} onInput={(e) => setDescription(e.target.value)} />
                <button type="submit">{loading ? "Saving..." : "Add Task"}</button>
            </form>
            <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <input type="checkbox" checked={task.is_completed} onChange={()=>isCompleted(task)} />
                    {editingId === task.id ?
                    <>
                        <input type="text" value={editingText} onInput={(e)=>setEditingText(e.target.value)} />
                        <input type="text" value={editingDescription} onInput={(e=>setEditingDescription(e.target.value))} />
                        <button onClick={()=>save(task)}>Save</button>
                        <button onClick={stopEdit}>Cancel</button>
                    </> :
                    <>
                    <h3>{task.task}</h3>
                    <p>{task.description}</p>
                    <button onClick={()=>startEdit(task)}>Edit</button>
                    <button onClick={()=>deleteTask(task)}>delete</button>
                    </>
                    }
                </div>
            ))}
            </div>
        </div>
    )

}
export default Task;