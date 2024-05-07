import React, { useState } from "react";
import Select from "react-select";

const SearchInput = ({ data, placeHolder, onInputChange }) => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  let options = [];

  // Convert data to options format based on its type
  if (Array.isArray(data)) {
    // Convert array to options format
    options = data.map((item) => ({ value: item, label: item }));
  } else {
    // Convert object to options format
    options = Object.entries(data).flatMap(([category, roles]) => {
      return [
        {
          value: category,
          label: category,
          isCategory: true,
          isDisabled: true,
        }, // Make categories disabled
        ...roles.map((role) => ({ value: role, label: role })),
      ];
    });
  }

  // Custom styles for the Select component
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #007bff" : "2px solid #ced4da", // border color on focus
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : null, // box shadow on focus
      minWidth: "150px", // Set minimum width
    }),
    menuPortal: (provided, state) => ({
      ...provided,
      minWidth: "150px", // Set minimum width
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: 0,
      boxShadow: "0 0 0 1px rgb(38, 132, 255)", // Corrected boxShadow syntax
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "90%", // Set font size to 75%
      color: state.isDisabled ? "#6c757d" : state.isFocused ? "" : "inherit", // text color when option is focused
    }),
  };

  // Handle change in selected options
  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      setIsItemSelected(true);
      const selectedValues = selectedOptions.map((option) => option.value);
      onInputChange(selectedValues); // Pass an array of selected values
    } else {
      setIsItemSelected(false);
      onInputChange(""); // Clear the input value when nothing is selected
    }
  };

  return (
    <>
      {/* Show placeholder only if an item is selected */}
      {isItemSelected ? (
        <div style={{ marginBottom: "5px", fontSize: "12px" }}>
          {placeHolder}
        </div>
      ) : null}
      {/* Render Select component */}
      <Select
        options={options}
        isMulti={true} // Allow multiple selections
        placeholder={placeHolder}
        isSearchable={true} // Enable search functionality
        styles={customStyles} // Apply custom styles
        menuPortalTarget={document.body} // Portal the menu to the body to prevent clipping
        onChange={handleSelectChange} // Track whether an item is selected
      />
    </>
  );
};

export default SearchInput;
