import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>
        <div className={styles.list}>
          <div className={styles.element}>
            <Link to='/'>Check_Crypto</Link>
          </div>
          <div className={styles.element}>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
          {user ? (
            <>
              <div className={styles.element}>
                <Link to='/portfolio'>Portfolio</Link>
              </div>
              <div className={styles.element}>
                <Link to='/user'>{user.username}</Link>
              </div>
            </>
          ) : (
            <>
              <div className={styles.element}>
                <Link to='/login'>Login</Link>
              </div>
              <div className={styles.element}>
                <Link to='/register'>Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
