import { useEffect, useState } from "react";
import "./App.css";
import { setJobs, setLoading } from "./slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./components/Cards";
import SearchBar from "./components/SearchBar";
import { Avatar, Box, Typography } from "@mui/material";

function App() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const [searchCriteria, setSearchCriteria] = useState({});

  // Fetch jobs data when page or loading state changes
  useEffect(() => {
    dispatch(setLoading(true)); // Set loading state to true when fetching data

    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: 10,
          offset: (page - 1) * 10,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        // Send request to API to fetch jobs data
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );

        // Check if response is successful
        if (!response) {
          throw new Error("Failed to Fetch Data");
        }

        // Parse response data
        const data = await response.json();
        const jobsData = data.jdList;

        // Update Redux store with fetched jobs data
        if (page === 1) {
          dispatch(setJobs(jobsData));
        } else {
          dispatch(setJobs([...jobs, ...jobsData]));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false)); // Set loading state to false after fetching data
      }
    };

    fetchData(); // Call fetchData function
  }, [page, dispatch]);

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  // Update search criteria
  const handleSearchInputChange = (field, value) => {
    setSearchCriteria({ ...searchCriteria, [field]: value });
  };

  // Filter jobs based on search criteria
  const filteredJobs = useSelector((state) => {
    const { jobs } = state.jobs;
    if (Object.keys(searchCriteria).length === 0) {
      return jobs; // Return all jobs if search criteria are empty
    }
    return jobs.filter((job) => {
      // Check if each field matches the search criteria

      const jobRoleMatches =
        !searchCriteria.jobRole ||
        searchCriteria.jobRole.length === 0 ||
        searchCriteria.jobRole.some((role) =>
          job.jobRole.toLowerCase().includes(role.toLowerCase())
        );

      const companyNameMatch =
        !searchCriteria.companyName ||
        job.companyName
          .toLowerCase()
          .includes(searchCriteria.companyName.toLowerCase());
      const locationMatch =
        !searchCriteria.location ||
        job.location
          .toLowerCase()
          .includes(searchCriteria.location.toLowerCase());

      const minExpMatch =
        !searchCriteria.minExp ||
        searchCriteria.minExp.length === 0 ||
        searchCriteria.minExp.some(
          (minExp) => job.minExp >= minExp // Compare numerical values directly
        );
      const minJdSalaryMatch =
        !searchCriteria.minJdSalary ||
        searchCriteria.minJdSalary.length === 0 ||
        searchCriteria.minJdSalary.some((minJdSalary) => {
          // Convert minJdSalary string to number and remove "L" suffix
          const minJdSalaryNumber = parseInt(minJdSalary.replace("L", ""), 10);
          // Check if job.minJdSalary is defined and is greater than or equal to minJdSalaryNumber
          return job.minJdSalary && job.minJdSalary >= minJdSalaryNumber;
        });
      const totalEmployeesMatch =
        !searchCriteria.totalEmployees ||
        searchCriteria.totalEmployees.length === 0 ||
        searchCriteria.totalEmployees.some(
          (totalEmployees) =>
            job.totalEmployees &&
            job.totalEmployees
              .toString()
              .toLowerCase()
              .includes(totalEmployees.toLowerCase())
        );
      const techStackMatch =
        !searchCriteria.techStack ||
        searchCriteria.techStack.length === 0 ||
        searchCriteria.techStack.some(
          (tech) =>
            job.techStack &&
            job.techStack.toLowerCase().includes(tech.toLowerCase())
        );
      const remoteMatch =
        !searchCriteria.remote ||
        searchCriteria.remote.length === 0 ||
        searchCriteria.remote.some(
          (remote) =>
            job.remote &&
            job.remote.toLowerCase().includes(remote.toLowerCase())
        );

      return (
        jobRoleMatches &&
        companyNameMatch &&
        locationMatch &&
        minExpMatch &&
        minJdSalaryMatch &&
        totalEmployeesMatch &&
        techStackMatch &&
        remoteMatch
      );
    });
  });

  return (
    <div className="mainContainer">
      <SearchBar onSearchInputChange={handleSearchInputChange} />
      <div className="innerContainer">
        {/* Show loader if data is loading */}
        {
          loading ? (
            <div className="custom-loader-outer">
              <div className="custom-loader-inner"></div>
            </div>
          ) : (
            <Cards jobs={filteredJobs} />
          ) // Show job cards
        }
      </div>
    </div>
  );
}

export default App;
