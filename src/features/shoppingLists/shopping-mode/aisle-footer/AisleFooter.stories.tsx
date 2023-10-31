import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AisleFooter } from "./AisleFooter";

export default {
  title: "Shopping List/Shopping Mode/AisleFooter",
  component: AisleFooter,
} as ComponentMeta<typeof AisleFooter>;

const Template: ComponentStory<typeof AisleFooter> = (args) => (
  <table>
    <AisleFooter {...args}>
      <span>AisleFooter Works</span>
    </AisleFooter>
  </table>
);

export const Default = Template.bind({});
Default.args = {};
