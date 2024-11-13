/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                border: "#4ee17b8f",
                input: "",
                ring: "",
                background: { 1: "#f2f2f2", 2: "#d1d1d1" },
                dark: {
                    1: "#292929",
                    2: "#c2c2c2",
                    3: "#dbdbdbb3"
                },
                primary: {
                    1: "#4ee17b",
                    2: "#185132"
                },
                secondary: {
                    1: "",
                    2: ""
                },
                destructive: {
                    1: "#ba1717",
                    2: "#cb1010"
                },
                muted: {
                    1: "#e2e2e2",
                    2: "#c8c8c8"
                },
                accent: {
                    1: "",
                    2: ""
                },
                popover: {
                    1: "",
                    2: ""
                },
                card: {
                    1: "#ebebebe4",
                    2: "#69d3991f"
                }
            },

            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};
