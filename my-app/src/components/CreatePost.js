import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();

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
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogActions>
        <a href="/">
          <HouseIcon fontSize="large" color="error" />
        </a>
      </DialogActions>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Title"
          value={title}
          onChange={(e) => {
            return setTitle(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={createPost}
          disabled={title.length < 5 || body.length < 10}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
