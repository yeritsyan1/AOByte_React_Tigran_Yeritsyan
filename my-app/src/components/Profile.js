import React, { Component } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { app } from "../firebase/firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: getAuth(app),
    };
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                localStorage.removeItem("user");
              })
              .catch((error) => {
                console.log("err", error);
              });
          }}
        >
          Log Out
        </Button>
      </div>
    );
  }
}
