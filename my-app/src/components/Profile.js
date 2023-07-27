import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { SIGNIN, USER /* signOut */ } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountNavigation";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem(USER);
      })
      .then(() => navigate(`/${SIGNIN}`))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AccountMenu />
      <Button
        onClick={() => {
          return logOut(auth, navigate);
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
