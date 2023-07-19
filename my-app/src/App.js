import React, { Component } from "react";
import List from "./components/List";
import SignUp from "./components/registration/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/registration/SignIn";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />}>
            </Route>
            <Route path="/signin" element={<SignIn />}>
            </Route>
            <Route path="/" element={<List />}>
            </Route>
            <Route path="/create-post" element={<CreatePost />}>
            </Route>
            <Route path="/profile" element={<Profile />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
