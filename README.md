# misc-generic
[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


### Project status

## 👉 Work in progress
This repository is a public Stencil-based web component library (form fields, UI primitives, Storybook). APIs and styling may change until a stable `v1.0.0` release.

Recommended Git workflow: default branch **`main`** for releases; active development on **`development`** (or feature branches merged into `development`).

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full text.

## Requirements

- Node.js (LTS recommended)
- npm

## Install

```bash
git clone <your-repository-url> misc-generic
cd misc-generic
npm install
```

## Build

Production build (Stencil):

```bash
npm run build
```

Tailwind CSS is compiled into `src/global/tailwind.generated.css` for the design tokens pipeline:

```bash
npm run tailwind:build
```

For local work, `npm run dev` runs Tailwind in watch mode together with Stencil and Storybook (see below).

## Development

- **Stencil watch + dev server:** `npm start` (or `npm run build:watch` without the static server).
- **Storybook:** `npm run storybook` (build components first, or use the combined dev script).
- **Full dev stack (Tailwind watch + Stencil watch + Storybook):** `npm run dev`

## Tests

```bash
npm test
```

## Storybook static build

```bash
npm run build-storybook
```

## About Stencil

Stencil compiles TypeScript and JSX into standards-based **Custom Elements** that run in modern browsers and can be used with or without a framework. See the [Stencil documentation](https://stenciljs.com/docs/introduction) for publishing, lazy loading, and distribution targets.

