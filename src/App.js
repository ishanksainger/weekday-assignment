import { useEffect, useState } from "react";
import "./App.css";
import { setJobs, setLoading } from "./slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./components/Cards";

function App() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {loading } = useSelector((state) => state.jobs);

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



  return (
    <div className="mainContainer">
      <div className="innerContainer">
        {/* Show loader if data is loading */}
        {loading ? (
          <div className="custom-loader-outer">
            <div className="custom-loader-inner"></div>
          </div>
        ) : 
          
          <Cards/> // Show job cards
        }
      </div>
    </div>
  );
}

export default App;
