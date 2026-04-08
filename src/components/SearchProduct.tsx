import { useState, useEffect } from "react";
import type { ISearchProductProps } from "../types/types";
import styles from "../styles/modules/SearchProduct.module.css";
import searchPic from "../styles/images/search_pic.svg";

const SearchProduct = ({ searchTerm, onSearchChange }: ISearchProductProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      // ← Безопасный вызов: проверяем, что это функция
      if (typeof onSearchChange === "function") {
        onSearchChange(inputValue);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className={styles.general}>
      <span className={styles.goods}>Товары</span>
      <div className={styles.search}>
        <img src={searchPic} alt="search_pic" className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Найти"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchProduct;
