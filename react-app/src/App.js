import React, { useState } from "react";
import "./App.css";

import Navigation from "./components/navbar";
import Inicio from "./components/inicio";
import Login from "./components/login";
import Productos from "./components/productos";
import Carrito from "./components/carrito";
import Registro from "./components/registro";
import Contacto from "./components/contacto";
import Blog from "./components/blog";
import Pago from "./components/pago";

import { UserProvider } from "./context/userContext";
import { CarritoProvider } from "./context/carritoContext";

function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  const renderPage = () => {
    switch (currentPage) {
      case "inicio":
        return <Inicio />;
      case "login":
        return <Login setPage={setCurrentPage} />;
      case "productos":
        return <Productos irCarrito={() => setCurrentPage("carrito")} />;
      case "carrito":
        return <Carrito irPago={() => setCurrentPage("pago")} />;
      case "pago":
        return <Pago />;
      case "registro":
        return <Registro />;
      case "contacto":
        return <Contacto />;
      case "blog":
        return <Blog />;
      default:
        return <Inicio />;
    }
  };

  return (
    <UserProvider>
      <CarritoProvider>
        <Navigation setPage={setCurrentPage} />
        {renderPage()}
      </CarritoProvider>
    </UserProvider>
  );
}

export default App;
