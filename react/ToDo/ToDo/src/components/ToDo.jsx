import { useEffect, useState } from "react"
import axios from "axios"

function ToDo() {
    const [task, setTask] = useState("")
    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState("")

    async function fetchTask() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/list-create-todo");
            setTodos(response.data)
        } catch {
            alert("Failed to fetch tasks")
        }
    }

    // Initial server synchronization belongs in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { fetchTask(); }, [])
    const addTask = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!task.trim()) {
            alert("Task cannot be empty")
            return;
        };
        try {
            await axios.post("http://127.0.0.1:8000/api/list-create-todo", { task })
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
        await axios.put(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`, { task: editingText, is_completed: todo.is_completed })
        stopEdit()
        fetchTask()
        alert("Task updated successfully")
    }
    const updateToDoStatus=async(todo)=>{
        await axios.patch(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`, { is_completed: !todo.is_completed })
        fetchTask()
        alert("Task status updated")
    }
    const deleteToDo=async(todo)=>{
        await axios.delete(`http://127.0.0.1:8000/api/get-update-delete-todo/${todo.id}`)
        fetchTask()
        alert("Want to delete the task?")
    }
    return (
        <section className="todo-page">
            <h1 className="page-heading">Your tasks, in one place.</h1>
            <p className="page-intro">Keep today moving with a simple list that stays out of your way.</p>
            <form className="task-form" onSubmit={addTask}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="What needs doing?" aria-label="New task" />
                <button className="primary-button" type="submit">{loading ? "Saving..." : "Add task"}</button>
            </form>
            <ul className="task-list">
                {
                    todos.map((todo) => (
                        <li className="task-item" key={todo.id}>
                            <input type="checkbox" checked={todo.is_completed} onChange={()=>updateToDoStatus(todo)}/>
                            {editingId == todo.id ?
                                <>
                                    <input type="text" value={editingText} onChange={(e)=>setEditingText(e.target.value)} />
                                    <button className="primary-button" onClick={()=>saveTaskText(todo)}>Save</button>
                                    <button className="ghost-button" onClick={stopEdit}>Cancel</button>
                                </> :
                                <>
                                    <span className="task-text">{todo.is_completed?<s>{todo.task}</s>:todo.task}</span>
                                    <div className="task-actions">
                                        <button className="ghost-button" onClick={() => startEdit(todo)}>Edit</button>
                                        <button className="danger-button" onClick={()=>deleteToDo(todo)}>Delete</button>
                                    </div>

                                </>
                            }


                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default ToDo;