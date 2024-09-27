import { h } from '@stencil/core';

type Props = {
  label: string;
  value: string;
  alignRight?: boolean;
  valueTextClass?: string;
  url?: string;
  target?: string;
  detailed?:boolean;
};

export const LabelValue = ({ label, value, alignRight, valueTextClass, url, target, detailed}: Props) => {
  return (
    <div class="label-value-wrapper" part="label-value-wrapper">
      <span class={`label ${alignRight ? 'alignRight' : ''}`} part={`${detailed ? 'detailed-label':''} label ${alignRight ? 'alignRight' : ''}`}>
        {label}
      </span>
      {url ? (
        <a
          href={url}
          target={target}
          class={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}
          part={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}
          style={{ textDecoration: 'underline' }}
        >
        <span class={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}
              part={`${detailed ? 'detailed-value' : ''} ${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}>
          {value}
        </span>
        </a>
      ) : (
        <span class={`${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`} part={`${detailed ? 'detailed-value':''} ${alignRight ? 'alignRight' : ''} ${valueTextClass ?? 'value'}`}>
          {value}
        </span>
      )}
    </div>
  );
};
