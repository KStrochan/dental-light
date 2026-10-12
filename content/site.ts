import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Dental Light",
  description:
    "A private dental clinic for the whole family, from check-ups and hygiene to implants and orthodontics.",
  url: "https://dental-light-phi.vercel.app",
  locale: "en",
  routes: ["/", "/book", "/contact"],
  nav: [
    { href: "/#treatments", label: "Treatments and prices" },
    { href: "/#doctors", label: "Doctors" },
    { href: "/contact", label: "Visit us" },
  ],
  contact: {
    phone: "+1 (555) 016-5500",
    address: "7 Linden Avenue, Greenfield",
    hours: "Mon to Fri 8:00 to 19:00, Sat 10:00 to 18:00",
  },
  photoCredits: [
    { author: "Benyamin Bohlouli", url: "https://unsplash.com/@benyamin_bohlouli" },
    { author: "SoyBreno", url: "https://unsplash.com/@soybrenofotografia" },
    { author: "Lesly Juarez", url: "https://unsplash.com/@jblesly" },
    { author: "Ozkan Guner", url: "https://unsplash.com/@dentistozkanguner" },
  ],
};
