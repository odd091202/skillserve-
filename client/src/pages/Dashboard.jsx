import React,{useEffect,useState} from "react";
import axios from "axios";

const Dashboard =() =>{
  const[user,setUser]= useState(null);
  const[jobs,setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(token){
      const decoded =JSON.parse(atob(token.split('.')[1]));
      axios.get(`http://localhost:5000/api/users/${decoded.id}`)
         .then(res=>{
            setUser(res.data);
         });

      axios.get('http://localhost:5000/api/jobs')
         .then(res=>{
            setJobs(res.data);
         });
    }
  },[]);

  if(!user) return <p>Loading...</p>;

  const postedJobs = jobs.filter(job=> job.employerId ===user._id);
  const appliedJobs =jobs.filter(job=> job.applicants.includes(user._id));

  return (
    <div style={{padding:'2rem'}}>
     <h2>Welcome,{user.name}</h2>
     <p><strong>Email:</strong></p>
     <p><strong>Role:</strong></p>
     <p><strong>Location:</strong></p>
     {user.role === 'worker' && <p><strong>skill:</strong>{user.skill}</p>}

     {user.role ==='employer' && (
      <>
      <h3>Jobs you've Posted:</h3>
      <ul>
        {postedJobs.map(job=>(
          <li key={job._id}>
            {job.title} - {job.location}
            </li>
        ))}
      </ul>
     </>
  )}

  {user.role === 'worker' &&(
    <>
      <h3>Jobs you've Applied To:</h3>
      <ul>
        {appliedJobs.map(job=>(
          <li key={job.id}>
            {job.title} -{job.location}
          </li>
        ))}
      </ul>
    </>
  )}
  </div>
  );

};

export default Dashboard;