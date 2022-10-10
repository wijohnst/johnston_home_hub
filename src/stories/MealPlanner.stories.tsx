import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { QueryClientProvider, QueryClient } from "react-query";

import MealPlanner from "../features/mealPlanner/MealPlanner";
import { WidgetWrapper } from "../App.style";

const queryClient = new QueryClient();

export default {
  title: "MealPlanner/MealPlanner",
  component: MealPlanner,
  decorators: [
    (Story) => (
			<QueryClientProvider client={queryClient}>
      <WidgetWrapper>
        <Story />
      </WidgetWrapper>
			</QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof MealPlanner>;

const Template: ComponentStory<typeof MealPlanner> = (args) => <MealPlanner />;

export const Default = Template.bind({});
Default.args = {};
