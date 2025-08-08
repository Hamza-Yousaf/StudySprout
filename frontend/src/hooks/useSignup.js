import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    const { user, token } = data;

    const publicUser = {
      email: user.email,
      username: user.username,
      token: token,
    };

    localStorage.setItem("user", JSON.stringify(publicUser));

    dispatch({ type: "LOGIN", payload: publicUser });
  };

  return { signup };
};
