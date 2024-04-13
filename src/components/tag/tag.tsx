import { h } from '@stencil/core';
import { Tag } from '../data-card/data-card-types';

type Props = {
  tag: Tag;
};

export const TagComponent = ({ tag }: Props) => {
  const clickable = tag.url && tag.url !== '';
  return (
    <a class="tag" style={{ backgroundColor: tag.color, pointerEvents: clickable ? undefined : 'none' }} target="_blank" href={tag.url}>
      {tag.iconName ? <iconify-icon icon={tag.iconName} class="tag-icon"></iconify-icon> : null}
      <span class="tag-text" style={{ textDecoration: clickable ? 'underline' : 'none' }}>
        {tag.text}
      </span>
    </a>
  );
};
