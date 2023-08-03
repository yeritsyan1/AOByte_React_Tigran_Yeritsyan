import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, DialogContentText } from "@mui/material";
import { SIGNIN, signUp } from "../../constants/constants";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState('')
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogTitle>Sign Up</DialogTitle>
     {error && <DialogContentText color='error'> {error} </DialogContentText> }
      <DialogContent>
        <TextField
          placeholder="Username"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
              setEmail(e.target.value.trim());
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            email.length < 6 || password.length < 6 || username.length < 3
          }
          onClick={async (e) => {
              await signUp(
                auth,
                email,
                password,
                setUsername,
                setEmail,
                setPassword,
                navigate,
                setError
              );
          }}
        >
          Sign Up
        </Button>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNIN}`}> Sign In </a>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;
