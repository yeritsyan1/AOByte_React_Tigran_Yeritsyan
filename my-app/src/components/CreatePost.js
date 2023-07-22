import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        authorId: user.uid,
        email: user.email,
        title: title,
        body: body,
        comments: [],
        rate: 0,
        id: uuid(),
      });
      setTitle("");
      setBody("");
    } catch {}
  };

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
        value={title}
        onChange={(e) => {
          return setTitle(e.target.value);
        }}
      />
      <TextField
        style={{ overflow: "scroll" }}
        placeholder="Write something..."
        multiline
        rows="3"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <Button
        onClick={createPost}
        disabled={title.length < 5 || body.length < 10}
      >
        Create
      </Button>
    </div>
  );
};

export default CreatePost;
