import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import AdminProvider from "./context/ContextAdmin";

function App() {
  return (
    <AdminProvider>
      <AppTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppTheme>
    </AdminProvider>
  );
}

export default App;
