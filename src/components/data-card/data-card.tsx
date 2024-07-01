import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { ActionEvent, Tag, TextPropType, ValueLabelObj, ValueLabelObjWithUrl, ActionButtonInterface } from './data-card-types';
// import { LabelValue } from '../label-value/label-value';
import { TextProp } from '../text-prop/text-prop';
import { TagComponent } from '../tag/tag';
import 'iconify-icon';
import { LabelValue } from '../label-value/label-value';
import { ActionButton } from '../action-button/action-button';

@Component({
  tag: 'data-card',
  styleUrl: 'data-card.css',
  shadow: true,
})
export class DataCard {
  /**
   * URL of the image to be displayed on the card
   */
  @Prop() imageUrl?: string;

  /**
   * Title of the card
   */
  @Prop() dataTitle: TextPropType;

  /**
   * Subtitle of the card
   */
  @Prop() subTitle?: TextPropType;

  /**
   * Body text of the card
   */
  @Prop() bodyText?: TextPropType;

  /**
   * Text to be displayed on the right of the card
   */
  @Prop() textRight?: TextPropType;

  /**
   * Array of action buttons to be displayed on the card
   */
  @Prop() actionButtons?: Array<ActionButtonInterface> | string;

  /**
   * Array of tags to be displayed on the card
   */
  @Prop() tags?: Array<Tag> | string;

  /**
   * Array of children cards to be displayed on the card
   */
  @Prop() childrenData?: Array<DataCard> | string;

  /**
   * Clickable label to display when the card has children
   */
  @Prop() childrenLabel?: string;

  /**
   * Array of metadata to be displayed on the card in the detailed view
   */
  @Prop() metadata?: Array<ValueLabelObj | ValueLabelObjWithUrl> | string;

  /**
   * Variant of the card
   */
  @Prop() variant?: 'default' | 'detailed' | 'minimal' = 'default';

  /**
   * Variant of the card's children
   */
  @Prop() childrenVariant?: 'default' | 'minimal' = 'minimal';

  /**
   * Whether the card is being used inside of the detailed view
   */
  @Prop() nested = false;

  /**
   * Whether the card is currently displaying its children
   */
  @State() hasChildrenOpened = false;

  /**
   * Event emitted when an action button is clicked
   */
  @Event() actionClick: EventEmitter<ActionEvent>;

  private onActionPress = (identifier: string) => {
    this.actionClick.emit({ dataObject: this, eventIdentifier: identifier });
  };

  private onChildrenClick = () => {
    this.hasChildrenOpened = !this.hasChildrenOpened;
  };

