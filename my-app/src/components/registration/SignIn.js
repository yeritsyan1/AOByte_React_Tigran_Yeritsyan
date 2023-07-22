import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { USER, signIn } from "../../constants/constants";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h2> Sign In </h2>
      <TextField
        variant="outlined"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="outlined"
        onClick={async () => {
          await signIn(auth, email, password, setEmail, setPassword);
          await onAuthStateChanged(auth, (user) => {
            if (user) {
              localStorage.setItem(USER, JSON.stringify(user));
            }
          });
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
