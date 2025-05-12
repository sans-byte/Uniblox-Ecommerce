import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "sonner";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { ProductsPage } from "./pages/ProductsPage";
import { AdminPage } from "./pages/AdminPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { useStore } from "@/store/useStore";

function App() {
  // Protected Route component
  function ProtectedRoute({
    children,
    requireAdmin = false,
  }: {
    children: React.ReactNode;
    requireAdmin?: boolean;
  }) {
    const { isAuthenticated, user } = useStore();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (requireAdmin && user?.role !== "admin") {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  }
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute requireAdmin>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/success"
              element={
                <ProtectedRoute>
                  <CheckoutSuccessPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
