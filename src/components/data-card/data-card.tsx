import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { DownloadObj, EditEvent, Tag, TextPropType, ValueLabelObj, ValueLabelObjWithUrl } from './data-card-types';
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

  @Prop() downloadUrl?: string;

  @Prop() downloads?: Array<DownloadObj> | string;

  @Prop() tags?: Array<Tag> | string;

  @Prop() childrenData?: Array<DataCard> | string

  @Prop() metadata?: Array<ValueLabelObj | ValueLabelObjWithUrl>

  @Prop() variant?: 'default' | 'detailed' | 'minimal' = 'default';

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

    return (
      <div>
        <div class="card-container">
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: '1' }}>
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