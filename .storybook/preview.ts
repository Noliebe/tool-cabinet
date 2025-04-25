import type { Preview } from '@storybook/vue3'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-select.css'
// import './tailwind.css'
// import "tailwindcss/index.css";
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;