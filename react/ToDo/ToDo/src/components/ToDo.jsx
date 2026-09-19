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
            console.log("hi")
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
        console.log("Hi")
        setEditingId(todo.id)
        setEditingText(todo.task)
    }
    const stopEditing = () => {
        setEditingId(null)
        setEditingText("")
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
                        <li key={todo.id}>{todo.task}
                            {editingId == todo.id ?
                                <>
                                    <button>Save</button>
                                    <button onClick={stopEditing}>Cancel</button>
                                </> :
                                <button onClick={() => startEdit(todo)}>Edit</button>
                            }


                            <button>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ToDo;