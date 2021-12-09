<script lang="ts">
  import { joinClasses } from '$utils/class';

  export let heading: string, text: string;
  let className: string | undefined;
  export { className as class };
</script>

<artcile
  class={joinClasses(
    'sheet inline-flex flex-col items-center text-center px-8 py-4 rounded-xl max-w-xs min-w-2xs',
    className,
  )}
>
  <h3 class="uppercase font-bold text-xl">{heading}</h3>
  <p class="text-sm mt-4">{text}</p>
</artcile>
