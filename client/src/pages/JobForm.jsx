import React,{useState} from "react";
import axios from "axios";
import './Form.css';

const JobForm =() =>{
    const [form,setForm]= useState({title:"",description:"",location:"",skillRequired:'',employerId:''});

    const handleChange =(e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/jobs',form);
            alert('job created');
        }catch(err){
            alert ('Job creation failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input  name="title" placeholder="Job Title" onChange={handleChange} required/>
            <input name="description" placeholder="Description" onChange={handleChange} required/>
            <input name="location" placeholder="Location" onChange={handleChange} required/>
            <input name="skillRequired" placeholder="Skill Required" onChange={handleChange} required/>
            <input name="employerId" placeholder="Employer ID" onChange={handleChange} required/>
            <button type="submit">Create Job</button>
        </form>
    );
};

export default JobForm;