// Логика авторизации
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../types/types";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const auth = !!token;
    
    setIsAuthenticated(auth);
    setIsChecking(false);
    
    if (!auth) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/auth");
  };

  const getCurrentUser = (): IUser | null => {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  return { isAuthenticated, isChecking, logout, getCurrentUser };
};