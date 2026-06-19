import { useState } from "react";

function Login(){
    const [formData,setFormData]=useState({
        username:"",
        password:""
    })  

    function handleChange(e) {
        const {name,value}=e.target;

        setFormData((previous)=>({
            ...previous,
            [name]:value,
        }))
    }

    function submitData(e){
        e.preventDefault();
        console.log(formData);
        console.log(formData.username);
        console.log(formData.password);
    }

    return(
        <>
        <h1>Login</h1>
        <form onSubmit={submitData}>
            <div>
                <label>Username</label>
                <input type="text"  
                name="username" 
                value={formData.username} 
                onChange={handleChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password"  
                name="password" 
                value={formData.password} 
                onChange={handleChange}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
        </>
    )
}

export default Login