import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil-community/postcss';
import autoprefixer from 'autoprefixer';
import tailwind from '@tailwindcss/postcss';

export const config: Config = {
  namespace: 'misc-generic',
  globalStyle: 'src/global/tailwind.css',
  outputTargets: [
    //{ type: 'dist', dir: 'dist' },
    {
      type: 'dist',
      esmLoaderPath: '../dist/loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/variables.scss',
      ],
    }),
    postcss({
      plugins: [tailwind(), autoprefixer()],
    }),
  ],
};
