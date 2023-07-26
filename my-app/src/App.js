import React from "react";
import List from "./components/List";
import SignUp from "./components/registration/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/registration/SignIn";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import ProtectRoute from "./components/ProtectRoute";
import ProtectLogin from "./components/registration/ProtectLogin";
import { CREATEPOST, PROFILE, SIGNIN, SIGNUP } from "./constants/constants";
import PageNotFound from "./components/ PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={`/${SIGNUP}`}
            element={
              <ProtectLogin>
                <SignUp />
              </ProtectLogin>
            }
          ></Route>
          <Route
            path={`/${SIGNIN}`}
            element={
              <ProtectLogin>
                <SignIn />
              </ProtectLogin>
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <List />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path={`/${CREATEPOST}`}
            element={
              <ProtectRoute>
                <CreatePost />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path={`/${PROFILE}`}
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
