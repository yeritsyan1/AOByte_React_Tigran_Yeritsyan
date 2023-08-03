import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PostAddIcon from "@mui/icons-material/PostAdd";
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
  navigate,
  setError
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setUsername("");
      setEmail("");
      setPassword("");
      navigate(`/${SIGNIN}`);
    })
    .catch(() => {
      setError("Wrong email or password.")
    });
};

export const signIn = (
  auth,
  email,
  password,
  setEmail,
  setPassword,
  navigate,
  setError
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setEmail("");
      setPassword("");
      navigate("/");
    })
    .catch(() => {
      setError("Wrong email or password.")
    });
};

export const signOut = (auth, navigate) => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem(USER);
    })
    .then(() => navigate(`/${SIGNIN}`))
    .catch((error) => {
      console.log(error);
    });
};

export const USER = "user";
export const SIGNUP = "signup";
export const SIGNIN = "signin";
export const CREATEPOST = "createpost";
export const PROFILE = "profile";
export const list = [
  {
    name: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    url: PROFILE,
  },
  {
    name: "Create post",
    icon: <PostAddIcon />,
    url: CREATEPOST,
    divider: <Divider />,
  },
];
