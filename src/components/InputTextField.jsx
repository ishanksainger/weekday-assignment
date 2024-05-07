import { TextField } from "@mui/material";
import React, { useState } from "react";

const InputTextField = ({ onInputChange, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setIsFocused(value !== "");
    onInputChange && onInputChange(value);
  };

  return (
    <>
      {isFocused ? (
        <div style={{ marginBottom: "5px", fontSize: "12px" }}>
          {props.placeholder}
        </div>
      ) : null}
      <TextField
        {...props}
        onChange={handleChange}
        inputProps={{
          style: {
            flex: "1 1",
            padding: "5px 8px",
            color: "#000",
            fontSize: "13px",
            fontWeight: "500",
            ...props.inputProps?.style,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgb(204, 204, 204)",
              borderRadius: "5px", // Change outline color
            },
          },
          ...props.sx,
        }}
      />
    </>
  );
};

export default InputTextField;
