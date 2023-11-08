export default {
    title: "My Component",
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
  `<my-component first="${args.first}" middle="${args.middle}" last="${args.last}"></my-component>`;

export const Default = Template.bind({});

export const Detailed = Template.bind({});
Detailed.args = {
  first: 'John',
};