import { Component, Prop, h } from '@stencil/core';
import { Tag, TextPropType, ValueLabelObj, ValueLabelObjWithUrl } from './data-card-types';
import { LabelValue } from '../label-value/label-value';

@Component({
  tag: 'data-card',
  styleUrl: 'data-card.css',
  shadow: true,
})
export class DataCard {
  @Prop() imageUrl?: string;

  @Prop() dataTitle: TextPropType;

  @Prop() subTitle: TextPropType;

  @Prop() bodyText: TextPropType;

  @Prop() textRight: TextPropType;

  @Prop() tags: Array<Tag>;

  // @Prop() children: Array<DataCard>

  @Prop() metadata: Array<ValueLabelObj | ValueLabelObjWithUrl>

  @Prop() variant: 'default' | 'detailed' | 'minimal' = 'default';

  componentWillUpdate() {
    console.log('data-card will render');
  }
  
  render() {
    console.log('imageURL:', this.imageUrl);
    return (
      <div class="card-container">
        {this.imageUrl ? (
          <div class="image-wrapper">
            <img class="card-image" src={this.imageUrl} alt="card image" />
          </div>
        ) : null}
        <div class="wrapper-middle">
          <h2 class="title">{this.dataTitle}</h2>
          <span class="subtitle">{this.subTitle}</span>
          <p class="bodyText">{this.bodyText}</p>
        </div>
        <div class="wrapper-right">
          {this.textRight !== null && typeof this.textRight === 'object' ? (
            <LabelValue alignRight label={this.textRight.label} value={this.textRight.value} />
          ) : null}
        </div>
      </div>
    );
  }
}