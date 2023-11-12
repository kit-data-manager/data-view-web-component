export default {
    title: "Data Card",
    args: {
        first: "World",
        middle: "This is",
        last: "My Component",
    },
    argTypes: {
        first: { control: "text" },
        middle: { control: "text" },
        last: { control: "text" },
    },
}

const Template = args =>
  `<data-card first="${args.first}" middle="${args.middle}" last="${args.last}"></data-card>`;

export const Default = Template.bind({});

export const Detailed = Template.bind({});
Detailed.args = {
  first: 'John',
};