import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { DownloadObj, EditEvent, Tag, TextPropType, ValueLabelObj, ValueLabelObjWithUrl } from './data-card-types';
// import { LabelValue } from '../label-value/label-value';
import { TextProp } from '../text-prop/text-prop';
import { TagComponent } from '../tag/tag';
import 'iconify-icon';
import { LabelValue } from '../label-value/label-value';

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
   * URL to be used for downloading the file
   */
  @Prop() downloadUrl?: string;

  /**
   * Array of download buttons to be displayed on the card
   */
  @Prop() downloads?: Array<DownloadObj> | string;

  /**
   * Array of tags to be displayed on the card
   */
  @Prop() tags?: Array<Tag> | string;

  /**
   * Array of children cards to be displayed on the card
   */
  @Prop() childrenData?: Array<DataCard> | string

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

  @Event() editData: EventEmitter<EditEvent>;

  onEdit = () => {
    this.editData.emit({ object: this });
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
    const parsedDownloads = parseProp(this.downloads);
    const parsedTags = parseProp(this.tags);
    const parsedMetadata = parseProp(this.metadata);

    if (this.variant === 'minimal') {
      return (
        <div>
          <div class="card-container-minimal">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a download target='_blank' href={this.downloadUrl} style={{ height: '1.5em', marginRight: '.5em' }}>
                <iconify-icon icon="ci:download" height="1.2em"></iconify-icon>
              </a>
              <p class="title" style={{ fontSize: '.9em' }}>{typeof parsedTitle === 'string' ? parsedTitle : parsedTitle.value}</p>
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
                  <data-card {...child} variant="minimal" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )
    }

    if (this.variant === 'detailed') {
      return (
        <div class="modal">
          <div class="card-container-detailed">
            <div class="metadata-container">
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
                  <data-card {...child} variant="default" nested={true} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                    {typeof parsedDownloads !== 'string' && parsedDownloads?.filter(download => download.position !== 'metadata-container').map((download) => (
                      <a download={download.label} target='_blank' href={download.url} style={{ height: '1.5em', display: 'flex', alignItems: 'center' }}>
                        <iconify-icon icon="ci:download" height="1.5em"></iconify-icon>
                        <span class="subtitle">{download.label}</span>
                      </a>
                    ))}
                    {this.downloadUrl && this.downloadUrl !== '' ? (
                      <a download target='_blank' href={this.downloadUrl} style={{ height: '1.5em' }}>
                        <iconify-icon icon="ci:download" height="1.5em"></iconify-icon>
                      </a>
                    ) : null}
                    <button onClick={this.onEdit} style={{ height: '1.5em' }}>
                      <iconify-icon icon="ci:note-edit" height="1.5em"></iconify-icon>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      );
    }


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
                  <span class="subtitle" style={{ textDecoration: 'underline' }}>{parsedChildren.length} Files / Children</span>
                </button>
                : null}
              <div style={{ display: 'flex', gap: '0.5em' }}>
                  {typeof parsedDownloads !== 'string' && parsedDownloads?.filter(download => download.position !== 'metadata-container').map((download) => (
                    <a download={download.label} target='_blank' href={download.url} style={{ height: '1.5em', display: 'flex', alignItems: 'center' }}>
                      <iconify-icon icon="ci:download" height="1.5em"></iconify-icon>
                      <span class="subtitle">{download.label}</span>
                    </a>
                  ))}
                  {this.downloadUrl && this.downloadUrl !== '' ? (
                    <a download target='_blank' href={this.downloadUrl} style={{ height: '1.5em' }}>
                      <iconify-icon icon="ci:download" height="1.5em"></iconify-icon>
                    </a>
                  ) : null}
                  <button onClick={this.onEdit} style={{ height: '1.5em' }}>
                    <iconify-icon icon="ci:note-edit" height="1.5em"></iconify-icon>
                  </button>
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
    return prop;
  }
}