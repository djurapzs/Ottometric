## IMPORTANT

credentials.json file normally should't be commited to the repo, credentials should be handled within .env file that would be in .gitIgnore

## Prerequisites

- Node.js ≥ 14
- npm
- A running instance of the application, reachable via `BASE_URL`

## Setup

1. Clone this repo
2. `npm install`
3. Create a `.env` in project root:
4. `npx cypress open` (or `npm run cypress:open`)
5. optional : headless (without browser) run npm run cypress:run
