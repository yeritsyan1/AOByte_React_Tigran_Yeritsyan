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
  setPassword
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setUsername("");
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signIn = (auth, email, password, setEmail, setPassword) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setEmail("");
      setPassword("");
    })
    .catch(() => {
  
    });
};

export const USER = "user";
