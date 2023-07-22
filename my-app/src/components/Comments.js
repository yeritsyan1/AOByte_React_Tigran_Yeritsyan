import React from "react";
import { Button } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import "firebase/firestore";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import { USER } from "../constants/constants";

const Comments = (props) => {
  const db = getFirestore(app);

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
          disabled={props.comment.ratedUser.includes(
            JSON.parse(localStorage.getItem(USER)).providerData[0].email
          )}
          onClick={async () => {
            props.rateComment(props.comment);
          }}
        >
          <PlusOneRoundedIcon />
        </Button>
        <span> Rate: {props.comment.rate} </span>
      </div>
      <span> {props.comment.commentAuthor} </span>
      <p> {props.comment.text} </p>
    </div>
  );
};

export default Comments;
