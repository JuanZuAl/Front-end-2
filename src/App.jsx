
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/SideBar";


function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "1rem" }}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
