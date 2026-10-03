import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx("span", { className: "h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" }) }));
}
export default function App() {
    return (_jsxs(AppProvider, { children: [_jsx(AppShell, { children: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/assessment", element: _jsx(AssessmentPage, {}) }), _jsx(Route, { path: "/careers", element: _jsx(CareersPage, {}) }), _jsx(Route, { path: "/diagnostic", element: _jsx(DiagnosticPage, {}) }), _jsx(Route, { path: "/roadmap", element: _jsx(RoadmapPage, {}) }), _jsx(Route, { path: "/resources", element: _jsx(ResourcesPage, {}) }), _jsx(Route, { path: "/leaderboard", element: _jsx(LeaderboardPage, {}) }), _jsx(Route, { path: "/game", element: _jsx(GamePage, {}) })] }) }) }), _jsx(OnboardingModal, {}), _jsx(ToastStack, {})] }));
}
