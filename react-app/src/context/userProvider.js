import { useState } from "react";
import { userContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  return (
    <userContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </userContext.Provider>
  );
};