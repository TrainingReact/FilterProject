import React from "react";
import FilterHeader from "./FilterHeader";

export default {
  title: "FilterHeader",
  component: "FilterHeader",
  argTypes: {
    backgroundColor: { control: "color" },
    label: { variant: "label" },
  },
};

const Template = (args) => <FilterHeader {...args} />;
export const Primary = () => Template.bind({});
Primary.args = {
  primary: true,
  label: "Primary",
  backgroundColor: "#FF1493",
};

export const Secondary = () => Template.bind({});
Secondary.args = {
  secondary: true,
  label: "Secondary",
  backgroundColor: "#FFA500",
};
