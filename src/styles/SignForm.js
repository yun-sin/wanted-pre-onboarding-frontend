import styled from "styled-components";

export const SignFormContainer = styled.div`
  width: 100%;

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
