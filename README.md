# Visited Places

A small React + Vite app that visualizes visited places on AMap (Gaode Maps).

## Setup

1. Copy the example env file and fill in your AMap key:

```bash
cp .env.example .env.local
# then edit .env.local
```

2. Put your AMap Web JS API key in `VITE_AMAP_KEY`. If your key has JS security enabled, also set `VITE_AMAP_SECURITY_CODE`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment variables

- `VITE_AMAP_KEY` (required): AMap Web JS API key.
- `VITE_AMAP_SECURITY_CODE` (optional): Security code when JS security is enabled.

The app reads these via `import.meta.env` in `src/utils/loadAMap.ts`.
