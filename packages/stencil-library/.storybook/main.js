import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {
    },
  },

  async viteFinal(config) {
    config.assetsInclude = ['/sb-preview/runtime.js'];
    return config;
  }
};
export default config;

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
