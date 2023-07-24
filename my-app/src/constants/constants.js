import Avatar from "@mui/material/Avatar";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUp = (
  auth,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  navigate
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setUsername("");
      setEmail("");
      setPassword("");
      navigate(SIGNIN);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signIn = (
  auth,
  email,
  password,
  setEmail,
  setPassword,
  navigate
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setEmail("");
      setPassword("");
      navigate("/");
    })
    .catch(() => {});
};

export const USER = "user";
export const SIGNUP = "signup";
export const SIGNIN = "signin";
export const CREATEPOST = "createpost";
export const PROFILE = "profile";
export const list = [
  { name: "Profile", icon: <Avatar />, url: PROFILE },
  {
    name: "Create post",
    icon: <PostAddIcon />,
    url: CREATEPOST,
    divider: <Divider />,
  },
  {
    name: "Logout",
    icon: <Logout fontSize="small" />,
    url: SIGNIN,
  },
];
