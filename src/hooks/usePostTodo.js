import { useState } from "react";
import { ENDPOINTS } from "../api/routing";

export const usePostTodo = () => {
  const [status, setStatus] = useState(0);
  const postTodo = async (data) => {
    try {
      const response = await fetch(ENDPOINTS.POST_TODO(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    postTodo,
    status,
    setStatus,
  };
};
