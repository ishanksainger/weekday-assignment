import React from "react";
import CardBox from "./CardBox";
import Grid from "@mui/material/Grid";

// Component to render job cards
const Cards = () => {
  const {jobs } = useSelector((state) => state.jobs);

  return (
    // Render a grid container with spacing
    <Grid container spacing={2}>
      {/* Map through jobs array and render CardBox for each job */}
      {jobs &&
        jobs.map(
          (job) =>
            job.minExp && ( // Check if minExp exists
              // Render a grid item for each job
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className="grid-outer-card"
                key={job.jdUid} // Use job's unique id as key
              >
                {/* Render CardBox component for the current job */}
                <CardBox job={job} />
              </Grid>
            )
        )}
    </Grid>
  );
};

export default Cards;
