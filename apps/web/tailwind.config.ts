import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
                extend: {
                    fontFamily: {
                        sans: ['"General Sans"', 'sans-serif'],
                        display: ['"Outfit"', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#fff3f0',
                            100: '#ffe3dd',
                            400: '#ff8a70',
                            500: '#FF5533', // Primary Orange
                            600: '#e63e1c',
                        },
                        dark: {
                            900: '#0F172A',
                            800: '#1E293B',
                            700: '#334155',
                        }
                    },
                    boxShadow: {
                        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
                        'glow': '0 0 20px rgba(255, 85, 51, 0.35)',
                        'nav': '0 -4px 20px rgba(0,0,0,0.03)',
                    },
                    borderRadius: {
                        '3xl': '1.5rem',
                        '4xl': '2rem',
                    }
                }
            },
  plugins: [],
};
export default config;
