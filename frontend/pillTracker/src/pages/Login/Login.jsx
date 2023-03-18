import React, {useState} from 'react'

export default function Login(){

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

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

    return(
        <form id="loginform" onSubmit={loginSubmit}>
                <label>Username</label>
                <input
                  type="username"
                  id="UsernameInput"
                  name="UsernameInput"
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              <button type="submit">
                Login
              </button>
              </form>

    )
}