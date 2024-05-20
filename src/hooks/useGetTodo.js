import { useState } from "react";
import { ENDPOINTS } from "../api/routing";

export const useGetTodo = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_TODO());
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error("fail:", response.statusText);
      }
    } catch (error) {
      console.error("err:", error);
    }
  };

  return {
    fetchTodos,
    setTodos,
    todos,
  };
};
