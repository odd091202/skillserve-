import React,{useEffect,useState} from "react";
import axios from 'axios';
import './Jobs.css';

const JobList =() => {
    const [jobs,setJobs] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/jobs')
           .then(res=>setJobs(res.data))
           .catch(err=> console.log(err));
    },[]);

    return(
        <div>
            <h2 className="page-title">Jobs</h2>
            {jobs.map(job=>(
                <div key={job.id} className="job-card">
                    <h4>{job.title}</h4>
                    <p>{job.description}</p>
                    <p><strong>Location:</strong></p>
                    <p><strong>Skill Required:</strong>{job.skillRequired}</p>
                </div>
            ))

            }
        </div>
    );

};

export default JobList;