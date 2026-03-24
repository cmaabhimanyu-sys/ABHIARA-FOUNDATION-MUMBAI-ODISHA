import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import EmailButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";

const Home = lazy(() => import("./pages/Home"));
const OurStory = lazy(() => import("./pages/OurStory"));
const Vision = lazy(() => import("./pages/Vision"));
const Programs = lazy(() => import("./pages/Programs"));
const CSRPartners = lazy(() => import("./pages/CSRPartners"));
const Activities = lazy(() => import("./pages/Activities"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const Donate = lazy(() => import("./pages/Donate"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/aaf-logo-concept-3-DYGWPrtD3n9D2RUbi4xCrD.png"
          alt="Abhiara Foundation"
          className="h-16 w-auto mx-auto mb-4 animate-pulse"
        />
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Loading</p>
      </div>
    </div>
  );
}

/* Redirect components for old routes */
function GalleryRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/activities?tab=gallery");
  }, []);
  return <PageLoader />;
}

function BlogRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/activities?tab=updates");
  }, []);
  return <PageLoader />;
}

function Router() {
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
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/admin" component={Admin} />
        {/* Legacy routes redirect to unified Activities page */}
        <Route path="/impact-gallery" component={GalleryRedirect} />
        <Route path="/blog" component={BlogRedirect} />
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
          <EmailButton />
          <BackToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
