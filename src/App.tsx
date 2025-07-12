import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserStatusProvider } from "./context/UserStatusContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserProfilePage from "./pages/UserProfilePage";
import SwapRequestPage from "./pages/SwapRequestPage";
import RequestsDashboard from "./pages/RequestsDashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();
  
  // If user is an admin, only show admin routes
  if (user?.role === 'admin') {
    return (
      <div className="dark min-h-screen">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<AdminPanel />} />
        </Routes>
      </div>
    );
  }

  // Regular routes for guests and users
  return (
    <div className="dark min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/*"
          element={
            <>
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/swap-request/:userId" element={<SwapRequestPage />} />
                <Route path="/requests" element={<RequestsDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <UserStatusProvider>
            <AppRoutes />
          </UserStatusProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
