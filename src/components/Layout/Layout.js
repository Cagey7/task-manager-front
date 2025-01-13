import React from 'react';
import "./Layout.css"
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"

const Layout = () => {
  const user = useAuth();

  return (
    <div>
      <header>
          <div className="container container-nav">
              <div className="site-title">
                  <h1><Link to="/">Таск Менеджер</Link></h1>
              </div>
              <nav>
                  <ul>
                      <li><Link to="/login">Логин</Link></li>
                      <li><Link to="/register">Регистрация</Link></li>
                      <li><Link to="/profile">{ user }</Link></li>
                  </ul>
              </nav>
          </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
