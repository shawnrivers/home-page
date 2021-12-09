<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ page }) => {
    return {
      props: {
        path: page.path,
      },
    };
  };
</script>

<script lang="ts">
  import '../app.css';

  export let path: string;

  const navItems: { label: string; page: string }[] = [
    { label: 'Home', page: '/' },
    { label: 'Blog', page: '/blog' },
  ];

  function pathMatchesNav(params: { path: string; navPage: string }): boolean {
    const { path, navPage } = params;

    if (path === navPage) {
      return true;
    }

    if (path.startsWith('/blog/') && navPage === '/blog') {
      return true;
    }
  }

  const START_YEAR = 2020;
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear === START_YEAR ? currentYear : `${START_YEAR}-${currentYear}`;
</script>

<div class="min-h-screen flex flex-col">
  <header class="block h-16 px-4 mb-8 text-center">
    <nav>
      {#each navItems as navItem}
        <li class="inline-block px-2 py-4">
          <a
            href={navItem.page}
            class={`text-xl font-bold${
              pathMatchesNav({ path, navPage: navItem.page })
                ? ' text-blue-400'
                : ''
            }`}>{navItem.label}</a
          >
        </li>
      {/each}
    </nav>
  </header>
  <main class="flex-1 mb-8">
    <slot />
  </main>
  <footer class="py-8 text-center bg-gray-700">
    <p class="text-base text-white font-mono px-4">
      Copyright @ {copyrightYears} Usho Ka (Yuxiao He). All rights reserved.
    </p>
  </footer>
</div>
