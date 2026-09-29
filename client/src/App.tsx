import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import EmailButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";

const Home = lazy(() => import("./pages/Home"));
const Programs = lazy(() => import("./pages/Programs"));
const RuralAreaTransformation = lazy(
  () => import("./pages/RuralAreaTransformation")
);
const PratibhaSamman = lazy(() => import("./pages/PratibhaSamman"));
const ElderCareDignity = lazy(() => import("./pages/ElderCareDignity"));
const HowWeSupportChild = lazy(() => import("./pages/HowWeSupportChild"));
const StudentImpact = lazy(() => import("./pages/StudentImpact"));
const ImpactGallery = lazy(() => import("./pages/ImpactGallery"));
const MonthlyReports = lazy(() => import("./pages/MonthlyReports"));
const LimitedVerifiedSupport = lazy(
  () => import("./pages/LimitedVerifiedSupport")
);
const AbhiaraVidyapitha = lazy(() => import("./pages/AbhiaraVidyapitha"));
const DigitalLearningAI = lazy(() => import("./pages/DigitalLearningAI"));
const RTIHumanRightsAwareness = lazy(
  () => import("./pages/RTIHumanRightsAwareness")
);
const WellnessWellbeing = lazy(() => import("./pages/WellnessWellbeing"));
const CSRPartners = lazy(() => import("./pages/CSRPartners"));
const Governance = lazy(() => import("./pages/Governance"));
const OurPresence = lazy(() => import("./pages/OurPresence"));
const Donate = lazy(() => import("./pages/Donate"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Contact = lazy(() => import("./pages/Contact"));
const OtherVerifiedSupport = lazy(() => import("./pages/OtherVerifiedSupport"));
const DisasterRelief = lazy(() => import("./pages/DisasterRelief"));
const MedicalEmergencySupport = lazy(
  () => import("./pages/MedicalEmergencySupport")
);
const AnimalWelfareSupport = lazy(() => import("./pages/AnimalWelfareSupport"));
const DonationPolicy = lazy(() => import("./pages/DonationPolicy"));
const OurStory = lazy(() => import("./pages/OurStory"));
const BirthdayWithPurpose = lazy(() => import("./pages/BirthdayWithPurpose"));
const PressMedia = lazy(() => import("./pages/PressMedia"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#F5A623] border-t-transparent" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shiksha-sathi" component={Programs} />
        <Route
          path="/rural-area-transformation"
          component={RuralAreaTransformation}
        />
        <Route path="/abhiara-pratibha-samman" component={PratibhaSamman} />
        <Route path="/elder-care-and-dignity" component={ElderCareDignity} />
        <Route path="/how-we-support-a-child" component={HowWeSupportChild} />
        <Route path="/student-impact" component={StudentImpact} />
        <Route path="/impact-gallery" component={ImpactGallery} />
        <Route path="/monthly-reports" component={MonthlyReports} />
        <Route
          path="/limited-verified-support"
          component={LimitedVerifiedSupport}
        />
        <Route path="/abhiara-vidyapitha" component={AbhiaraVidyapitha} />
        <Route path="/digital-learning-ai" component={DigitalLearningAI} />
        <Route
          path="/rti-human-rights-awareness"
          component={RTIHumanRightsAwareness}
        />
        <Route path="/wellness-and-wellbeing" component={WellnessWellbeing} />
        <Route path="/partners-and-supporters" component={CSRPartners} />
        <Route path="/board-and-transparency" component={Governance} />
        <Route path="/our-presence" component={OurPresence} />
        <Route path="/donate" component={Donate} />
        <Route path="/donate-for-education" component={Donate} />
        <Route path="/volunteer" component={Volunteer} />
        <Route path="/contact" component={Contact} />
        <Route
          path="/other-verified-support"
          component={OtherVerifiedSupport}
        />
        <Route path="/disaster-relief" component={DisasterRelief} />
        <Route
          path="/medical-emergency-support"
          component={MedicalEmergencySupport}
        />
        <Route
          path="/animal-welfare-support"
          component={AnimalWelfareSupport}
        />
        <Route path="/donation-and-refund-policy" component={DonationPolicy} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/birthday-with-purpose" component={BirthdayWithPurpose} />
        <Route path="/press-and-media" component={PressMedia} />
        <Route path="/faq" component={FAQ} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/admin" component={Admin} />

        <Route path="/programs">
          <Redirect to="/shiksha-sathi" />
        </Route>
        <Route path="/activities">
          <Redirect to="/monthly-reports" />
        </Route>
        <Route path="/gallery">
          <Redirect to="/monthly-reports" />
        </Route>
        <Route path="/impact">
          <Redirect to="/student-impact" />
        </Route>
        <Route path="/media">
          <Redirect to="/press-and-media" />
        </Route>
        <Route path="/press-media">
          <Redirect to="/press-and-media" />
        </Route>
        <Route path="/public-awareness">
          <Redirect to="/rti-human-rights-awareness" />
        </Route>
        <Route path="/rti-and-human-rights">
          <Redirect to="/rti-human-rights-awareness" />
        </Route>
        <Route path="/blog/:slug">
          <Redirect to="/monthly-reports" />
        </Route>
        <Route path="/blog">
          <Redirect to="/monthly-reports" />
        </Route>
        <Route path="/csr-partners">
          <Redirect to="/partners-and-supporters" />
        </Route>
        <Route path="/team">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/governance">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/financials">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/vision">
          <Redirect to="/abhiara-vidyapitha" />
        </Route>
        <Route path="/bank-transfer">
          <Redirect to="/donate" />
        </Route>
        <Route path="/sponsor">
          <Redirect to="/donate" />
        </Route>
        <Route path="/donate-in-memory">
          <Redirect to="/donate" />
        </Route>
        <Route path="/donate-for-occasion">
          <Redirect to="/birthday-with-purpose" />
        </Route>
        <Route path="/legacy-giving">
          <Redirect to="/donate" />
        </Route>
        <Route path="/celebrate">
          <Redirect to="/birthday-with-purpose" />
        </Route>
        <Route path="/birthday">
          <Redirect to="/birthday-with-purpose" />
        </Route>
        <Route path="/fundraise">
          <Redirect to="/donate" />
        </Route>
        <Route path="/tax-exemption">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/donor-wall">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/donor-dashboard">
          <Redirect to="/board-and-transparency" />
        </Route>
        <Route path="/careers">
          <Redirect to="/volunteer" />
        </Route>
        <Route path="/thank-you">
          <Redirect to="/student-impact" />
        </Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
            <EmailButton />
            <BackToTop />
            <CookieConsent />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
