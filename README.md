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
