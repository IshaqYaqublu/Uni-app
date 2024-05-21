import { useState } from "react";
import { ENDPOINTS } from "../api/routing";

export const useDeleteTodo = () => {
  const [deleteStatus, setDeleteStatus] = useState(null);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${ENDPOINTS.DELETE_TODO()}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDeleteStatus("success");
      } else {
        setDeleteStatus("fail");
        console.error("fail:", response.statusText);
      }
    } catch (error) {
      setDeleteStatus("error");
      console.error("err:", error);
    }
  };

  return {
    deleteTodo,
    deleteStatus,
  };
};
