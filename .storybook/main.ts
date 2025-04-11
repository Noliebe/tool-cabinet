import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [{
    "name": "@storybook/addon-essentials",
    "options": {
      "docs": false
    }
  }, "@storybook/addon-onboarding", "@chromatic-com/storybook", "@storybook/experimental-addon-test"],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  }
};
export default config;