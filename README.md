# Bankway Frontend


## Stack

- Angular 20 (standalone components)
- Angular Material (`mat-table`, animations)
- Reactive Forms
- SCSS with **exact Figma variable names** (`--background/surface`, `--typography/title/large/size`, etc.) in `src/styles/_tokens.scss`

## Setup

From the `bankway` directory:

```bash
cd frontend
npm install
npm start
```

If Angular CLI is not installed globally:

```bash
npm install -g @angular/cli@20
```

Open http://localhost:4200

## Design tokens

All colors, spacing, and typography use CSS custom properties matching the Figma file. Components reference tokens only (no hardcoded hex in component SCSS except via tokens).

## Structure

- `src/app/pages/basic-information` — HomePage frame
- `src/app/components/securities-table` — table, toolbar, pagination
- `src/app/components/status-badge` — success badge (موفقیت)
- `src/assets/icons` — icons exported from Figma MCP assets
# bankway-frontend
