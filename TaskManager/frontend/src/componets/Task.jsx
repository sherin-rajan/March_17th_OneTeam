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
            {task:editingText,description:editingDescription,is_completed:task.is_completed})
            stopEdit()
            fetchTask()
            alert("Task updated successfully")
    }
    const isCompleted=async(task)=>{
        const response=await axios.patch(`http://127.0.0.1:8000/api/details/${task.id}/`,
            {is_completed:!task.is_completed})
            fetchTask()
            alert("Status updated")
    }
    const deleteTask=async(task)=>{
        const response=await axios.delete(`http://127.0.0.1:8000/api/details/${task.id}/`)
        fetchTask()
        alert("Task has been deleted successfully")
    }

    return (
        <div className="task-app">
            <div className="task-card">
                <h1>My Tasks Management</h1>

                <form className="task-form" onSubmit={addTask}>
                    <div className="input-group">
                        <label>Task</label>
                        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" />
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details" />
                    </div>

                    <button type="submit" className="primary-btn">{loading ? "Saving..." : "Add Task"}</button>
                </form>

                <div className="task-list">
                    {tasks.map((task) => (
                        <div key={task.id} className={`task-item ${task.is_completed ? "completed" : ""}`}>
                            <div className="task-main">
                                <input type="checkbox" checked={task.is_completed} onChange={() => isCompleted(task)} className="task-check" />

                                {editingId === task.id ? (
                                    <div className="task-edit-box">
                                        <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                                        <input type="text" value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)} />
                                        <div className="task-actions">
                                            <button onClick={() => save(task)} className="primary-btn small-btn">Save</button>
                                            <button onClick={stopEdit} className="secondary-btn small-btn">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="task-content">
                                        <h3>{task.task}</h3>
                                        <p>{task.description}</p>
                                    </div>
                                )}
                            </div>

                            {editingId !== task.id && (
                                <div className="task-actions">
                                    <button onClick={() => startEdit(task)} className="secondary-btn small-btn">Edit</button>
                                    <button onClick={() => deleteTask(task)} className="danger-btn small-btn">Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default Task;