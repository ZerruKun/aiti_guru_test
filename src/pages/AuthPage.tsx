import styles from "../styles/modules/AuthPage.module.css";
import authPic from "../styles/images/auth_pic.svg";

const AuthPage = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.general}>
        <div>
          <img src={authPic} alt="auth pic" />
        </div>
        <h2 className={styles.hello}>Добро пожаловать!</h2>
        <h3 className={styles.bottomHello}>Пожалуйста, авторизируйтесь</h3>

        <form className={styles.form}>
          <div className={styles.fieldsWrapper}>
            <div className={styles.fieldWrapper}>
              <label htmlFor="login">Логин</label>
              <input
                type="text"
                id="login"
                name="login"
                placeholder="Введите логин"
              />
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
              />
            </div>
          </div>

          <div className={styles.save}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={styles.checkboxInput}
            />
            <label htmlFor="remember" className={styles.checkboxLabel}>
              <span className={styles.checkboxCustom}></span> Запомнить данные
            </label>
          </div>

          <button type="submit">Войти</button>

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
