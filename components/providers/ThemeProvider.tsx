"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    refreshTheme: async () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

// Helper to generate shades (simplified for demo, ideally use a color library)
// For now, we will just set the primary-500 and let others be approximations 
// or simpler: we only drastically change the main color and keep shades fixed ratio??
// Better approach for a robust system: use a small lib like 'tinycolor2' or 'colord' 
// BUT I cannot install packages without permission.
// So I will implement a basic Hex to HSL converter and lightness shifter.

function hexToHSL(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const refreshTheme = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            if (!res.ok) return;
            const settings = await res.json();
            const primaryColor = settings.theme?.primaryColor;

            if (primaryColor) {
                const hsl = hexToHSL(primaryColor);
                if (hsl) {
                    const shades = {
                        50: 95, 100: 90, 200: 80, 300: 70, 400: 60,
                        500: hsl.l, 600: Math.max(hsl.l - 10, 10),
                        700: Math.max(hsl.l - 20, 10), 800: Math.max(hsl.l - 30, 5),
                        900: Math.max(hsl.l - 40, 2),
                    };
                    const root = document.documentElement;
                    Object.entries(shades).forEach(([key, lightness]) => {
                        const hex = hslToHex(hsl.h, hsl.s, lightness);
                        root.style.setProperty(`--primary-${key}`, hex);
                    });
                }
            }

            const secondaryColor = settings.theme?.secondaryColor;
            if (secondaryColor) {
                const hsl = hexToHSL(secondaryColor);
                if (hsl) {
                    const shades = {
                        50: 95, 100: 90, 200: 80, 300: 70, 400: 60,
                        500: hsl.l, 600: Math.max(hsl.l - 10, 10),
                        700: Math.max(hsl.l - 20, 10), 800: Math.max(hsl.l - 30, 5),
                        900: Math.max(hsl.l - 40, 2),
                    };
                    const root = document.documentElement;
                    Object.entries(shades).forEach(([key, lightness]) => {
                        const hex = hslToHex(hsl.h, hsl.s, lightness);
                        root.style.setProperty(`--secondary-${key}`, hex);
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load theme", error);
        }
    };

    useEffect(() => {
        refreshTheme();
    }, []);

    return (
        <ThemeContext.Provider value={{ refreshTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
