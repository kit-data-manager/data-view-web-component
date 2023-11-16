import { h } from "@stencil/core";

type Props = {
	label: string;
	value: string;
	alignRight?: boolean
	valueTextClass?: string
}

export const LabelValue = ({ label, value, alignRight, valueTextClass }: Props) => {
	return (
		<div class="label-value-wrapper">
			{/* <span class={{ label: true, alignRight }}>{label}</span> */}
			<span class={`label ${alignRight ? 'alignRight': ''}`}>{label}</span>
			<span class={`${alignRight ? 'alignRight': ''} ${valueTextClass ?? 'value'}`}>{value}</span>
		</div>
	)
}