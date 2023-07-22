import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { USER } from "../constants/constants";

const Profile = () => {
  const auth = getAuth();

  return (
    <div>
      <Button
        onClick={() => {
          signOut(auth)
            .then(() => {
              localStorage.removeItem(USER);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
