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
  @Prop() childrenData?: Array<DataCard> | string

  /**
   * Clickable label to display when the card has children
   */
  @Prop() childrenLabel?: string

  /**
   * Array of metadata to be displayed on the card in the detailed view
   */
  @Prop() metadata?: Array<ValueLabelObj | ValueLabelObjWithUrl> | string

  /**
   * Variant of the card
   */
  @Prop() variant?: 'default' | 'detailed' | 'minimal' = 'default';

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

  onActionPress = (identifier: string) => {
    this.actionClick.emit({ dataObject: this, eventIdentifier: identifier });
  };

  onChildrenClick = () => {
    this.hasChildrenOpened = !this.hasChildrenOpened;
  }
  
  render() {
    const parsedTitle= parseProp(this.dataTitle);
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
          <div class="card-container-minimal">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {typeof parsedActionButtons !== 'string' && parsedActionButtons?.filter(action => action.position !== 'metadata-container').map((action) => (
                <ActionButton noLabel action={action} onActionPress={this.onActionPress} />
              ))}
              <p class="title" style={{ fontSize: '.9em', marginLeft: '0.5em' }}>{typeof parsedTitle === 'string' ? parsedTitle : parsedTitle.value}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p class="label">{typeof parsedTextRight === 'string' ? parsedTextRight : parsedTextRight.value}</p>
              {typeof parsedChildren !== 'string' && parsedChildren && parsedChildren.length > 0 ?(
                <button onClick={this.onChildrenClick} style={{ marginLeft: '.5em' }}>
                  <iconify-icon icon={`ci:chevron-${this.hasChildrenOpened ? 'up' : 'down'}`} height="1.5em"></iconify-icon>
                </button>
              ) : null}
            </div>
          </div>
          {this.hasChildrenOpened ? (
            <div class="minimal-children-container">
              {typeof parsedChildren !== 'string' && parsedChildren?.map((child) => (
                <div class="minimal-child-wrapper">
                  <data-card variant="minimal" {...child} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )
    }

    // Detailed variant
    if (this.variant === 'detailed') {
      return (
        <div class="modal">
          <div class="card-container-detailed">
            <div class="metadata-container">
              <div style={{ flex: '1' }}>
                <p class="title">Metadata</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em', marginTop: '0.75em' }}>
                  {typeof parsedMetadata !== 'string' && parsedMetadata?.map((metadata) => (
                    <LabelValue
                      label={metadata.label}
                      value={metadata.value}
                      valueTextClass='bodyText'
                      url={'url' in metadata ? metadata.url : undefined}
                    />
                  ))}
                </div>
            </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse', gap: '0.5em' }}>
                {typeof parsedActionButtons !== 'string' && parsedActionButtons?.filter(action => action.position === 'metadata-container').map((action) => (
                  <ActionButton action={action} onActionPress={this.onActionPress} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '7' }}>
              <div class="card-container" style={{ padding: '0' }}>
                {this.imageUrl && this.imageUrl !== '' ? (
                  <div class="image-wrapper">
                    <img class="card-image" src={this.imageUrl} alt="card image" />
                  </div>
                ) : null}
                <div class="main-card-wrapper">
                  <div class="tag-container">
                    {typeof parsedTags !== 'string' && parsedTags?.map((tag) => (
                      <TagComponent tag={tag} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              <div style={{ flex: '1', width: '-webkit-fill-available', marginTop: '1em' }}>
                {typeof parsedChildren !== 'string' && parsedChildren?.map((child) => (
                  <data-card variant="default" {...child} nested={true} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    {typeof parsedActionButtons !== 'string' && parsedActionButtons?.filter(action => action.position !== 'metadata-container').map((action) => (
                      <ActionButton action={action} onActionPress={this.onActionPress} />
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div style={{ width: '-webkit-fill-available' }}>
        <div
          class="card-container"
          style={{
            backgroundColor: this.nested ? 'var(--lighterBG)' : undefined,
          }}
        >
          {this.imageUrl && this.imageUrl !== '' ? (
            <div class="image-wrapper">
              <img class="card-image" src={this.imageUrl} alt="card image" />
            </div>
          ) : null}
          <div class="main-card-wrapper">
            <div class="tag-container">
              {typeof parsedTags !== 'string' && parsedTags?.map((tag) => (
                <TagComponent tag={tag} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div class="wrapper-middle">
                <TextProp prop={parsedTitle} textClass="title" />
                <TextProp prop={parsedSubtitle} textClass="subtitle" />
                <TextProp prop={parsedBodyText} textClass="bodyText" />
              </div>
              <div class="wrapper-right">
                <TextProp prop={parsedTextRight} alignRight textClass="bodyText" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: '1', marginTop: '0.75em' }}>
              {parsedChildren ?
                <button onClick={this.onChildrenClick} style={{ display: 'flex' }}>
                  <span class="subtitle" style={{ textDecoration: 'underline' }}>{parsedChildren.length} {this.childrenLabel ?? 'Files / Children'}</span>
                </button>
                : null}
              <div style={{ display: 'flex', gap: '0.5em' }}>
                  {typeof parsedActionButtons !== 'string' && parsedActionButtons?.filter(action => action.position !== 'metadata-container').map((action) => (
                      <ActionButton action={action} onActionPress={this.onActionPress} />
                  ))}
                </div>
            </div>
          </div>
        </div>
        {this.hasChildrenOpened ? (
          <div class="children-container">
            {typeof parsedChildren !== 'string' && parsedChildren?.map((child) => (
              <data-card {...child} variant="minimal" />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

// { "label": "Title", "value": "A sample resource" }

function parseProp<T>(prop: T): T {
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