import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'data-view-web-component',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    reactOutputTarget({
      outDir: '../react-library/lib/components/stencil-generated/',
      hydrateModule: '@kit-data-manager/data-view-web-component/hydrate',
      clientModule: '@kit-data-manager/data-view-web-component',
      proxiesFile:
        '../data-view-web-component-react/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
    },
  ],
  extras: {
    enableImportInjection: true,
  },
  testing: {
    browserHeadless: 'new',
  },
  preamble:
    '\n' +
    'Copyright 2026 Karlsruhe Institute of Technology.\n' +
    '\n' +
    'Licensed under the Apache License, Version 2.0 (the "License");\n' +
    'you may not use this file except in compliance with the License.\n' +
    'You may obtain a copy of the License at\n' +
    '\n' +
    '      https://www.apache.org/licenses/LICENSE-2.0\n' +
    '\n' +
    'Unless required by applicable law or agreed to in writing, software\n' +
    'distributed under the License is distributed on an "AS IS" BASIS,\n' +
    'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
    'See the License for the specific language governing permissions and\n' +
    'limitations under the License.\n',
};

