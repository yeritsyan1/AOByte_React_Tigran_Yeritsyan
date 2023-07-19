import React, { Component } from "react";
import { Button } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import "firebase/firestore";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: getFirestore(app),
    };
  }

  render() {
    return (
      <div
        style={{
          maxHeight: "250px",
          overflow: "scroll",
          borderBottom: "2px black solid",
          textAlign: "left",
          padding: "0 15px",
        }}
      >
        <div style={{ padding: 0 }}>
          <Button
            disabled={this.props.comment.ratedUser.includes(
              JSON.parse(localStorage.getItem("user")).providerData[0].email
            )}
            onClick={async () => {
              this.props.rateComment(this.props.comment, 5);
            }}
          >
            <PlusOneRoundedIcon />
          </Button>
          <span> Rate: {this.props.comment.rate} </span>
        </div>
        <span> {this.props.comment.commentAuthor} </span>
        <p> {this.props.comment.text} </p>
      </div>
    );
  }
}
