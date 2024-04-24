import { h } from '@stencil/core';
import { ActionButtonInterface } from '../data-card/data-card-types';

type Props = {
  action: ActionButtonInterface;
  onActionPress: (eventIdentifier: string) => void;
  noLabel?: boolean;
};

export const ActionButton = ({ action, onActionPress, noLabel }: Props) => {
  if ('url' in action) {
    return (
      <a target={action.urlTarget ?? '_blank'} href={action.url} class="action-btn-icon" part="action-btn-icon">
        <iconify-icon icon={action.iconName} height="1.5em" part="action-btn-iconify"></iconify-icon>
        {noLabel ? null : (
          <span class="subtitle" part="subtitle">
            {action.label}
          </span>
        )}
      </a>
    );
  }

  return (
    <button onClick={() => onActionPress(action.eventIdentifier)} class="action-btn-icon" part="action-btn-icon">
      <iconify-icon icon={action.iconName} height="1.5em" part="action-btn-iconify"></iconify-icon>
      {noLabel ? null : (
        <span class="subtitle" part="subtitle">
          {action.label}
        </span>
      )}
    </button>
  );
};
