import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const HeaderContainer = styled.header`
  position: relative;
  height: 50px;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  .todoWrap {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    display: inline-block;
    font-size: 30px;
    line-height: 30px;
    font-weight: bold;
  }
  .signWrap {
    position: absolute;
    right: 30px;
    font-size: 16px;
    line-height: 30px;

    a {
      &:first-of-type {
        margin-right: 30px;
      }
    }
  }
`;

const Header = memo(() => {
  return (
    <HeaderContainer>
      <nav className="todoWrap">
        <NavLink to="/todo">Todo</NavLink>
      </nav>
      <nav className="signWrap">
        <NavLink to="/signup">회원가입</NavLink>
        <NavLink to="/signin">로그인</NavLink>
      </nav>
    </HeaderContainer>
  );
});

export default Header;
