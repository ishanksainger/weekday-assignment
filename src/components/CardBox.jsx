import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Link } from "@mui/material";

// Component to render a single job card
const CardBox = ({ job }) => {
  return (
    // Render a Card component
    <Card className="grid-inner-card card-body">
      {/* Card content */}
      <CardContent className="card-content">
        {/* Company information */}
        <Box
          display="flex"
          alignItems="center"
          marginBottom={1}
          className="card-title"
        >
          {/* Company logo */}
          <Avatar
            alt={job.companyName}
            src={job.logoUrl} // Use the logoUrl from job object
            className="card-image"
          />
          {/* Company details */}
          <Box marginLeft={1}>
            <Typography variant="h6" component="h2" className="card-jobRole">
              {job.jobRole}
            </Typography>
            <Typography className="card-comp-name">
              {job.companyName}
            </Typography>
            <Typography className="card-job-loc">{job.location}</Typography>
          </Box>
        </Box>
        {/* Salary information */}
        <Typography variant="body2" component="p" className="card-salary">
          Estimated Salary: {job.minJdSalary}-${job.maxJdSalary} LPA✅
        </Typography>
        {/* Job description */}
        <Box className="card-job-desc">
          <Box>
            <Typography component="p" className="card-job-about">
              {" "}
              About the Role:{" "}
            </Typography>
            <Box variant="body2" component="p" className="card-job-content">
              {job.jobDetailsFromCompany}
            </Box>
          </Box>
        </Box>
        {/* View more link */}
        <Box className="card-view-more">
          <Link>View More:</Link>
        </Box>
        {/* Minimum experience */}
        <Box className="card-job-exp">
          <Typography component="h3">Minimum Experience</Typography>
          <Typography component="h2">{job.minExp}</Typography>
        </Box>
      </CardContent>
      {/* Apply button */}
      <Box className="card-job-btn">
        <Box className="card-job-btn-inner">
          <Button className="custom-btn">⚡ Easy Apply</Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CardBox;
