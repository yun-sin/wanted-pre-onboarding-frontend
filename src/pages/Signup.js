import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const SingupContainer = styled.div`
  width: 100%;

  h2 {
    text-align: center;
  }

  form {
    width: 200px;
    margin: auto;

    ul {
      list-style: none;
      padding: 0;
      display: block;
      margin: auto;

      li {
        label {
          display: block;
          width: 100px;
          margin-bottom: 5px;
        }
        input {
          width: 200px;
          height: 30px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        button {
          width: 200px;
          height: 50px;
        }
      }
    }
  }
`;

const Signup = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [localData, setLocalData] = useState();

  const navigate = useNavigate();

  /**
   * Assignment 4
   */
  useEffect(() => {
    setLocalData(localStorage.getItem("loginEmail"));
  }, []);

  useEffect(() => {
    console.log(password);

    /**
     * Assignment 1
     */
    if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) && password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const onSingupSubmit = (e) => {
    e.preventDefault();

    console.log("이메일: " + e.target.email.value + " | 패스워드: " + e.target.password.value);

    postSignUp(e.target.email.value, e.target.password.value);
  };

  /**
   * Assignment 2
   */
  const postSignUp = async (em, pw) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/auth/signup";

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
          alert("회원가입 성공!");
          navigate("/signin");
        });
    } catch (error) {
      console.error(error.response);
      if (error.response.status == 400) {
        alert("이메일 주소를 확인해 주세요");
      }
    }
  };

  return (
    <SingupContainer>
      {/* Assignment 4 */}
      {localData && <Navigate to="/todo" replace={true} />}

      <h2>회원가입</h2>

      <form id="signupForm" onSubmit={onSingupSubmit}>
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
            <button data-testid="signup-button" disabled={disabled}>
              회원가입
            </button>
          </li>
        </ul>
      </form>
    </SingupContainer>
  );
});

export default Signup;
