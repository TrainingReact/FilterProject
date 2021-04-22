import React from "react";
import FilterHeader from "./FilterHeader";

export default {
  title: "FilterHeader",
  component: "FilterHeader",
  argTypes: {
    classname: {
      name: "classname",
      control: "text",
      required: true,
    },
    label: "text",

    mapping: {
      control: {
        type: "select",
        options: ["Bold", "Italic"],
      },
      backgroundColor: { control: "color" },
    },
  },
};
const Template = (args) => <FilterHeader {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  label: "Primary",
  classname: "primary",
  backgroundColor: "#FFFF00",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary",
  classname: "secondary",
  backgroundColor: "#B0E0E6",
};
