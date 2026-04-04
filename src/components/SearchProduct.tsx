import styles from "../styles/modules/SearchProduct.module.css";
import searchPic from "../styles/images/search_pic.svg";

const SearchProduct = () => {
  return (
    <div className={styles.general}>
      <span className={styles.goods}>Товары</span>
      <div className={styles.search}>
        <img src={searchPic} alt="search_pic" className={styles.searchIcon} />
        <input type="text" className={styles.searchInput} placeholder="Найти" />
      </div>
    </div>
  );
};

export default SearchProduct;
