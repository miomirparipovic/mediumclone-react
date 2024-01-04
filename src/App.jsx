import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import Navbar from "./components/navbar/Navbar";
import { CurrentUserProvider } from "./contexts/currentUserProvider";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <BrowserRouter>
          <Navbar />
          <PageRoutes />
        </BrowserRouter>
      </CurrentUserProvider>
    </>
  );
}

export default App;
