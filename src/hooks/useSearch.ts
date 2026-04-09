// Поиск. Ожидание секунды после ввода для фильтации по введённому
import { useState, useEffect } from "react";

export const useSearch = (delay: number = 1000) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return { searchTerm, debouncedTerm, setSearchTerm };
};