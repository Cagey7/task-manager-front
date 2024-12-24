import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password": password }),
      });
      const res = await response.json();
      alert(res.auth_token);
      if (res.auth_token) {
        console.log(res.data);
        setUser(username);
        setToken(res.auth_token);
        localStorage.setItem("site", res.auth_token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
