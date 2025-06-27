import React,{useState,useEffect} from "react";
import axios from "axios";
import job from "../../../server/models/job";

const Jobs =() =>{
    const [jobs,setJobs] =useState([]);
    const[jobData,setJobData] = useState({
        title:"",
        description:"",
        location:"",
        skillRequired:"",
        employerId:"",
    });

    const[userRole,setUserRole] =useState('');
    const[userId,setUserId] =useState('');

    useEffect(()=>{
        fetchJobs();
        const token = localStorage.getItem('token');
        if(token){
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUserId(decoded.id);

            axios.get('http://localhost:5000/api/users/')
                 .then(res=>{
                    const currentuser = res.data.find(user=>user.id=== decoded.id);
                    if(currentuser) setUserRole(currentuser.role);
                 });
        }
    },[]);

    const fetchJobs = async()=>{
        const res =await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
    };

    useEffect(()=>{
        fetchJobs();
    },[]);

    const handleChange =(e)=>{
        setJobData({...jobData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decoded = Json.parse(atob(token.split('.')[1]));
        jobData.employerId = decoded.id;
        await axios.post('http://localhost:5000/api/jobs', jobData);
        fetchJobs();
    };


  const handleApply = async (jobId) => {
    await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, { userId });
    fetchJobs();
  };


      return (
    <div className="jobs-page" style={{ padding: '2rem' }}>
      {userRole === 'employer' && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Create New Job</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="text" name="skillRequired" placeholder="Required Skill" onChange={handleChange} required />
            <button type="submit">Post Job</button>
          </form>
        </div>
      )}

      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <p><b>Location:</b> {job.location} | <b>Skill:</b> {job.skillRequired}</p>
            {userRole === 'worker' && !job.applicants.includes(userId) && (
              <button onClick={() => handleApply(job._id)}>Apply</button>
            )}
            {userRole === 'worker' && job.applicants.includes(userId) && (
              <p style={{ color: 'green' }}><i>Applied</i></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;