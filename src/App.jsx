import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>Medium Clone React</h1>
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
