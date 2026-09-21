import { useEffect, useState } from "react"
import axios from "axios"

function ToDo() {
    const [task, setTask] = useState("")
    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState("")

    useEffect(() => { fetchTask() }, [])

    const fetchTask = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/list-create-todo");
            setTodos(response.data)
        } catch {
            alert("Failed to fetch tasks")
        }
    }
    const addTask = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!task.trim()) {
            alert("Task cannot be empty")
            return;
        };
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/list-create-todo", { task })
            console.log(response.data)
            alert("New task added")
        } catch {
            alert("Failed to add task")
        } finally {
            setTask("")
            setLoading(false)
            fetchTask()
        }
    }
    const startEdit = (todo) => {
        setEditingId(todo.id)
        setEditingText(todo.task)
    }
    const stopEdit = () => {
        setEditingId(null)
        setEditingText("")
    }
    const saveTaskText=async(todo)=>{
        const response=await axios.put(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`,{task:editingText,is_completed:todo.is_completed})
        stopEdit()
        fetchTask()
        alert("Task updated successfully")
    }
    const updateToDoStatus=async(todo)=>{
        const response=await axios.patch(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`,{is_completed:!todo.is_completed})
        fetchTask()
        alert("Task status updated")
    }
    const deleteToDo=async(todo)=>{
        const response=await axios.delete(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`)
        fetchTask()
        alert("Want to delete the task?")
    }
    return (
        <div>
            <h1>ToDo</h1>
            <form onSubmit={addTask}>
                <input type="text" value={task} onInput={(e) => setTask(e.target.value)} />
                <button type="submit">{loading ? "Saving..." : "Add Task"}</button>
            </form>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.is_completed} onChange={()=>updateToDoStatus(todo)}/>
                            {editingId == todo.id ?
                                <>
                                    <input type="text" value={editingText} onChange={(e)=>setEditingText(e.target.value)} />
                                    <button onClick={()=>saveTaskText(todo)}>Save</button>
                                    <button onClick={stopEdit}>Cancel</button>
                                </> :
                                <>
                                    {todo.is_completed?<s>{todo.task}</s>:<>{todo.task}</>}
                                    <button onClick={() => startEdit(todo)}>Edit</button>

                                </>
                            }


                            <button onClick={()=>deleteToDo(todo)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ToDo;