# Next.js preview

This project now runs the Cekat Next.js app and its routes locally.

```sh
pnpm install
pnpm dev
```

The dev server uses port `4173`. The root route serves the existing `index.html`
through a Next.js route handler; its original styles, assets, and `main.js`
animation are copied into `public/`. Other pages use the Next.js routes and
design copied from `/Users/novandri511/Cekat`.
