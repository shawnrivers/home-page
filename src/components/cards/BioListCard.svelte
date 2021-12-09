<script lang="ts">
	import { joinClasses } from '$utils/class';

	export let heading: string,
		items: {
			text: string;
			isHighlighted: boolean;
		}[];
	let className: string | undefined;
	export { className as class };
</script>

<article
	class={joinClasses(
		'sheet inline-flex flex-col items-center px-8 pt-4 pb-2 rounded-xl max-w-xs min-w-2xs',
		className
	)}
>
	<h3 class="uppercase font-bold text-xl">{heading}</h3>
	<ul class="mt-4">
		{#each items as item, index}
			<li class="relative">
				<div
					class={`round-dot border-gray-200 dark:border-gray-700 absolute box-border ${
						item.isHighlighted ? 'bg-blue-400' : 'bg-gray-400'
					}`}
				/>
				<div
					class={joinClasses(
						'border-l-2 pb-4 pl-4',
						index < items.length - 1 ? 'border-gray-400' : 'border-gray-200 dark:border-gray-700'
					)}
				>
					<p class="text-sm whitespace-pre-wrap">{item.text}</p>
				</div>
			</li>
		{/each}
	</ul>
</article>

<style>
	.round-dot {
		width: 18px;
		height: 18px;
		border-width: 4px;
		border-radius: 50%;
		top: 0;
		left: -8px;
	}
</style>
