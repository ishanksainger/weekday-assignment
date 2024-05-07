import { Box, Grid } from "@mui/material";
import React from "react";
import jobRoles from "../data/rolesData";
import numberOfEmployees from "../data/totalEmployessData";
import remoteData from "../data/remoteData";
import experienceData from "../data/experienceData";
import techStack from "../data/techStack";
import placeholderData from "../data/placeholderData";
import SearchInput from "./SearchInput"; // Assuming the SearchInput component file location
import payData from "../data/payData";
import InputTextField from "./InputTextField";
import labelsData from "../data/labelsData";

// Function to generate TextField with desired styles

const SearchBar = ({ onSearchInputChange  }) => {
  const dataFileNames = {
    data1: jobRoles,
    data2: numberOfEmployees,
    data3: remoteData,
    data4: experienceData,
    data5: techStack,
    data6: payData,
  };
  return (
    <Grid container spacing={2} className="search-container">
      {/* Map through each data set and generate corresponding SearchInput component */}
      {Object.entries(dataFileNames).map(([key, data], index) => (
        <Box item key={key} className="input-box">
          {/* Render SearchInput component with appropriate props */}
          <SearchInput
            data={data}
            placeHolder={placeholderData[index]}
            // Pass the label data and input value to the parent component
            onInputChange={(value) => onSearchInputChange(labelsData[index], value)}
          />
        </Box>
      ))}
      {/* Reusing the StyledTextField component for additional search fields */}
      <Box sx={{ margin: "2px 5px 2px 0 !important" }}>
        <InputTextField
          id="outlined-search-1"
          placeholder="Company Name"
          // Pass the input value to the parent component with the label "companyName"
          onInputChange={(value) => onSearchInputChange("companyName", value)}
        />
      </Box>
      <Box sx={{ margin: "2px 5px 2px 0 !important" }}>
        <InputTextField
          id="outlined-search-2"
          placeholder="Location"
          // Pass the input value to the parent component with the label "location"
          onInputChange={(value) => onSearchInputChange("location", value)}
        />
      </Box>
    </Grid>
  );
};

export default SearchBar;
