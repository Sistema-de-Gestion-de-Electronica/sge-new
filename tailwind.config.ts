import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

const sgePlugin = plugin(
  // eslint-disable-next-line @typescript-eslint/unbound-method
  function ({ addBase }) {
    addBase({
      ":root": {
        "--gray-100": "0 0% 56%",
        "--gray-200": "218 5% 34%",
        "--gray-300": "230 9% 27%",
        "--gray-400": "231 7% 19%",
        "--gray-500": "225 5% 16%",
        "--gray-600": "240 4% 13%",
        "--gray-700": "220 5% 12%",
        "--gray-800": "210 6% 7%",
        "--gray-900": "210 3 12%",
        "--primary": "59 130 246",
        "--secondary": "231 7% 19%",
        "--secondary-foreground": "220 10% 65%",
        "--positive": "148 36% 21%",
        "--positive-foreground": "151 65% 49%",
        "--primary-foreground": "46 47% 15%",
        "--muted": "224 11% 55%",
        "--border": "229 8% 27%",
        "--input": "231 7% 19%",
        "--ring": "212.7 26.8% 83.9%",
        "--success": "144 61% 46%",
        "--warning": "32 86% 57%",
        "--error": "0 86% 57%",
        "--info": "211 57% 55%",
        "--danger": "0 86% 57%",
        "--danger-foreground": "222.2 47.4% 11.2%",
        "--success-dark": "150 45% 9%",
        "--error-dark": "350 33% 9%",
        "--warning-dark": "30 36% 9%",
        "--info-dark": "200 45% 9%",
        "--midnight": "222 59% 57%",
        "--aqua": "196 45% 38%",
        "--nocturne": "0 0% 5%",
        "--negative": "351 96 70%",
        "--charcoal": "0 0% 11%",
        "--bg-menu": "var(--input)",
        "--bg-menu-item-active": "var(--primary)",
        "--text-menu-item": "var(--text-default)",
        "--text-menu-item-active": "var(--text-default)",
      },
    });
    addBase({
      ":root": {
        "--popover": "100 100% 100%",
      },
    });
  },
  {
    theme: {
      extend: {
        fontWeight: {
          btn: "700",
        },
        screens: {
          "2xl": "1600px",
          "3xl": "1800px",
          "4xl": "2000px",
          "5xl": "2400px",
          print: { raw: "print" },
          screen: { raw: "screen" },
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          foreground: colors.black,
          transparent: colors.transparent,
          "gray-100": "hsl(var(--gray-100))",
          "gray-200": "hsl(var(--gray-200))",
          "gray-300": "hsl(var(--gray-300))",
          "gray-400": "hsl(var(--gray-400))",
          "gray-500": "hsl(var(--gray-500))",
          "gray-600": "hsl(var(--gray-600))",
          "gray-700": "hsl(var(--gray-700))",
          "gray-800": "hsl(var(--gray-800))",
          "gray-900": "hsl(var(--gray-900))",
          background: {
            DEFAULT: "hsl(var(--white))",
            secondary: "hsl(var(--charcoal))",
          },
          primary: {
            DEFAULT: colors.blue[100],
            foreground: "hsl(var(--primary-foreground))",
          },
          danger: {
            DEFAULT: "hsl(var(--danger))",
            foreground: "hsl(var(--danger-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            dark: "hsl(var(--success-dark))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            dark: "hsl(var(--warning-dark))",
          },
          error: {
            DEFAULT: "hsl(var(--error))",
            dark: "hsl(var(--error-dark))",
          },
          info: {
            DEFAULT: "hsl(var(--info))",
            dark: "hsl(var(--info-dark))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: colors.black,
          },
          nocturne: {
            DEFAULT: "hsl(var(--nocturne))",
          },
          // components
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: colors.black,
          },
          aqua: {
            DEFAULT: "hsl(var(--aqua))",
            border: "hsl(var(--aqua))",
          },
          midnight: {
            DEFAULT: "hsl(var(--midnight))",
            border: "hsl(var(--midnight))",
          },
          negative: {
            DEFAULT: "hsl(var(--negative))",
          },
          positive: {
            DEFAULT: "hsl(var(--positive))",
            foreground: "hsl(var(--positive-foreground))",
          },
        },
        backgroundColor: {
          layout: `#0C0C0C`,
          sidenav: "hsl(var(--side-nav))",
          content: "#171717",
          "sidenav-menu": "hsl(var(--bg-sidenav-menu))",
          "btn-default": "hsl(var(--bg-btn-default))",
          "btn-primary": "hsl(var(--bg-btn-primary))",
          "btn-danger": "hsl(var(--bg-btn-danger))",
          "table-header": "hsl(var(--bg-table-header))",
          "table-row": "hsl(var(--bg-table-row))",
          "table-row-expanded": "hsl(var(--bg-table-row-expanded))",
          "modal-overlay": "hsl(var(--bg-modal-overlay))",
          modal: "hsl(var(--bg-modal))",
          menu: "hsl(var(--bg-menu))",
          "menu-item-active": "hsl(var(--bg-menu-item-active))",
          "tab-item-hover": "hsl(var(--bg-tab-item-hover))",
          "tab-item-active-hover": "hsl(var(--bg-tab-item-active-hover))",
          "tab-indicator": "hsl(var(--bg-tab-indicator))",
          switch: "hsl(var(--bg-switch))",
          "switch-active": "hsl(var(--bg-switch-active))",
          "switch-indicator": "hsl(var(--bg-switch-indicator))",
          "switch-indicator-active": "hsl(var(--bg-switch-indicator-active))",
          "checkbox-active": "hsl(var(--bg-checkbox-active))",
        },
        transitionTimingFunction: {
          "in-expo": "cubic-bezier(0.36, 0.66, 0.04, 1)",
          "out-expo": "cubic-bezier(0.36, 0.66, 0.04, 1)",
        },
        textColor: {
          default: "hsl(var(--text-default))",
          danger: "hsl(var(--danger))",
          "btn-default": "hsl(var(--text-btn-default))",
          "btn-primary": "hsl(var(--text-btn-primary))",
          "btn-bordered-default": "hsl(var(--text-btn-bordered-default))",
          "btn-bordered-primary": "hsl(var(--text-btn-bordered-primary))",
          "btn-danger": "hsl(var(--text-btn-danger))",
          "table-header": "hsl(var(--text-table-header))",
          "table-row": "hsl(var(--text-table-row))",
          "menu-item": "hsl(var(--text-menu-item))",
          "menu-item-active": "hsl(var(--text-menu-item-active))",
          "tab-item": "hsl(var(--text-tab-item))",
          "tab-item-hover": "hsl(var(--text-tab-item-hover))",
          "tab-item-active": "hsl(var(--text-tab-item-active))",
          "tab-item-active-hover": "hsl(var(--text-tab-item-active-hover))",
          "input-label": "hsl(var(--text-input-label))",
          "input-placeholder": "hsl(var(--text-input-placeholder))",
          "checkbox-indicator": "hsl(var(--text-checkbox-indicator))",
        },
      },
    },
  },
);

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "../../packages/shared/ui/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    sgePlugin,
  ],
} satisfies Config;
