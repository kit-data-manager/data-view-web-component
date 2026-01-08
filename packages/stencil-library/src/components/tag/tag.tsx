import { h } from '@stencil/core';
import { Tag } from '../data-card/data-card-types';

type Props = {
  tag: Tag;
  onActionPress: (eventIdentifier: string) => void;
};

export const TagComponent = ({ tag, onActionPress }: Props) => {
  const tooltip = 'tooltip' in tag ? tag.tooltip:'';
  if (!('eventIdentifier' in tag)) {
    const url = ('url' in tag) ? tag.url : '';
    const clickable = url !== '' ;
    const target = 'target' in tag ? tag.target : (clickable ? "_blank" : '');
    const pointable = tooltip != '';

    if(!clickable){
      return (
        <a class="tag" title={tooltip} part="tag"
           style={{ backgroundColor: tag.color, pointerEvents: pointable ? undefined : 'none', cursor: 'default'}}
        >
          {tag.iconName ? <iconify-icon icon={tag.iconName} class="tag-icon" part="tag-icon"></iconify-icon> : null}
          <span class="tag-text" part="tag-text" style={{ textDecoration: 'none' }}>
        {tag.text}
      </span>
        </a>
      );
    }

    return (
      <a class="tag" title={tooltip} part="tag"
         style={{ backgroundColor: tag.color, pointerEvents: clickable || pointable ? undefined : 'none'}}
         href={url} target={target}
        >
        {tag.iconName ? <iconify-icon icon={tag.iconName} class="tag-icon" part="tag-icon"></iconify-icon> : null}
        <span class="tag-text" part="tag-text" style={{ textDecoration: clickable ? 'underline' : 'none' }}>
        {tag.text}
      </span>
      </a>
    );
  }else{
    return (
      <button title={tooltip} onClick={() => onActionPress(tag.eventIdentifier)} class="tag" part="tag-btn"
              style={{ backgroundColor: tag.color }}>
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
