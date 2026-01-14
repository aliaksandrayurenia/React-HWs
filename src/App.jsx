import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Order from "./components/order/Order";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/order" element={<Order />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

