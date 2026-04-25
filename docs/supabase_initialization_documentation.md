# Supabase initialization

This document describes how the **coffee-app** Expo project configures and exports the Supabase client.

## Overview

The app uses a single shared client from `@supabase/supabase-js`, defined in `lib/supabase.ts`. The setup follows the standard **Expo + React Native** pattern: a URL polyfill, SQLite-backed `localStorage` for auth persistence, and public environment variables for the project URL and anon (publishable) key.

## Dependencies

| Package | Role |
|--------|------|
| `@supabase/supabase-js` | `createClient`, Auth, PostgREST, Realtime, Storage |
| `react-native-url-polyfill` | Polyfills `URL` and related APIs so the Supabase client runs correctly in React Native |
| `expo-sqlite` | `expo-sqlite/localStorage/Install` provides a `localStorage` implementation backed by SQLite (persistent across app restarts on native) |

## Environment variables

The client reads **Expo public** variables (available at build time via `process.env`):

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project API URL |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key — safe for client apps |

Set these in `.env` at the project root. For EAS Build or CI, configure the same variables in your build secrets or environment. Do **not** put the **service role** key in `EXPO_PUBLIC_*` or any client bundle.

## Initialization flow

1. **`react-native-url-polyfill/auto`** — Imported first so URL APIs exist before Supabase initializes.
2. **`createClient`** from `@supabase/supabase-js`.
3. **`expo-sqlite/localStorage/Install`** — Installs a global `localStorage` compatible with the Auth client on React Native.
4. **`createClient(url, key, { auth: { ... } })`** — Configures auth storage and session behavior.

## Source

Implementation lives in `lib/supabase.ts`:

```ts
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import 'expo-sqlite/localStorage/Install';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublicKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublicKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```

## Auth options

| Option | Value | Purpose |
|--------|--------|---------|
| `storage` | `localStorage` | After the Expo SQLite install, this refers to persistent device storage (not browser-only `window.localStorage` on native). |
| `autoRefreshToken` | `true` | Refreshes the session before expiry when possible. |
| `persistSession` | `true` | Keeps the user signed in across app restarts. |
| `detectSessionInUrl` | `false` | Typical for native/Expo: OAuth fragments in the page URL are not used the same way as in a browser SPA. |

## Usage in the app

Import the singleton; avoid creating a second `createClient` for the same project unless you have a specific reason (e.g. tests with a mock):

```ts
import { supabase } from '@/lib/supabase';
```

Adjust the import path to match your TypeScript path aliases or use a relative path to `lib/supabase`.

## Troubleshooting

- **Missing env vars**: Non-null assertions (`!`) assume variables are defined. If they are missing, the URL or key may be `undefined` and requests will fail with opaque errors.
- **Official reference**: [Using Supabase with Expo (React Native)](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) covers polyfills, storage, and `detectSessionInUrl`.
