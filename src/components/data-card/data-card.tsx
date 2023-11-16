import { Component, Prop, h } from '@stencil/core';
import { Tag, TextPropType, ValueLabelObj, ValueLabelObjWithUrl } from './data-card-types';
// import { LabelValue } from '../label-value/label-value';
import { TextProp } from '../text-prop/text-prop';
import { TagComponent } from '../tag/tag';
import 'iconify-icon';

@Component({
  tag: 'data-card',
  styleUrl: 'data-card.css',
  shadow: true,
})
export class DataCard {
  @Prop() imageUrl?: string;

  @Prop() dataTitle: TextPropType;

  @Prop() subTitle?: TextPropType;

  @Prop() bodyText?: TextPropType;

  @Prop() textRight?: TextPropType;

  @Prop() tags: Array<Tag> | string;

  // @ts-ignore
  @Prop() childrenData: Array<DataCard>  = ['test', 'test']

  @Prop() metadata: Array<ValueLabelObj | ValueLabelObjWithUrl>

  @Prop() variant: 'default' | 'detailed' | 'minimal' = 'default';

  componentWillUpdate() {
    console.log('data-card will render');
  }
  
  render() {
    const parsedTitle= parseTextProp(this.dataTitle);
    const parsedSubtitle = parseTextProp(this.subTitle);
    const parsedBodyText = parseTextProp(this.bodyText);
    const parsedTextRight = parseTextProp(this.textRight);

    const parsedTags = parseTextProp(this.tags) as Array<Tag>;

    return (
      <div class="card-container">
        {this.imageUrl ? (
          <div class="image-wrapper">
            <img class="card-image" src={this.imageUrl} alt="card image" />
          </div>
        ) : null}
        <div class="main-card-wrapper">
          <div class="tag-container">
            {parsedTags.map((tag) => (
              <TagComponent tag={tag} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div class="wrapper-middle">
              <TextProp prop={parsedTitle} textClass="title" />
              <TextProp prop={parsedSubtitle} textClass="subtitle" />
              <TextProp prop={parsedBodyText} textClass="bodyText" />
              {this.childrenData ?
                <button style={{ display: 'flex' }}>
                  <span class="children-text">{this.childrenData.length} Files / Children</span>
                </button>
                : null}
            </div>
            <div class="wrapper-right">
              <TextProp prop={parsedTextRight} alignRight textClass="bodyText" />
              <div style={{ display: 'flex', gap: '0.5em' }}>
                <button>
                  <iconify-icon icon="ci:download" height="1.5em"></iconify-icon>
                </button>
                <button>
                  <iconify-icon icon="ci:note-edit" height="1.5em"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// { "label": "Title", "value": "A sample resource" }

function parseTextProp<T>(prop: T): T {
  if (typeof prop !== 'string') {
    return prop;
  }
  try {
    return JSON.parse(prop);
  } catch (error) {
    return prop;
  }
}