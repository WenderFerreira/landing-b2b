# landing-b2b

Landing page B2B em React + Vite.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy no EasyPanel com Nixpacks

- Provider: `GitHub`
- Repository: `WenderFerreira/landing-b2b`
- Branch: `main`
- Build Type: `Nixpacks`
- Root Directory: `/`
- Port: `4173`

O arquivo [`nixpacks.toml`](/C:/Users/pichau/landing-b2b/nixpacks.toml) fixa o Node 20 e usa `npm ci`, `npm run build` e `npm run start`.
