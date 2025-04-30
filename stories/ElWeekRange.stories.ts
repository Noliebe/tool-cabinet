import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";

import ElWeekRange from "../packages/components/ElWeekRange";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/ElWeekRange",
  component: ElWeekRange,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    // size: { control: "select", options: ["small", "medium", "large"] },
    // backgroundColor: { control: "color" },
    modelValue: {},
  },
  args: {
    modelValue: new Date(),
  },
} satisfies Meta<typeof ElWeekRange>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    modelValue: undefined,
  },
};