  render() {
    console.log(this.metadata);
    const parsedTitle = parseProp(this.dataTitle);
    const parsedSubtitle = parseProp(this.subTitle);
    const parsedBodyText = parseProp(this.bodyText);
    const parsedTextRight = parseProp(this.textRight);
    const parsedChildren = parseProp(this.childrenData);
    const parsedActionButtons = parseProp(this.actionButtons);
    const parsedTags = parseProp(this.tags);
    const parsedMetadata = parseProp(this.metadata);



    // Minimal variant
    if (this.variant === 'minimal') {
      return (
        <div>
          <div class="minimal-card-container" part="minimal-card-container">
            <div class="minimal-title-container">
              {typeof parsedActionButtons !== 'string' &&
                parsedActionButtons
                  ?.filter(action => action.position !== 'metadata-container')
                  .map(action => <ActionButton noLabel action={action} onActionPress={this.onActionPress} />)}
              <p class="title minimal-title">{typeof parsedTitle === 'string' ? parsedTitle : parsedTitle.value}</p>
            </div>
            <div class="minimal-title-container">
              <p class="label">{typeof parsedTextRight === 'string' ? parsedTextRight : parsedTextRight.value}</p>
              {typeof parsedChildren !== 'string' && parsedChildren && parsedChildren.length > 0 ? (
                <button onClick={this.onChildrenClick} class="minimal-children-btn">
                  <iconify-icon icon={`ci:chevron-${this.hasChildrenOpened ? 'up' : 'down'}`} height="1.5em"></iconify-icon>
                </button>
              ) : null}
            </div>
          </div>
          {this.hasChildrenOpened ? (
            <div class="minimal-children-container">
              {typeof parsedChildren !== 'string' &&
                parsedChildren?.map(child => (
                  <div class="minimal-child-wrapper">
                    <data-card variant="minimal" {...child} />
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      );
    }

    // Detailed variant
    if (this.variant === 'detailed') {
      return (
        <div class="modal">
          <div class="detailed-card-container" part="detailed-card-container">
            {parsedMetadata != undefined &&
              <div class="detailed-metadata-container" part="detailed-metadata-container">
                <div class="detailed-metadata-content-container" part="detailed-metadata-content-container">
                  <p class="title">Metadata</p>
                  <div class="detailed-metadata-content">
                    {typeof parsedMetadata !== 'string' &&
                      parsedMetadata?.map(metadata => (
                        <LabelValue label={metadata.label} value={metadata.value} valueTextClass="bodyText"
                                    url={'url' in metadata ? metadata.url : undefined} />
                      ))}
                  </div>
                </div>
                <div class="detailed-action-btns-container">
                  {typeof parsedActionButtons !== 'string' &&
                    parsedActionButtons
                      ?.filter(action => action.position === 'metadata-container')
                      .map(action => <ActionButton action={action} onActionPress={this.onActionPress} />)}
                </div>
              </div>
            }
            <div class="detailed-main-wrapper">
              <div class="card-container detailed-main-card">
                {this.imageUrl && this.imageUrl !== '' ? (
                  <div class="image-wrapper">
                    <img class="card-image" src={this.imageUrl} alt="card image" />
                  </div>
                ) : null}
                <div class="main-card-wrapper">
                  <div class="tag-container">{typeof parsedTags !== 'string' && parsedTags?.map(tag => <TagComponent tag={tag} />)}</div>
                  <div class="main-card-body" /* style={{ display: 'flex', flexDirection: 'row' }} */>
                    <div class="wrapper-middle">
                      <TextProp prop={parsedTitle} textClass="title" />
                      <TextProp prop={parsedSubtitle} textClass="subtitle" />
                      <TextProp prop={parsedBodyText} textClass="bodyText" />
                    </div>
                    <div class="wrapper-right">
                      <TextProp prop={parsedTextRight} alignRight textClass="bodyText" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="detailed-children-container">
                {typeof parsedChildren !== 'string' && parsedChildren?.map(child => <data-card variant="default" {...child} nested={true} exportparts="card-container, detailed-card-container,image-wrapper"/>)}
              </div>
              <div class="detailed-action-btns-container">
                {typeof parsedActionButtons !== 'string' &&
                  parsedActionButtons
                    ?.filter(action => action.position !== 'metadata-container')
                    .map(action => <ActionButton action={action} onActionPress={this.onActionPress} />)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div>
        <div
          part="card-container"
          class="card-container"
          style={{
            backgroundColor: this.nested ? 'var(--lighterBG)' : undefined,
          }}
        >
          {this.imageUrl && this.imageUrl !== '' ? (
            <div class="image-wrapper" part="image-wrapper">
              <img class="card-image" src={this.imageUrl} alt="card image" />
            </div>
          ) : null}
          <div class="main-card-wrapper">
            {typeof parsedTags !== 'string' && parsedTags && parsedTags.length > 0 ? (
              <div class="tag-container">{typeof parsedTags !== 'string' && parsedTags?.map(tag => <TagComponent tag={tag} />)}</div>
            ) : null}
            <div class="main-card-body">
              <div class="wrapper-middle">
                <TextProp prop={parsedTitle} textClass="title" />
                <TextProp prop={parsedSubtitle} textClass="subtitle" />
                <TextProp prop={parsedBodyText} textClass="bodyText" />
              </div>
              <div class="wrapper-right">
                <TextProp prop={parsedTextRight} alignRight textClass="bodyText" />
              </div>
            </div>
            <div class="default-card-footer">
              {parsedChildren ? (
                <button onClick={this.onChildrenClick} class="default-children-button">
                  <span class="subtitle children-btn-label">
                    {parsedChildren.length} {this.childrenLabel ?? 'Files / Children'}
                  </span>
                </button>
              ) : (
                <div></div>
              )}
              <div class="default-action-btns-container">
                {typeof parsedActionButtons !== 'string' &&
                  parsedActionButtons
                    ?.filter(action => action.position !== 'metadata-container')
                    .map(action => <ActionButton action={action} onActionPress={this.onActionPress} />)}
              </div>
            </div>
          </div>
        </div>
        {this.hasChildrenOpened ? (
          <div class="children-container">{typeof parsedChildren !== 'string' && parsedChildren?.map(child => <data-card {...child} variant={this.childrenVariant} />)}</div>
        ) : null}
      </div>
    );
  }
}

// { "label": "Title", "value": "A sample resource" }

function parseProp<T>(prop: T): T | undefined {
  if (typeof prop !== 'string') {
    return prop;
  }
  try {
    return JSON.parse(prop);
  } catch (error) {
    console.log('error parsing prop', prop, error, 'returning prop as is');
    return prop;
  }
}
