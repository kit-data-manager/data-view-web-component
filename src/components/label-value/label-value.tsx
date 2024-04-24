import { h } from '@stencil/core';

type Props = {
  label: string;
  value: string;
  alignRight?: boolean;
  valueTextClass?: string;
  url?: string;
};

export const LabelValue = ({ label, value, alignRight, valueTextClass, url }: Props) => {
  return (
    <div class="label-value-wrapper" part="label-value-wrapper">
      <span class={`label ${alignRight ? 'alignRight' : ''}`} part={`label ${alignRight ? 'alignRight' : ''}`}>
        {label}
      </span>
      {url ? (
        <a
          href={url}
          class={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}
          part={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}
          style={{ textDecoration: 'underline' }}
        >
          {value}
        </a>
      ) : (
        <span class={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`} part={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}>
          {value}
        </span>
      )}
    </div>
  );
};
