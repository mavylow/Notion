import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/action";

import { Navigate, useLocation } from "react-router-dom";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (id) {
      dispatch(fetchUser(id));
    } else {
      dispatch({ type: "LOG_OUT_USER" });
    }
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (data?.id) {
      localStorage.setItem("userId", data.id);
    } else {
      localStorage.removeItem("userId");
    }
  }, [loading, data?.id]);

  useEffect(() => {
    const handleStorageChange = () => {
      const id = localStorage.getItem("userId");
      if (!id) {
        dispatch({ type: "LOG_OUT_USER" });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, [dispatch]);

  return <>{children}</>;
}

export function RequireAuth({ children }) {
  const { data, loading } = useSelector(
    (state) => state.user
  );
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
