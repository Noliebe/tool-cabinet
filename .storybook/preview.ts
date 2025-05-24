import type { Preview } from '@storybook/vue3'
// import DocumentationTemplate from './DocumentationTemplate.mdx'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-select.css'
import '../packages/components/style/tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // docs: {
    //   page: DocumentationTemplate
    // }
  },
};

export default preview;