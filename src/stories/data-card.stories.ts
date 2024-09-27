import exampleSFB980 from '../../examples/sfb-980.json';
import { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Data Card',
  args: {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg',
    dataTitle: 'A sample resource',
    // dataTitleType: 'string',
    // dataTitleString: "A sample resource",
    // dataTitleObject: { label: 'Title', value: 'A sample resource' },
    // subTitle: "KIT, 2020",
    subTitle: 'KIT, 2020',
    bodyText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.',
    textRight: {
      label: 'Date updated',
      value: new Date().toLocaleDateString(),
    },
    tags: [
      {
        text: 'A tag',
        color: 'green',
      },
      {
        text: 'Another tag',
        color: 'blue',
        iconName: 'ph:lock-simple-fill',
      },
    ],
    metadata: [
      { label: 'Publisher', value: 'KIT' },
      { label: 'Publication Year', value: '2020' },
      { label: 'Resource Type', value: 'Dataset' },
      { label: 'Resource Format', value: 'CSV' },
      { label: 'Created at', value: '2024-01-01 00:00:00' },
      { label: 'Last modified', value: '2024-01-01 00:00:00' },
      { label: 'License', value: 'Apache 2.0' },
      { label: 'Related identifiers', value: 'None' },
      { label: 'Alternate identifiers', value: '211fae3e-4f7e-4c3e-8f3a-9f4c9c5c9c9c', url: 'http://localhost' },
    ],
    variant: 'default',
    childrenData: [
      {
        dataTitle: 'Vatikan Vat Gr 247, 084r',
        subtitle: 'SFB 980 - A04, 2019',
        imageURL: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.thumb.jpg',
        textRight: {
          value: '2019-03-11T14:13:44Z',
          label: 'Created at',
        },
        actionButtons: [
          {
            iconName: 'ph:download-simple-light',
            url: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090',
            label: 'DataCite',
          },
        ],
        childrenData: [
          {
            dataTitle: '084r.master.jpg',
            subtitle: 'SFB 980 - A04, 2019',
            actionButtons: [
              {
                iconName: 'ph:download-simple-light',
                label: 'Download',
                url: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.master.jpg',
              },
              {
                iconName: 'ph:trash',
                label: 'Delete',
                url: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.master.jpg',
              },
            ],
            imageURL: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.thumb.jpg',
            textRight: {
              value: 'image/jpeg',
              label: 'MediaType',
            },
            tags: [
              {
                text: 'Master',
                color: 'blue',
              },
            ],
            metadata: [
              {
                label: 'Checksum',
                value: 'sha1:3ffa407982d4aa653f8dcf2232ac81df15124abb',
              },
              {
                label: 'Size',
                value: '8678356',
              },
              {
                label: 'Resolution (x)',
                value: '400',
              },
              {
                label: 'Resolution (y)',
                value: '400',
              },
              {
                label: 'Width',
                value: '3307px',
              },
              {
                label: 'Height',
                value: '4677px',
              },
            ],
          },
          {
            dataTitle: '084r.thumb.jpg',
            subtitle: 'SFB 980 - A04, 2019',
            actionButtons: [
              {
                iconName: 'ph:download-simple-light',
                label: 'Download',
                url: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.thumb.jpg',
              },
            ],
            imageURL: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.thumb.jpg',
            textRight: {
              value: 'image/jpeg',
              label: 'MediaType',
            },
            tags: [
              {
                text: 'Thumb',
                color: 'blue',
              },
            ],
            metadata: [
              {
                label: 'Checksum',
                value: 'sha1:6138a07ff149326e51b22bb74e26c17cf13b0e18',
              },
              {
                label: 'Size',
                value: '7008',
              },
              {
                label: 'Resolution (x)',
                value: '400',
              },
              {
                label: 'Resolution (y)',
                value: '400',
              },
              {
                label: 'Width',
                value: '106px',
              },
              {
                label: 'Height',
                value: '150px',
              },
            ],
          },
          {
            dataTitle: '084r.tif',
            subtitle: 'SFB 980 - A04, 2019',
            actionButtons: [
              {
                iconName: 'ph:download-simple-light',
                label: 'Download',
                url: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.tif',
              },
            ],
            imageURL: 'http://episteme2.scc.kit.edu:8080/api/v1/dataresources/85ac585d-da66-4f9e-bc5c-f55851a1c090/data/084r.thumb.jpg',
            textRight: {
              value: 'image/jpeg',
              label: 'MediaType',
            },
            tags: [
              {
                text: 'Original',
                color: 'blue',
              },
            ],
            metadata: [
              {
                label: 'Checksum',
                value: 'sha1:da5e6acf67dbb56d31900f22d9db73dfa5cae312',
              },
              {
                label: 'Size',
                value: '15467351',
              },
              {
                label: 'Resolution (x)',
                value: '400',
              },
              {
                label: 'Resolution (y)',
                value: '400',
              },
              {
                label: 'Width',
                value: '3307px',
              },
              {
                label: 'Height',
                value: '4677px',
              },
            ],
          },
        ],
      },
    ],
    downloadUrl: 'test',
    actionButtons: [
      {
        iconName: 'ph:download-simple-light',
        label: 'Download',
        url: 'https://www.google.com',
      },
      {
        iconName: 'ph:pencil',
        label: 'Edit',
        eventIdentifier: 'edit-sample',
      },
      {
        iconName: 'ph:download-fill',
        url: 'https://www.google.com',
        position: 'metadata-container',
      },
      {
        iconName: 'ph:share-network-fill',
        label: 'Share Metadata',
        url: 'https://www.google.com',
        position: 'metadata-container',
      },
    ],
    editUrl: 'test',
    downloads: [],
  },
  argTypes: {
    imageUrl: { control: 'text' },
    dataTitle: { control: 'text', defaultValue: 'A sample resource' },
    // dataTitleType: { control: "radio", options: ['string', 'object'], name: 'Type of dataTitle Prop' },
    // dataTitleString: { control: "text", defaultValue: "A sample resource", if: { arg: 'dataTitleType', eq: 'string' }, name: 'dataTitle' },
    // dataTitleObject: { control: "object", name: 'dataTitle', defaultValue: { label: 'Title', value: 'A sample resource' }, if: { arg: 'dataTitleType', eq: 'object' } },
    subTitle: { control: 'text' },
    bodyText: { control: 'text' },
    textRight: { control: 'object' },
    tags: { control: 'object' },
    metadata: { control: 'object' },
    childrenData: { control: 'object' },
    downloadUrl: { control: 'text' },
    downloads: { control: 'object' },
    variant: { control: 'radio', options: ['default', 'detailed', 'minimal'] },
  },
} satisfies Meta;

export default meta;

const Template = (args: Story['args']) =>
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
    action-buttons='${JSON.stringify(args.actionButtons)}'
    tags='${JSON.stringify(args.tags)}'
    download-url="${args.downloadUrl}"
    edit-url="${args.editUrl}"
    downloads='${JSON.stringify(args.downloads)}'
    metadata='${JSON.stringify(args.metadata)}'
    variant="${args.variant}"
  ></data-card>`;

type Story = StoryObj<typeof meta>['args'];

export const Default: Story = Template.bind({});

export const Minimal: Story = Template.bind({});
Minimal.args = {
  ...Minimal.args,
  variant: 'minimal',
};

export const Detailed: Story = Template.bind({});
Detailed.args = {
  ...Detailed.args,
  variant: 'detailed',
};

export const SFB980 = Template.bind({});
SFB980.args = {
  ...exampleSFB980,
};

export const SFB980detailed = Template.bind({});
SFB980detailed.args = {
  ...exampleSFB980,
  variant: 'detailed',
};
