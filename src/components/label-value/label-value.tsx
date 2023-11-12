import { h } from "@stencil/core";

type Props = {
	label: string;
	value: string;
	alignRight?: boolean
}

export const LabelValue = ({ label, value, alignRight }: Props) => {
	return (
		<div class="label-value-wrapper">
			<span class={{ label: true, alignRight }}>{label}</span>
			<span class={{ value: true, alignRight }}>{value}</span>
		</div>
	)
}