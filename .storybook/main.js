/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {
    },
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.assetsInclude = ['/sb-preview/runtime.js'];
    return config;
  },
};
export default config;
