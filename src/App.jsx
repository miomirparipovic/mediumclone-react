import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import Navbar from "./components/navbar/Navbar";
import { CurrentUserProvider } from "./contexts/currentUserProvider";
import CurrentUserChecker from "./CurrentUserChecker";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <BrowserRouter>
            <Navbar />
            <PageRoutes />
          </BrowserRouter>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </>
  );
}

export default App;
