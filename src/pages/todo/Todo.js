import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

import { TodoContainer } from "../../styles/TodoStyle";

const Todo = memo(() => {
  const [noLocalData, setNoLocalData] = useState(false);
  const [token, setToken] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState();
  const [editingText, setEditingText] = useState("");

  /**
   * Assignment 4 - 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
   * 로컬스토리지에 로그인 데이터가 없을 경우 로그인 페이지로 리다이렉트
   *
   * Assignment 5 - /todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
   */
  useEffect(() => {
    if (!localStorage.getItem("loginEmail")) {
      setNoLocalData(true);
      alert("로그인이 필요합니다.");
    } else {
      setToken(localStorage.getItem("access_token"));
      getTodos(localStorage.getItem("access_token"));
    }
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
   * Assignment 7 - TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.
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
   * Assignment 9 - 투두 리스트의 삭제 기능을 구현해주세요
   */
  const onDeleteTodo = useCallback((e) => {
    console.log(e.target.dataset.id);
    deleteTodo(e.target.dataset.id);
  });

  /**
   * Assignment 10 - 투두 리스트의 수정 기능을 구현해주세요
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
      {/* Assignment 4 - 로그인 여부에 따른 리다이렉트 처리를 구현해주세요 */}
      {noLocalData && <Navigate to="/signin" replace={true} />}
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
