import React from "react";
import { getAuth } from "firebase/auth";
import { Button } from "@mui/material";
import { signOut } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountNavigation";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div>
      <AccountMenu />
      <Button
        onClick={() => {
          signOut(auth, navigate);
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
