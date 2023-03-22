import React, {useState} from 'react'
import  { useNavigate  } from 'react-router-dom'


export default function Login(){

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    async function loginSubmit(e) {
        e.preventDefault()
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/api-token-auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/'
          } else {
            localStorage.removeItem('token');
            alert('Login failed');
          }
        } catch (error) {
          alert('Something went wrong.')
          console.error(error);
        } 
      }

      function registerButtonClick(e){
        e.preventDefault()
        navigate('/register/')
      }

    return(
      <div>
        <form id="loginform" onSubmit={loginSubmit}>
          <label>Username</label>
            <input
              type="username"
              id="UsernameInput"
              name="UsernameInput"
              placeholder="Enter username"
              onChange={(event) => setUsername(event.target.value)}
            /><br/>
          <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            /><br/>
          <button type="submit">
              Login
          </button>
        </form><br/>
        <div>
          <p>Need an account?</p>
          <button onClick={registerButtonClick}>Register</button>
        </div>
      </div>



    )
}