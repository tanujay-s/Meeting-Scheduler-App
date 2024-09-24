import React , {useState, useContext} from 'react';
import axios from '../api/axios';
import { AuthContext } from '../AuthContext';
import './login.css';

const Login = () =>{
    const [formData, setFormData] = useState({email:'', password:''});
    const { login } = useContext(AuthContext);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('/login',formData);
            alert(response.data.message); 
            const userData = response.data.user;
            login({
                user: userData.email,
                userId: userData._id, 
                isAdmin: userData.role === 'admin'  
              });
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
                    autoComplete="on"
                />
                <input 
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="on"
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );

}

export default Login;