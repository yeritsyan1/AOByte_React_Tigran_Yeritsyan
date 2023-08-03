import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, DialogContentText } from "@mui/material";
import { SIGNUP, USER, signIn } from "../../constants/constants";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      fullWidth
      sx={{
        textAlign: "center",
      }}
    >
      <DialogTitle>Sign In</DialogTitle>
      {error && <DialogContentText color='error'> {error} </DialogContentText> }
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          disabled={email.length < 6 || password.length < 6}
          onClick={async () => {
            await signIn(
              auth,
              email,
              password,
              setEmail,
              setPassword,
              navigate,
              setError
            );
            await onAuthStateChanged(auth, (user) => {
              if (user) {
                localStorage.setItem(USER, JSON.stringify(user));
              }
            });
          }}
        >
          Sign In
        </Button>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNUP}`}> Sign Up </a>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
