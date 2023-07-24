import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { SIGNIN, USER } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          signOut(auth)
            .then(() => {
              localStorage.removeItem(USER);
            })
            .then(() => navigate(`/${SIGNIN}`))
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
