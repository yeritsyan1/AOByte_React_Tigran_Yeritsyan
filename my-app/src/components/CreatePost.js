import { Button, TextField } from "@mui/material";
import React, { Component } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      db: getFirestore(app),
      auth: getAuth(),
      user: null,
    };
  }

  componentDidMount() {
    onAuthStateChanged(this.state.auth, (user) => {
      if (user) {
        this.setState(() => {
          return {
            user: user,
          };
        });
      } else {
        console.log("error");
      }
    });
  }

  createPost = async () => {
    try {
      const docRef = await addDoc(collection(this.state.db, "posts"), {
        authorId: this.state.user.uid,
        email: this.state.user.email,
        title: this.state.title,
        body: this.state.body,
        comments: [],
        rate: 0,
        id: uuid(),
      });
      await this.setState(() => {
        return {
          title: "",
          body: "",
        };
      });
    } catch {
      console.log("error");
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <h2> CreatePost </h2>
        <TextField
          placeholder="Title"
          value={this.state.title}
          onChange={(e) => {
            return this.setState(() => {
              return {
                title: e.target.value,
              };
            });
          }}
        />
        <TextField
          style={{ overflow: "scroll" }}
          placeholder="Write something..."
          multiline
          rows="3"
          value={this.state.body}
          onChange={(e) => {
            this.setState(() => {
              return {
                body: e.target.value,
              };
            });
          }}
        />
        <Button
          onClick={this.createPost}
          disabled={this.state.title.length < 5 || this.state.body.length < 10}
        >
          Create
        </Button>
      </div>
    );
  }
}
