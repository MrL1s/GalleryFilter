# Gallery Filter

A starter template for building projects with **Vue 3** and **Vite**.

---

## Recommended IDE

Use [VSCode](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.  
**Note:** Disable Vetur to avoid conflicts.

---

## Type Support for `.vue` in TypeScript

TypeScript does not natively understand `.vue` files.  
To enable proper type checking:

- Replace the `tsc` CLI with [`vue-tsc`](https://www.npmjs.com/package/vue-tsc)
- Use **Volar** in your editor to make TypeScript aware of `.vue` types.

---

## Vite Configuration

See the [Vite Configuration Reference](https://vite.dev/config/) for customization.

---

## Installation

```bash
git clone https://github.com/MrL1s/GalleryFilter
cd GalleryFilter
npm install

---

## Project Structure

src/
├─ assets/
│  ├─ style/main.scss
│  └─ style/tailwind.css
├─ components/
│  ├─ __tests__/GalleryFilter.test.ts       # Vitest
│  ├─ DataCard.vue                          # data, time, comments
│  ├─ GalleryCard.vue                        # product card
│  ├─ GalleryDate.vue                        # date -> uses DataCard.vue
│  ├─ GalleryFilter.vue                      # main section
│  ├─ GalleryHeader.vue                      # header, logo, navigation
│  ├─ GalleryModal.vue                       # modal window from card
│  ├─ GallerySearch.vue                      # search by title
│  └─ IconText.vue                           # svg count, uses DataCard.vue
├─ composables/
│  └─ useGallery.ts                          # business logic
├─ data/
│  └─ image.json                             # card descriptions
├─ pages/
│  └─ HomePage.vue                           # main page
├─ router/
│  └─ index.ts                               # add logic for new pages
├─ types/
│  └─ index.ts                               # card types
├─ App.vue
└─ main.ts                                   # import styles, routes, app

Also, create a postcss.config.mjs file:

export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

---

## Project Setup

1. Development with Hot-Reload

```npm run dev```

2. Build for Production (Type-Check + Minify)

```npm run build```

3. Run Unit Tests with Vitest

```npm run test```

4. Lint with ESLint

```npm run lint```

---

Technology Stack

Vue 3

Vite

TypeScript

TailwindCSS

SCSS

Vitest (unit testing)

ESLint

---
