import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'data-view-web-component',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      outDir: './react-library/src'
      componentCorePackage: '@kit-data-manager/data-view-web-component',
      proxiesFile: './react-library/lib/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
      loaderDir: 'loader'
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
};

