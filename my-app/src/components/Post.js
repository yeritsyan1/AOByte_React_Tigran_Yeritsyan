import { Box, Button, Divider, TextField } from "@mui/material";
import {
  arrayUnion,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { app } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import Comments from "./Comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActions from "@mui/material/CardActions";
import { USER } from "../constants/constants";

const Post = (props) => {
  const [comment, setComment] = useState("");
  const db = getFirestore(app);
  const [showAll, setShowAll] = useState(false);

  const rateComment = async (elem) => {
    await setDoc(doc(db, "posts", props.item.id), {
      ...props.item,
      comments: props.item.comments.map((item) => {
        if (item.id === elem.id) {
          return {
            ...elem,
            rate: item.rate + 1,
            ratedUser: [
              ...elem.ratedUser,
              JSON.parse(localStorage.getItem(USER)).providerData[0].email,
            ],
          };
        } else {
          return item;
        }
      }),
    });
  };

  return (
    <Card
      style={{
        width: "100%",
        marginBottom: "10px",
        backgroundColor: "wheat",
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.item.title}
      />
      <CardMedia component="img" maxheight="194" alt="" />
      <CardContent>
        <CardActions>
          <button
            style={{
              fontSize: "12px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() =>
              props.onDelete(props.column, props.listname, props.item)
            }
          >
            Delete
          </button>
        </CardActions>
        <Typography variant="body2" color="text.secondary">
          {props.item.body.length > 200 ? (
            <>
              {props.item.body.slice(0, showAll ? props.item.body.length : 200)}
              <Button
                onClick={() => {
                  setShowAll(!showAll);
                }}
              >
                {showAll ? "...less" : "...more"}{" "}
              </Button>
            </>
          ) : (
            props.item.body
          )}
        </Typography>
      </CardContent>
      <CardActions> 
        <Button variant="outlined"
          disabled={props.item?.liked.includes(
            JSON.parse(localStorage.getItem(USER)).providerData[0].email
          )}
         onClick={async () => {
          const like = doc(db, "posts", props.item.id);
          await updateDoc(like, {
            averageRate: props.item.averageRate + 1,
            liked: arrayUnion(JSON.parse(localStorage.getItem(USER))
              .providerData[0].email)
          });
        }}> Like </Button>
      </CardActions>
      <CardContent>
        <TextField
          placeholder="Comment"
          multiline
          rows="2"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button
          variant="contained"
          disabled={comment.length < 1}
          onClick={async () => {
            const updateComments = doc(db, "posts", props.item.id);
            await updateDoc(updateComments, {
              comments: arrayUnion({
                commentAuthor: JSON.parse(localStorage.getItem(USER))
                  .providerData[0].displayName,
                text: comment,
                rate: 0,
                id: uuid(),
                ratedUser: [],
              }),
            });
            await setComment("");
          }}
        >
          Send
        </Button>
        <Divider />
      </CardContent>
      <CardContent>
        <Box>
          <h3 style={{ color: "red", textAlign: "left", padding: "0px 10px" }}>
            Comments:
          </h3>
          <CardActions>
            <Button
              variant="outlined"
              onClick={() => {
                props.sortComments(
                  props.column,
                  props.listname,
                  props.item
                );
              }}
            >
              Filter Comments
            </Button>
          </CardActions>
          {props.item?.comments.map((comment) => {
            return (
              <React.Fragment key={uuid()}>
                <Comments
                  comment={comment}
                  postID={props.item.id}
                  rateComment={rateComment}
                />
              </React.Fragment>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;
