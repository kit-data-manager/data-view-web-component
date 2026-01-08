import { h } from '@stencil/core';
import { ActionButtonInterface } from '../data-card/data-card-types';

type Props = {
  action: ActionButtonInterface;
  onActionPress: (eventIdentifier: string) => void;
  noLabel?: boolean;
};

export const ActionButton = ({ action, onActionPress, noLabel }: Props) => {
  const tooltip = 'tooltip' in action ? action.tooltip : '';

  const handleClick = () => {
    if ('url' in action) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else {
      onActionPress(action.eventIdentifier);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={tooltip}
      class="action-btn-icon"
      part="action-btn-icon"
      aria-label={noLabel ? action.label : undefined}
    >
      <iconify-icon
        icon={action.iconName}
        height="1.5em"
        part="action-btn-iconify"
      ></iconify-icon>

      {noLabel ? null : (
        <span class="subtitle" part="subtitle">
          {action.label}
        </span>
      )}
    </button>
  );
};
