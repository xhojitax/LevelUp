import React, { useState } from 'react';
import Navigation from './components/navbar';
import Inicio from './components/inicio';
import Login from './components/login';
import Productos from './components/productos';
import Carrito from './components/carrito';
import Registro from './components/registro';
import Contacto from './components/contacto';
import Blog from './components/blog';

function App() {
  // Estado para controlar qué página mostrar
  const [currentPage, setCurrentPage] = useState('inicio');

  // Función para renderizar la página actual
  const renderPage = () => {
    switch(currentPage) {
      case 'inicio':
        return <Inicio />;
      case 'login':
        return <Login />;
      case 'productos':
        return <Productos />;
      case 'carrito':
        return <Carrito />;
      case 'registro':
        return <Registro />;
      case 'contacto':
        return <Contacto />;
      case 'blog':
        return <Blog />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="App">
      <Navigation setPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;