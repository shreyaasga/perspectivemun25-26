import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CommitteesPage from "./pages/Committees.tsx";
import FAQsPage from "./pages/FAQs.tsx";
import AboutUsPage from "./pages/AboutUs.tsx";
import NotFound from "./pages/NotFound.tsx";
import DelegateMascot from "./components/DelegateMascot.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/committees" element={<CommitteesPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DelegateMascot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
