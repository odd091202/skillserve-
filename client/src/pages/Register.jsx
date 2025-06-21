import React,{useState} from "react";
import axios from "axios";
import'./Form.css';

const Register =()=>{
    const [form,setForm] = useState({name:"",email:"",password:"",role:'',skill:'',location:""});

    const handleChange =(e) => {
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/users/register',form);
            alert('Registered Successfully');
        }catch(err){
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input name="name" placeholder="Name" onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
            <input name="role" placeholder="Role (worker/employer)" onChange={handleChange} required/>
            <input name="skill" placeholder="skill" onChange={handleChange}/>
            <input name="location" placeholder="Location" onChange={handleChange}/>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;