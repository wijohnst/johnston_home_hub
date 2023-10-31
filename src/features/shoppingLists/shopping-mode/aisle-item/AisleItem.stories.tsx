import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AisleItem } from "./AisleItem";

export default {
  title: "Shopping List/Shopping Mode/AisleItem",
  component: AisleItem,
} as ComponentMeta<typeof AisleItem>;

const Template: ComponentStory<typeof AisleItem> = (args) => (
  <table>
    <tbody>
      <tr>
        <AisleItem {...args}>Foo</AisleItem>
      </tr>
    </tbody>
  </table>
);

export const Default = Template.bind({});
Default.args = {};
