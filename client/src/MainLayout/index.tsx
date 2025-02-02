import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div className={styles.fullscreen_gradient}>
      <div className={styles.city_landscape} />
      <div className={styles.sun} />
      <Navbar />
      <div className={styles.main_part}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
