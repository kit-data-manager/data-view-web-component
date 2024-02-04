import { h } from "@stencil/core";
import { ActionButtonInterface } from "../data-card/data-card-types";

type Props = {
	action: ActionButtonInterface
  onActionPress: (eventIdentifier: string) => void
  noLabel?: boolean
}

export const ActionButton = ({ action, onActionPress, noLabel }: Props) => {
  if ('url' in action) {
    return (
      <a target={action.urlTarget ?? '_blank'} href={action.url} style={{ height: '1.5em', display: 'flex', alignItems: 'center' }}>
        <iconify-icon icon={action.iconName} height="1.5em"></iconify-icon>
        {noLabel ? null : (
          <span class="subtitle">{action.label}</span>
        )}
      </a>
    );
  }

	return (
		<button onClick={() => onActionPress(action.eventIdentifier)} style={{ height: '1.5em', display: 'flex', alignItems: 'center' }}>
      <iconify-icon icon={action.iconName} height="1.5em"></iconify-icon>
      {noLabel ? null : (
        <span class="subtitle">{action.label}</span>
      )}
    </button>
	)
}