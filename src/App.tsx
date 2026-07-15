import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { citySlugs } from "@/data/cities";

const Index = lazy(() => import("./pages/Index"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Oferta = lazy(() => import("./pages/Oferta"));
const CityPage = lazy(() => import("./pages/CityPage"));
const BelarusPage = lazy(() => import("./pages/BelarusPage"));
const AdminPricing = lazy(() => import("./pages/AdminPricing"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/oferta" element={<Oferta />} />
            <Route path="/belarus" element={<BelarusPage />} />
            <Route path="/admin" element={<AdminPricing />} />
            {citySlugs.map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<CityPage />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;