import { useState } from "react"

function Register(){
    const [first_name,setFirstName]=useState("")
    const [last_name,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [con_password,setConPassword]=useState("")

    function submitData(e){
        e.preventDefault()
        console.log(first_name)
    }

    return(
    <>
    <h1>Register</h1>
    <form onSubmit={submitData}>
        <div>
            <label>First Name</label>
            <input type="text" name="first_name" onInput={(e)=>setFirstName(e.target.value)} value={first_name}/>
        </div>
        <div>
            <label>Last Name</label>
            <input type="text" name="last" onInput={(e)=>setLastName(e.target.value)} value={last_name}/>
        </div>
        <div>
            <label>E-mail</label>
            <input type="email" name="email" onInput={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" onInput={(e)=>setPassword(e.target.value)} value={password}/>
        </div>
        <div>
            <label>Confirm Password</label>
            <input type="text" name="con_password" onInput={(e)=>setConPassword(e.target.value)} value={con_password}/>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
    </>
    )
}

export default Register