import localFont from "next/font/local";

export const headingFont = localFont({
  src: "./fonts/lora-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: "./fonts/nunito-sans-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
