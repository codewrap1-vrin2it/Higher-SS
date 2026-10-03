"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/storage";
export function ThemeToggle() {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.theme);
        const preferDark = stored === "dark" ||
            (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDark(preferDark);
        document.documentElement.classList.toggle("dark", preferDark);
    }, []);
    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem(STORAGE_KEYS.theme, next ? "dark" : "light");
    };
    return (_jsx("button", { type: "button", onClick: toggle, className: "rounded-lg p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800", "aria-label": "Toggle theme", children: dark ? _jsx(Sun, { className: "h-5 w-5" }) : _jsx(Moon, { className: "h-5 w-5" }) }));
}
