import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const OurStory = lazy(() => import("./pages/OurStory"));
const Vision = lazy(() => import("./pages/Vision"));
const Programs = lazy(() => import("./pages/Programs"));
const CSRPartners = lazy(() => import("./pages/CSRPartners"));
const Activities = lazy(() => import("./pages/Activities"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const Donate = lazy(() => import("./pages/Donate"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Loading</p>
      </div>
    </div>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/vision" component={Vision} />
        <Route path="/programs" component={Programs} />
        <Route path="/csr-partners" component={CSRPartners} />
        <Route path="/activities" component={Activities} />
        <Route path="/contact" component={Contact} />
        <Route path="/team" component={Team} />
        <Route path="/donate" component={Donate} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
