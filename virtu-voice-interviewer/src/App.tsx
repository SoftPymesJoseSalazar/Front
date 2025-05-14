import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import NewInterview from "./pages/NewInterview";
import Interview from "./pages/Interview";
import InterviewResult from "./pages/InterviewResult";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import InterviewHistory from "./pages/InterviewHistory";
import TurnBasedInterview from "@/pages/TurnBasedInterview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/new-interview" element={<NewInterview />} />
              <Route path="/turn-based-interview" element={<TurnBasedInterview />} />
              <Route path="/interview/:type" element={<Interview />} />
              <Route path="/interview/custom/:role/:experience/:type" element={<Interview />} />
              <Route path="/results/:id" element={<InterviewResult />} />
              <Route path="/interviews" element={<InterviewHistory />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;