import { Navigate, Route, Routes } from "react-router-dom";
import { AdminPage } from "../pages/AdminPage";
import { GuardedRoute } from "../../guards/GuaardedRoute";
import { useAdmin } from "../../context/ContextAdmin";


export const AppRoutes = () => {
  const { auth } = useAdmin();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardedRoute auth={auth}>
            <AdminPage />
          </GuardedRoute>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
