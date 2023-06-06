import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const TodoContainer = styled.div`
  width: 100%;

  .middle {
    width: 300px;
    margin: auto;

    h2 {
      text-align: center;
    }

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

const Todo = memo(() => {
  const [localData, setLocalData] = useState();
  const [token, setToken] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState();
  const [editingText, setEditingText] = useState("");

  /**
   * Assignment 4
   * 처음엔 false, 로컬데이터가 없으면 true (로그인 페이지로 리다이렉트)
   */
  useEffect(() => {
    if (!localStorage.getItem("loginEmail")) {
      setLocalData("로그인필요");
    }

    setToken(localStorage.getItem("access_token"));
    getTodos(localStorage.getItem("access_token"));
  }, []);

  const onNewTodoSubmit = (e) => {
    e.preventDefault();

    console.log("New Todo: " + e.target.newTodo.value);
    createTodo(e.target.newTodo.value);
  };

  const createTodo = async (todo) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/todos";

    try {
      const res = await axios
        .post(
          URL,
          { todo: todo },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((e) => {
          console.log(e);
          getTodos(localStorage.getItem("access_token"));
        });
    } catch (error) {
      console.log("에러");
      console.error(error);
    }
  };

  const getTodos = async (token) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/todos";

    try {
      const res = await axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((e) => {
          console.log(e.data);
          setTodoList(e.data);
        });
    } catch (error) {
      console.log("에러");
      console.error(error);
    }
  };

  const updateTodo = async (id, todo, isCompleted) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/todos/";

    try {
      const res = await axios
        .put(
          URL + id,
          { todo: todo, isCompleted: isCompleted },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((e) => {
          console.log(e);
          getTodos(localStorage.getItem("access_token"));
        });
    } catch (error) {
      console.log("에러");
      console.error(error);
    }
  };

  /**
   * Assignment 7
   */
  const onCompletedChange = useCallback((e) => {
    console.log(e.target.dataset.id);
    console.log(e.target.checked);

    updateTodo(e.target.dataset.id, e.target.dataset.todo, e.target.checked);
  });

  const deleteTodo = async (id) => {
    const URL = "https://www.pre-onboarding-selection-task.shop/todos/";

    try {
      const res = await axios
        .delete(URL + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((e) => {
          console.log(e);
          getTodos(localStorage.getItem("access_token"));
        });
    } catch (error) {
      console.log("에러");
      console.error(error);
    }
  };

  /**
   * Assignment 9
   */
  const onDeleteTodo = useCallback((e) => {
    console.log(e.target.dataset.id);
    deleteTodo(e.target.dataset.id);
  });

  /**
   * Assignment 10
   */
  // input 태그의 텍스트가 변경될때 실행
  const onTextChange = useCallback((e) => {
    console.log(e.target.value);
    setEditingText(e.target.value);
  });

  // 제출 버튼 클릭
  const onTextSubmit = useCallback((e) => {
    e.preventDefault();

    const id = e.target.dataset.id;
    console.log(editingText);
    const i = e.target.dataset.i;

    if (editingText) {
      updateTodo(id, editingText, todoList[i].isCompleted).then((e) => {
        console.log("수정완료");
        setEditingId(null);
      });
    } else {
      setEditingId(null);
    }
  });

  // 수정 버튼 클릭
  const onChangeClick = useCallback((e) => {
    e.preventDefault();
    setEditingId(e.target.dataset.id);
    console.log(editingId);
  });

  // 취소 버튼 클릭
  const onChangeCancel = useCallback((e) => {
    e.preventDefault();
    setEditingId(null);
  });

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  return (
    <TodoContainer>
      {/* Assignment 4 */}
      {localData && <Navigate to="/signin" replace={true} />}
      <div className="middle">
        <h2>투두 리스트</h2>

        <form className="add" onSubmit={onNewTodoSubmit}>
          <input id="newTodo" data-testid="new-todo-input" />
          <button data-testid="new-todo-add-button">추가</button>
        </form>

        <ul>
          {todoList.map((v, i) => (
            <li key={i}>
              {v.id == editingId ? (
                <>
                  <div className="input">
                    <label>
                      <input data-id={v.id} data-todo={v.todo} type="checkbox" checked={v.isCompleted} onChange={onCompletedChange} />
                      <input type="text" data-testid="modify-input" defaultValue={v.todo} onChange={onTextChange} />
                    </label>
                  </div>
                  <div className="btn">
                    <button data-id={v.id} data-i={i} data-testid="submit-button" onClick={onTextSubmit}>
                      제출
                    </button>
                    <button data-id={v.id} data-testid="cancel-button" onClick={onChangeCancel}>
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="input">
                    <label>
                      <input data-id={v.id} data-todo={v.todo} type="checkbox" checked={v.isCompleted} onChange={onCompletedChange} />
                      <span>{v.todo}</span>
                    </label>
                  </div>
                  <div className="btn">
                    <button data-id={v.id} data-testid="modify-button" onClick={onChangeClick}>
                      수정
                    </button>
                    <button data-id={v.id} data-testid="delete-button" onClick={onDeleteTodo}>
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </TodoContainer>
  );
});

export default Todo;
