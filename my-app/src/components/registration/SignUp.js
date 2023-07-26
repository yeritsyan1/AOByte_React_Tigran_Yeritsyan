import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { SIGNIN, signUp } from "../../constants/constants";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
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
              setPassword,
              navigate
            );
          }}
        >
          Sign Up
        </Button>
      </DialogActions>
      <DialogActions>
        <Link to={`/${SIGNIN}`}> Sign In </Link>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;
