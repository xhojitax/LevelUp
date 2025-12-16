import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Leer usuario desde localStorage al iniciar
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
  }, []);

  const login = (userData) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    
    // IMPORTANTE: Guardar el token por separado también
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    
    setUsuario(userData);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};