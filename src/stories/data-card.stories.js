import exampleSFB980 from '../../examples/sfb-980.json'

export default {
  title: "Data Card",
  args: {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
    dataTitle: "A sample resource",
    // dataTitleType: 'string',
    // dataTitleString: "A sample resource",
    // dataTitleObject: { label: 'Title', value: 'A sample resource' },
    // subTitle: "KIT, 2020",
    subTitle: "KIT, 2020",
    bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
    textRight: {
      label: 'Date updated',
      value: new Date().toLocaleDateString()
    },
    tags: [{
      text: 'A tag',
      color: 'green',
    }, {
      text: 'Another tag',
      color: 'blue',
      iconName: 'ci:lock'
    }],
    metadata: {},
    variant: "My Component",
    childrenData: [],
    downloadUrl: "test",
    downloads: [],
  },
  argTypes: {
    imageUrl: { control: "text" },
    dataTitle: { control: "text", defaultValue: "A sample resource" },
    // dataTitleType: { control: "radio", options: ['string', 'object'], name: 'Type of dataTitle Prop' },
    // dataTitleString: { control: "text", defaultValue: "A sample resource", if: { arg: 'dataTitleType', eq: 'string' }, name: 'dataTitle' },
    // dataTitleObject: { control: "object", name: 'dataTitle', defaultValue: { label: 'Title', value: 'A sample resource' }, if: { arg: 'dataTitleType', eq: 'object' } },
    subTitle: { control: "text" },
    bodyText: { control: "text" },
    textRight: { control: "object" },
    tags: { control: "array" },
    metadata: { control: "array" },
    childrenData: { control: "array" },
    downloadUrl: { control: "text" },
    downloads: { control: "array" },
    variant: { control: "radio", options: ['default', 'detailed', 'minimal'] },
  },
}

const Template = args =>
  `<data-card
    image-url="${args.imageUrl}"
    data-title='${
      // args.dataTitleType === 'string' ? args.dataTitleString : JSON.stringify(args.dataTitleObject)
      args.dataTitle
    }'
    sub-title="${args.subTitle}"
    body-text="${args.bodyText}"
    text-right='${JSON.stringify(args.textRight)}'
    children-data='${JSON.stringify(args.childrenData)}'
    tags='${JSON.stringify(args.tags)}'
    download-url="${args.downloadUrl}"
    downloads='${JSON.stringify(args.downloads)}'
    metadata='${JSON.stringify(args.metadata)}'
    variant="${args.variant}"
  ></data-card>`;

export const Default = Template.bind({});

export const SFB980 = Template.bind({});
SFB980.args = exampleSFB980;