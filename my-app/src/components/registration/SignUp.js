import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { signUp } from "../../constants/constants";
import { getAuth } from "firebase/auth";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      auth: getAuth(),
    };
  }

  render() {
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
          value={this.state.username}
          onChange={(e) => {
            this.setState(() => {
              return {
                username: e.target.value,
              };
            });
          }}
        />
        <TextField
          placeholder="email"
          value={this.state.email}
          onChange={(e) => {
            this.setState(() => {
              return {
                email: e.target.value,
              };
            });
          }}
        />
        <TextField
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={(e) => {
            this.setState(() => {
              return {
                password: e.target.value,
              };
            });
          }}
        />
        <Button
          variant="contained"
          disabled={
            this.state.email.length < 3 ||
            this.state.password.length < 6 ||
            this.state.username.length < 3
          }
          onClick={async () => {
            await signUp(
              this.state.auth,
              this.state.email,
              this.state.password
            );
          }}
        >
          Sign Up
        </Button>
      </Box>
    );
  }
}
