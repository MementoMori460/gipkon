import type { Config } from "tailwindcss";

// Updated to use CSS variables for dynamic theming

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                },
                secondary: {
                    50: 'var(--secondary-50)',
                    100: 'var(--secondary-100)',
                    200: 'var(--secondary-200)',
                    300: 'var(--secondary-300)',
                    400: 'var(--secondary-400)',
                    500: 'var(--secondary-500)',
                    600: 'var(--secondary-600)',
                    700: 'var(--secondary-700)',
                    800: 'var(--secondary-800)',
                    900: 'var(--secondary-900)',
                },
                'page-bg': 'var(--page-bg)',
                'page-text': 'var(--page-text)',
                'tag-bg': 'var(--tag-bg)',
                'tag-text': 'var(--tag-text)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
