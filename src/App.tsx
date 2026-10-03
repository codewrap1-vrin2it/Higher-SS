import { Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/AppShell";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ToastStack } from "@/components/ToastStack";

// Route pages (lazy-loaded for fast initial bundle)
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/app/page"));
const AssessmentPage = lazy(() => import("@/app/assessment/page"));
const CareersPage = lazy(() => import("@/app/careers/page"));
const DiagnosticPage = lazy(() => import("@/app/diagnostic/page"));
const RoadmapPage = lazy(() => import("@/app/roadmap/page"));
const ResourcesPage = lazy(() => import("@/app/resources/page"));
const LeaderboardPage = lazy(() => import("@/app/leaderboard/page"));
const GamePage = lazy(() => import("@/app/game/page"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Suspense>
      </AppShell>
      <OnboardingModal />
      <ToastStack />
    </AppProvider>
  );
}
