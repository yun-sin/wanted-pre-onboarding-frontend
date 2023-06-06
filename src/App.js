import React, { memo } from "react";
import { Link, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";

const App = memo(() => {
  return (
    <div>
      <h1>원티드 프리온보딩 사전과제</h1>
      <nav>
        <Link to="/signup">회원가입</Link> | <Link to="/signin">로그인</Link> | <Link to="/todo">투두</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
});

export default App;
