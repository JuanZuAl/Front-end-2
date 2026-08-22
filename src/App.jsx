
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
        <main >
          <AppRoutes />
        </main>
    </BrowserRouter>
  );
}

export default App
