# Dental Light

Demo website for Dental Light, a private dental clinic I made up for my portfolio. The business, people and prices are fictional; the code is real.

A private dental clinic for the whole family, from check-ups and hygiene to implants and orthodontics.

## Status

Live at https://dental-light-phi.vercel.app

What is built:

- Home: treatments and prices, doctors with their days, patient quotes
- Online booking (`/book`): treatment, doctor, day strip and free times from a typed demo diary, sent as a booking request
- Visit us page (`/contact`) with hours and a question form

Still to do:

- [ ] Before and after slider

## Design

Light and reassuring: sage and cream with dark green text and soft rounded corners.

| Token | Value |
| --- | --- |
| bg | `#FBF8F2` |
| surface | `#DDE8E0` |
| fg | `#24332C` |
| muted | `#4F5F57` |
| border | `#C9D8CE` |
| accent | `#2F5D4A` |
| on accent | `#FFFFFF` |
| link | `#2F5D4A` |
| error | `#B42318` |
| radius | `14px` |

Headings use Lora, body text uses Nunito Sans. Both are self-hosted from `app/fonts` through `next/font/local`.

## Stack

- Next.js 16 (App Router), React 19
- TypeScript in strict mode
- Tailwind CSS 4
- zod for form validation
- Vitest and Testing Library
- Lighthouse CI

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run check` | Type check, lint and tests |
| `npm run lighthouse` | Builds the site, runs Lighthouse five times on mobile and fails if the median score in any category drops below 95 or the median LCP goes above 2.5 s |

## Contact form

Enquiries go to a Telegram chat. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Without them the form runs in demo mode and tells the visitor that nothing was sent.

## Deploying

Import the repository in Vercel and add the two Telegram variables if the form should deliver leads. If the domain changes, update `url` in `content/site.ts` and `tests/metadata.test.ts`.

## Credits

Fonts are licensed under the SIL Open Font License; the license texts are in `app/fonts`. Photos are hotlinked from Unsplash and credited in the site footer.

## License

Code: MIT
