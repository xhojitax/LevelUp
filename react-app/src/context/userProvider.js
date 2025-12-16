import { UserProvider } from "./context/userContext";
import { CarritoProvider } from "./context/carritoContext";

function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  const renderPage = () => {
  
  };

  return (
    <UserProvider>
      <CarritoProvider>
        <div className="App">
          <Navigation setPage={setCurrentPage} />
          {renderPage()}
        </div>
      </CarritoProvider>
    </UserProvider>
  );
}

export default App;
