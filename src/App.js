import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import Header from "./components/Header";

import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Todo from "./pages/todo/Todo";

const App = memo(() => {
  return (
    <div>
      <GlobalStyles />

      <Header />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
});

export default App;
