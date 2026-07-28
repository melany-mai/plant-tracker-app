# Plant Tracker 🌿

A web app to keep track of your plants: create, edit, and remove entries, with user authentication and navigation guards. Frontend for a Symfony API.

## Tech Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vue Router](https://router.vuejs.org/) with auth guards (guest/auth/admin routes)

## Features

- User registration and login, with token refresh and route guards
- Plants CRUD: list, create, edit, delete

## Project Setup

Requires Node.js `^22.18.0` or `>=24.12.0`.

```sh
npm install
```

Copy `.env.example` to `.env` and set the API URL:

```sh
cp .env.example .env
```

```
VITE_API_URL=https://localhost
```

### Development

```sh
npm run dev
```

### Type-check, compile and minify for production

```sh
npm run build
```

### Lint

```sh
npm run lint
```

### Format

```sh
npm run format
```
