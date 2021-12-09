<script lang="ts">
  import { joinClasses } from '$utils/class';
  import ArrowRightIcon from '$components/icons/ArrowRightIcon.svelte';

  export let heading: string;
  export let description: string;
  export let image: string;
  export let href: string;
  let className: string = undefined;
  export { className as class };
</script>

<a
  {href}
  rel="noopener"
  aria-label={heading}
  class={joinClasses(
    'inline-block text-center text-gray-900 no-underline hover:no-underline group',
    className,
  )}
>
  <article
    class="card card-shadow card-clickable overflow-visible relative inline-flex flex-col items-center text-center px-8 py-4 rounded-xl border-4 border-gray-800 dark:border-white dark:hover:bg-gray-600 max-w-xs min-w-2xs group-hover:shadow-xl"
  >
    <div
      class="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-gray-700 dark:border-white -mt-20 mb-4"
    >
      <img src={image} width="128" height="128" alt="" role="presentation" />
    </div>
    <h3 class="uppercase font-bold text-xl">{heading}</h3>
    <p class="text-sm mt-4">{description}</p>
    <div
      class="absolute -bottom-4 -right-4 inline-block p-2 rounded-full bg-gray-700 dark:bg-white card-shadow"
    >
      <ArrowRightIcon class="fill-current text-white dark:text-gray-700" />
    </div>
  </article>
</a>
