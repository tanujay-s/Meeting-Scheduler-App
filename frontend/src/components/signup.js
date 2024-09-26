import React, {useState} from 'react';
import axios from '../api/axios';
import {useNavigate} from 'react-router-dom';
import './login.css';

const Signup = () =>{
        const [formData, setFormData] = useState({name:'',email:'',password:''});
        const navigate = useNavigate();

        const handleChange = (e)=>{
            setFormData({...formData, [e.target.name]: e.target.value});
        }

        const handleSubmit = async (e)=>{
            e.preventDefault();
            try{
                const response = await axios.post('/register',formData);
                alert(response.data.message);
                navigate('/login');
            } catch (error){
                console.error(error);
                alert('Sign Up failed');
            }
        }
    return (
        <div className='mainContainer'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name = 'name'
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <input 
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type='submit'>Signup</button> 
            </form>
        </div>
    );
}

export default Signup;