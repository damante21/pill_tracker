import axios from "axios";
import React from 'react'
import  { useNavigate  } from 'react-router-dom'

export default function Register(){

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            'username': e.target['username'].value,
            'email': e.target['email'].value,
            'password': e.target['password'].value
        }
        sendData(data)
    }

    const sendData = (data) => {
        axios.post(`http://127.0.0.1:8000/api/register/`, data)
        .then(res => {
            console.log(res.data);
            navigate('/login/')
        })
    }

    function loginButtonClick(e){
        e.preventDefault()
        navigate('/Login/')
      }



    return(
        <div>
        <form onSubmit={e => {handleSubmit(e)}}>
            <label>
                Username:
                <input type={'text'} name='username' required/><br/>
            </label>
            <label>
                Email:
                <input type={'text'} name='email' required/><br/>
            </label>
            <label>
                Password:
                <input type={'password'} name='password' required/><br/>
            </label>
            <input type='submit' value={'Submit'}></input>
        </form>
        <div>
            <p>Already have an account?</p>
            <button onClick={loginButtonClick}>Login</button>
        </div>
        </div>
    )
}