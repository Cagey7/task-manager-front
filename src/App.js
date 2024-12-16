import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Layout from './components/Layout/Layout';
import './App.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
