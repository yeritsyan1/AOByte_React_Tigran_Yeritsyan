import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { signUp } from "../../constants/constants";
import { getAuth } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = getAuth();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        backgroundColor: "grey",
        border: "1px black solid",
      }}
    >
      <h2> SignUp </h2>
      <TextField
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        disabled={
          email.length < 6 || password.length < 6 || username.length < 3
        }
        onClick={async () => {
          await signUp(
            auth,
            email,
            password,
            setUsername,
            setEmail,
            setPassword
          );
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
