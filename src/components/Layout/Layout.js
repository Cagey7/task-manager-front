import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import "./Layout.css"

const Layout = () => {
  const user = useAuth();

  return (
    <div>
        <header>
            <div class="container container-nav">
                <div class="site-title">
                    <h1><Link to="/">Таск Менеджер</Link></h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/login">Логин</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/profile">{ user.user }</Link></li>
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