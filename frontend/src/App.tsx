import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import InventoryPage from "./pages/InventoryPage";
import ProvidersPage from "./pages/ProvidersPage";
import POSPage from "./pages/POSPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/proveedores" element={<ProvidersPage />} />
            <Route path="/pos" element={<POSPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;