import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

import { SignFormContainer } from "../../styles/SignForm";

const SignIn = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [localData, setLocalData] = useState();

  const navigate = useNavigate();

  /**
   * Assignment 4 - 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
   */
  useEffect(() => {
    setLocalData(localStorage.getItem("loginEmail"));
  }, []);

  useEffect(() => {
    console.log(password);

    /**
     *  Assignment 1 - 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
     */
    if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) && password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const onSinginSubmit = (e) => {
    e.preventDefault();

    console.log("이메일: " + e.target.email.value + " | 패스워드: " + e.target.password.value);

    postSignIn(e.target.email.value, e.target.password.value);
  };

  /**
   * Assignment 3 - 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고
   * 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요
   */
  const postSignIn = async (em, pw) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/auth/signin";

    try {
      const res = await axios
        .post(
          URL,
          { email: em, password: pw },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((e) => {
          console.log(e);
          localStorage.setItem("loginEmail", em);
          localStorage.setItem("access_token", e.data.access_token);
          alert("로그인 성공!");
          navigate("/todo");
        });
    } catch (error) {
      console.error(error.response);
      alert(error.response?.data.message);
    }
  };

  return (
    <SignFormContainer>
      {/* Assignment 4 - 로그인 여부에 따른 리다이렉트 처리를 구현해주세요 */}
      {localData && <Navigate to="/todo" replace={true} />}

      <h2>로그인</h2>

      <form id="signinForm" onSubmit={onSinginSubmit}>
        <ul>
          <li>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="abc123@gmail.com"
              data-testid="email-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </li>
          <li>
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="8자 이상"
              data-testid="password-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
          <li>
            <button data-testid="signin-button" disabled={disabled}>
              로그인
            </button>
          </li>
        </ul>
      </form>
    </SignFormContainer>
  );
});

export default SignIn;
