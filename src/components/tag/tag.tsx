import { h } from "@stencil/core";
import { Tag } from "../data-card/data-card-types";

type Props = {
	tag: Tag
}

export const TagComponent = ({ tag }: Props) => {
	return (
		<div class="tag" style={{ backgroundColor: tag.color }}>
			{/* TODO: icon */}
			<span class="tag-text">{tag.text}</span>
		</div>
	)
}