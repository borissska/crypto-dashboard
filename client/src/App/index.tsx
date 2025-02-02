import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Импортируем правильные компоненты
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import Portfolio from '../components/Portfolio';
import MainLayout from "../MainLayout";
import styles from "./App.module.scss";
import useAuth from "../shared/hooks/useAuth";

function App() {
  useAuth();

  return (
    <div className={styles.body}>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route path='dashboard' element={ <Dashboard /> }/>
          <Route path='register' element={ <Register /> } />
          <Route path='portfolio' element={ <Portfolio /> } />
          <Route
            path='login'
            element={
              <React.Suspense fallback={<>Идет загрузка!</>}>
                <Login />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
