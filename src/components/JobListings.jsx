import React from "react";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "../components/Spinner";

const JobListings = ({ isHomePage = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHomePage ? "/api/jobs?_limit=3" : "/api/jobs"
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching in data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  //const jobs = data.jobs;
  // const joblistings = isHomePage ? jobs.slice(0, 3) : jobs;
  // console.log(jobs);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHomePage ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {/* <!-- Job Listing 1 --> */}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
