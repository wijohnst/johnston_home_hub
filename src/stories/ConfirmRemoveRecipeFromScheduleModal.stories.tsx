import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ConfirmRemoveRecipeFromScheduleModal from "../features/mealPlanner/ConfirmRemoveRecipeFromScheduleModal/ConfirmRemoveRecipeFromScheduleModal";

export default {
  title: "Modals/ConfirmRemoveRecipeFromScheduleModal",
  component: ConfirmRemoveRecipeFromScheduleModal,
} as ComponentMeta<typeof ConfirmRemoveRecipeFromScheduleModal>;

const Template: ComponentStory<typeof ConfirmRemoveRecipeFromScheduleModal> = (
  args
) => <ConfirmRemoveRecipeFromScheduleModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isModalShown: true,
  handleConfirmation: () => {},
  handleCancel: () => {},
};
