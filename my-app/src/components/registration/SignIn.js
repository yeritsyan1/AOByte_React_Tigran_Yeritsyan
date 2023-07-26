import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { SIGNUP, USER, signIn } from "../../constants/constants";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <DialogTitle>
        <h1> Sign In </h1>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              navigate
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
        <Link to={`/${SIGNUP}`}> Sign Up </Link>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
