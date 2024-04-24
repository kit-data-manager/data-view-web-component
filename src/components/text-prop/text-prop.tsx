import { h } from '@stencil/core';
import { ValueLabelObj, ValueLabelObjWithUrl } from '../data-card/data-card-types';
import { LabelValue } from '../label-value/label-value';
import { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof LabelValue>, 'label' | 'value'> & {
  prop: string | ValueLabelObj | ValueLabelObjWithUrl | undefined;
  textClass?: string;
};

export const TextProp = (props: Props) => {
  const { prop, textClass } = props;
  if (!prop) {
    return null;
  }

  if (typeof prop === 'string') {
    // Check if the string resembles HTML, in that case render it as HTML
    if (prop.match(/<[^>]*>/)) {
      return <div class={textClass} part={textClass} innerHTML={prop}></div>;
    }

    return (
      <p class={textClass} part={textClass}>
        {prop}
      </p>
    );
  }
  return <LabelValue valueTextClass={textClass} value={prop.value} label={prop.label} {...props} />;
};
