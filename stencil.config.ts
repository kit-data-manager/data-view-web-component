import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'data-view-web-component',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: 'data-view-web-component',
      proxiesFile: './react-library/lib/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
      loaderDir: 'loader',
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
};
