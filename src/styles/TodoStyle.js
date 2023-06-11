import styled from "styled-components";

export const TodoContainer = styled.div`
  width: 100%;

  .middle {
    width: 300px;
    margin: auto;

    .add {
      display: flex;
      height: 30px;
      margin-bottom: 30px;
      input {
        width: 200px;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
      }
      button {
        width: 100px;
        padding: 0;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      height: 30px;
      margin-bottom: 10px;

      .input {
        width: 200px;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
      }

      .btn {
        button {
          width: 50px;
          height: 30px;
        }
      }
    }
  }
`;
