import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/AppShell";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ToastStack } from "@/components/ToastStack";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata = {
    title: "FutureReady – Life & Career Navigator",
    description: "Career assessment, diagnostics, and roadmaps for Higher Secondary students (Grades 11–12).",
};
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: "en", suppressHydrationWarning: true, children: _jsx("body", { className: `${geistSans.variable} ${geistMono.variable} antialiased`, children: _jsxs(AppProvider, { children: [_jsx(AppShell, { children: children }), _jsx(OnboardingModal, {}), _jsx(ToastStack, {})] }) }) }));
}
