import { useState } from "react";

function Counter(){
    const [count,setCount]=useState(0)
    function increment(){
        setCount(count+1)
    }
    function decrement(){
        setCount(count-1)
    }

    return(
        <div>
            <h1>Counter : {count}</h1>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Counter;