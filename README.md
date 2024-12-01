# Green Quest Frontend

This is the frontend that reaches out to `green-quest-api`.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to
see the result.

## Lib

The `generate-types` script in the `package.json` will run a script within the
`lib/` directory to pull JSON schemas from `green-quest-api` and use them to
generate type definitions for every endpoint in the API. You must set an
environment variable in your bash or zsh profile:
`LOCAL_GREEN_QUEST_API_GIT_REPO`.

## Next.js Generated Docs

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API. - [Learn Next.js](https://nextjs.org/learn) - an interactive
  Next.js tutorial.
