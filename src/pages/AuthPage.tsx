import styles from "../styles/modules/AuthPage.module.css";
import authPic from "../styles/images/auth_pic.svg";
import type { IAuthErrors } from "../types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ILoginCredentials, IUser } from "../types/types";

const AuthPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<IAuthErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: IAuthErrors = {};

    if (!login.trim()) {
      newErrors.login = "Введите логин";
    }
    if (!password) {
      newErrors.password = "Введите пароль";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: login,
          password: password,
          expiresInMins: remember ? 30 : 0,
        } satisfies ILoginCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message === "Invalid credentials"
            ? "Неверный логин или пароль"
            : data.message || "Ошибка авторизации";
        setErrors({ general: errorMessage });
        return;
      }

      const user: IUser = data;

      const { token } = user;

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/products");
    } catch (err) {
      setErrors({ general: "Не удалось подключиться к серверу" });
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.general}>
        <div>
          <img src={authPic} alt="auth pic" />
        </div>
        <h2 className={styles.hello}>Добро пожаловать!</h2>
        <h3 className={styles.bottomHello}>Пожалуйста, авторизируйтесь</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldsWrapper}>
            <div className={styles.fieldWrapper}>
              <label htmlFor="login">Логин</label>
              <input
                type="text"
                id="login"
                name="login"
                placeholder="Введите логин"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  if (errors.login) setErrors({ ...errors, login: undefined });
                }}
                className={errors.login ? styles.error : ""}
              />
              {errors.login && (
                <span className={styles.errorMessage}>{errors.login}</span>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                className={errors.password ? styles.error : ""}
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>
          </div>

          {errors.general && (
            <div className={styles.generalError}>{errors.general}</div>
          )}

          <div className={styles.save}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={styles.checkboxInput}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" className={styles.checkboxLabel}>
              <span className={styles.checkboxCustom}></span> Запомнить данные
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </button>

          <span className={styles.or}>или</span>

          <span className={styles.newAcc}>
            <p>Нет аккаунта?</p>
            <a href="">Создать</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
