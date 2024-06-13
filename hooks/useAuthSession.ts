import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      dispatch(setToken(storedToken));
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const authenticate = async (username: string, password: string): Promise<boolean> => {
    console.log(username, password)
    const response = await fetch('api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    console.log(response)

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ username }));

      dispatch(setToken(data.token));
      dispatch(setUser({ username }));
      return true;
    } else {
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(clearAuth());
  };

  const isAuthenticated = !!user;

  return { user, token, authenticate, logoutUser, isAuthenticated };
};

export default useAuthSession;
