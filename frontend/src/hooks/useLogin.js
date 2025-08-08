import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (data) => {
    const { user, token } = data;

    const publicUser = {
      email: user.email,
      username: user.username,
      token: token,
    };

    localStorage.setItem("user", JSON.stringify(publicUser));

    dispatch({ type: "LOGIN", payload: publicUser });
  };

  return { login };
};
