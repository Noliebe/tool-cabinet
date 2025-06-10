import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";

import DozenImage from "../packages/components/DozenImage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/DozenImage | 一打图片",
  component: DozenImage,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DozenImage>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    list: ["/img-a.jpg", "/img-b.png", "/img-c.jpg"],
  },
};

export const moreThen: Story = {
  args: {
    list: ["/img-a.jpg"],
  },
};
