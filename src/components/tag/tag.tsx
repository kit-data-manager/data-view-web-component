import { h } from '@stencil/core';
import { Tag } from '../data-card/data-card-types';

type Props = {
  tag: Tag;
  onActionPress: (eventIdentifier: string) => void;
};

export const TagComponent = ({ tag, onActionPress }: Props) => {
  if (!('eventIdentifier' in tag)) {

    const url = ('url' in tag) ? tag.url : '';
    const clickable = url !== '';
    const target = 'target' in tag ? tag.target : "_blank";
    return (
      <a class="tag" part="tag" style={{ backgroundColor: tag.color, pointerEvents: clickable ? undefined : 'none' }}
         target={target} href={url}>
        {tag.iconName ? <iconify-icon icon={tag.iconName} class="tag-icon" part="tag-icon"></iconify-icon> : null}
        <span class="tag-text" part="tag-text" style={{ textDecoration: clickable ? 'underline' : 'none' }}>
        {tag.text}
      </span>
      </a>
    );
  }else{
    return (
      <button onClick={() => onActionPress(tag.eventIdentifier)} class="tag" part="tag-btn" style={{ backgroundColor: tag.color }}>
        {tag.iconName ? <iconify-icon icon={tag.iconName} height="1.5em" part="tag-icon"></iconify-icon>: null}
        {tag.text ? (
          <span class="tag-text" part="tag-text">
           {tag.text}
        </span>
        ) : null}
      </button>
    );
    }
};
