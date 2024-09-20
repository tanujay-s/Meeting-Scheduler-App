import React , {useState} from 'react';
import axios from '../api/axios';
import {useNavigate} from 'react-router-dom';
import './login.css';

const Login = () =>{
    const [formData, setFormData] = useState({email:'', password:''});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('/login',formData);
            alert(response.data.message);
            navigate('/user');
        } catch(error){
            console.error('Login error: ', error);
            alert('Login failed');
        }
    }

    return (
        <div className ='mainContainer'>
            <form onSubmit={handleSubmit}>
                <input 
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );

}

export default Login;