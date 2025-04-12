import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";

import FormTangram from "../packages/components/FormTangram";
import { rejects } from "assert";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/FormTangram",
  component: FormTangram,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    // size: { control: 'select', options: ['small', 'medium', 'large'] },
    // backgroundColor: { control: 'color' },
  },
  args: {
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof FormTangram>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    modelValue: "",
    remoteMethod: () => {
      return new Promise((rejects, resolve) => {
        rejects([
          {
            key: 233,
            label: "label",
            value: "value",
          },
        ]);
      });
    },
    // primary: true,
    // label: 'Button',
  },
};
