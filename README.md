# The Verdant Veil

[The Verdant Veil](https://www.theverdantveil.com/) is a video game review site
with an admin for generating and updating games based on the [IGDB
API](https://api-docs.igdb.com/#getting-started).

## Philosophy

The Verdant Veil favors modular, testable abstractions. Logic is centralized in
facades, hooks, and utilities rather than within components.

## Getting Started

First, you'll need to clone [the API](https://github.com/greenymcgee/the-verdant-veil-api)
and start a local development server for the backend. Once you've got a backend
running, copy the `.env.example` file into a new `.env.local` file. Now you
should be ready to run locally with this command:

```bash
npm run dev
```

Then open [http://localhost:3001](http://localhost:3001) with your browser to
see the result.

## Storybook

To open a local Storybook server, run the following command:

```bash
npm run storybook
```

## Vitest

To run vitest locally, there are a couple of commands. This command will run
tests and watch for file changes:

```bash
npm run test
```

This command will output coverage:

```bash
npm run test:coverage
```

## Validate

To run all of the actions that will run in the CI/CD pipeline, you can run the following command:

```bash
npm run validate
```

## Core Dependencies

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://github.com/axios/axios)
- [Date-fns](https://date-fns.org/)
- [Jose](https://github.com/panva/jose)
- [SWR](https://swr.vercel.app/)
- [Zod](https://github.com/colinhacks/zod)

## Core Dev Dependencies

- [Storybook](https://storybook.js.org/)
- [ESLint](https://eslint.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [Fishery](https://github.com/thoughtbot/fishery)
- [MSW](https://github.com/mswjs/msw)
- [Prettier](https://github.com/prettier/prettier)

## Infrastructure

The aim is to keep a clean separation of concerns throughout all of the various
features of The Verdant Veil. Logic will typically not be found inside of a
component, and usually abstractions are made within a nearby util, hook, facade,
or some combination of all of the above.

### Server Actions

Server actions belong in the `src/actions/` directory, and the tests also belong
within the same directory. The `withCallbacks` util exists to support running
callbacks in components after a server action has succeeded or failed.

### Components

The Verdant Veil's components are built purely using TailwindCSS. The global
components can all be found in `src/components/`, and they each have their own
directory with their own tests, utils, facades, or whatever might be needed
specifically for the component itself. These components should be simple and not
know much about anything except what its job is. Each component in this
directory should have a matching Storybook story.

### Colocated Components

With the introduction of the app directory, Next.js gave us access to
colocation, and The Verdant Veil takes full advantage of this. Each page usually
has its own set of tools, such as facades, utils, or components, and they all
live right inside the page’s namespace.

### Context

Context should be used sparingly, but when it is needed it belongs in the
`src/context/` directory, and each Provider should be added to the `Providers`
component. The `renderWithProviders` and `renderHookWithProviders` test utils
might also need updates when a new Provider is added.

### Facades

Facades are sometimes created in a colocated namespace, but typically facades
belong in the `src/facades/` directory.

### Hooks

The `src/hooks/` directory is intended for global hooks that can be used
anywhere like `useToggle` or `useWindowSize`. There is also an `api` namespace
for hooks that reach out to the backend using SWR.

### Lib

This directory is for any code that is typically a wrapper for a library like
Jose or Pino.

### Policies

Policies are functions that enforce route protection when given a NextRequest.

### Test

The `src/test/` directory is a place to store any utils, helpers, factories,
fixtures, components, etc. that are related to testing. The `src/test/servers/`
directory is for storing MSW servers.

### Utils

This is the directory for global utils that can be used anywhere within the app.

## Generating Types

The `generate-types` script in the `package.json` will run a script within the
`lib/` directory to pull JSON schemas from `the-verdant-veil-api` and use them
to generate type definitions for every endpoint in the API. You must set an
environment variable in your bash or zsh profile:
`LOCAL_THE_VERDANT_VEIL_API_GIT_REPO`. Make sure to set the value to the path
where the backend repo is stored locally.
