import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
