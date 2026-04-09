// Товар будет добавляться в начало (просто, чтобы сразу его было видно)
import { useState } from "react";
import type {
  IAddProductProps,
  IAddProductForm,
  IAddProductErrors,
} from "../types/types";
import styles from "../styles/modules/AddProduct.module.css";

const AddProduct = ({ onAdd, onRefresh }: IAddProductProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<IAddProductForm>({
    name: "",
    price: "",
    vendor: "",
    article: "",
    rating: "",
  });
  const [errors, setErrors] = useState<IAddProductErrors>({});

  const validate = (): boolean => {
    const newErrors: IAddProductErrors = {};

    if (!formData.name.trim()) newErrors.name = "Введите наименование";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Введите корректную цену";
    if (!formData.vendor.trim()) newErrors.vendor = "Введите вендора";
    if (!formData.article.trim()) newErrors.article = "Введите артикул";
    if (!formData.rating || isNaN(Number(formData.rating))) {
      newErrors.rating = "Введите рейтинг";
    } else {
      const rating = Number(formData.rating);
      if (rating < 0.1 || rating > 5) {
        newErrors.rating = "Рейтинг должен быть от 0.1 до 5";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      name: formData.name,
      price: Number(formData.price),
      vendor: formData.vendor,
      article: formData.article,
      rating: Number(formData.rating),
    });

    setFormData({ name: "", price: "", vendor: "", article: "", rating: "" });
    setErrors({});
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.general}>
        <span className={styles.allPositions}>Все позиции</span>
        <div className={styles.buttons}>
          <button
            className={styles.refreshButton}
            onClick={() => onRefresh?.()}
          ></button>
          <button
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Добавление товара</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Наименование</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? styles.error : ""}
                  placeholder="Наименование товара"
                />
                {errors.name && (
                  <span className={styles.errorMessage}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label>Цена, ₽</label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className={errors.price ? styles.error : ""}
                  placeholder="Формат: *Рубли.копейки*"
                />
                {errors.price && (
                  <span className={styles.errorMessage}>{errors.price}</span>
                )}
              </div>

              <div className={styles.field}>
                <label>Вендор</label>
                <input
                  type="text"
                  value={formData.vendor}
                  onChange={(e) =>
                    setFormData({ ...formData, vendor: e.target.value })
                  }
                  className={errors.vendor ? styles.error : ""}
                  placeholder="Производитель товара"
                />
                {errors.vendor && (
                  <span className={styles.errorMessage}>{errors.vendor}</span>
                )}
              </div>

              <div className={styles.field}>
                <label>Артикул</label>
                <input
                  type="text"
                  value={formData.article}
                  onChange={(e) =>
                    setFormData({ ...formData, article: e.target.value })
                  }
                  className={errors.article ? styles.error : ""}
                  placeholder="Артикул товара"
                />
                {errors.article && (
                  <span className={styles.errorMessage}>{errors.article}</span>
                )}
              </div>

              <div className={styles.field}>
                <label>Рейтинг</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className={errors.rating ? styles.error : ""}
                  placeholder="От 0.1 до 5"
                />
                {errors.rating && (
                  <span className={styles.errorMessage}>{errors.rating}</span>
                )}
              </div>

              <div className={styles.modalButtons}>
                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => setIsModalOpen(false)}
                >
                  Отмена
                </button>
                <button type="submit" className={styles.submit}>
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
