import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsultationProvider } from "@/contexts/ConsultationContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Divorce from "./pages/Divorce";
import Custody from "./pages/Custody";
import ChildSupport from "./pages/ChildSupport";
import Assets from "./pages/Assets";
import PrenuptialAgreement from "./pages/PrenuptialAgreement";
import Mediation from "./pages/Mediation";
import About from "./pages/About";
import DmitriyBorshchak from "./pages/DmitriyBorshchak";
import HankSonderman from "./pages/HankSonderman";
import KeriReeves from "./pages/KeriReeves";
import Process from "./pages/Process";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Annulment from "./pages/Annulment";
import Dissolution from "./pages/Dissolution";
import PostDecreeMatters from "./pages/PostDecreeMatters";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ConsultationProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/divorce" element={<Divorce />} />
            <Route path="/custody" element={<Custody />} />
            <Route path="/child-support" element={<ChildSupport />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/prenuptial-agreement" element={<PrenuptialAgreement />} />
            <Route path="/mediation" element={<Mediation />} />
            <Route path="/about" element={<About />} />
            <Route path="/attorneys/dmitriy-borshchak" element={<DmitriyBorshchak />} />
            <Route path="/attorneys/hank-sonderman" element={<HankSonderman />} />
            <Route path="/attorneys/keri-reeves" element={<KeriReeves />} />
            <Route path="/process" element={<Process />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/annulment" element={<Annulment />} />
            <Route path="/dissolution" element={<Dissolution />} />
            <Route path="/post-decree-matters" element={<PostDecreeMatters />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConsultationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
