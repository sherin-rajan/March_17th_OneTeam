import { useState } from "react"

function Home() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    function addTodo() {
        if (todo.trim() === "") {
            return;
        }

        setTodos([...todos, todo]);
        setTodo("");
    }

    function deleteTodo(index) {
        const newTodo = todos.filter((_, i) => i !== index);
        setTodos(newTodo);
    }

    return (
            <div>
                <input type="text" value={todo} onChange={(event) => setTodo(event.target.value)} />
                <button onClick={addTodo}>Add</button>

                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default Home;