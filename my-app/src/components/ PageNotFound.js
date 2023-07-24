import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function PageNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1> Page Not Found! </h1>
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </div>
      <Button variant="contained">
        <Link to="/"> Home </Link>
      </Button>
    </div>
  );
}
