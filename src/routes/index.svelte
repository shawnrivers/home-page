<script lang="ts">
  import TwitterIcon from '$components/icons/TwitterIcon.svelte';
  import BioListCard from '$components/cards/BioListCard.svelte';
  import BioCard from '$components/cards/BioCard.svelte';
  import WorkCard from '$components/cards/WorkCard.svelte';
</script>

<svelte:head>
  <title>Home | Usho</title>
</svelte:head>

<div class="font-mono flex flex-col align-center">
  <section class="flex flex-col items-center justify-center sm:flex-row mx-4">
    <div
      class="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-gray-800"
    >
      <img
        src="/images/avatar.jpg"
        width="128"
        height="128"
        alt=""
        role="presentation"
      />
    </div>
    <div class="text-center mt-4 sm:text-left sm:ml-4 sm:mt-0">
      <h1 class="text-2xl font-bold">
        Usho Ka /
        <br />
        Yuxiao He
      </h1>
      <a
        href="https://twitter.com/yuxiao_he"
        rel="noopener"
        target="_blank"
        aria-label="Twitter: @yuxiao_he"
        class="flex align-center justify-center sm:justify-start mt-2 text-gray-700 dark:text-gray-300"
      >
        <TwitterIcon title="Twitter" class="w-6 h-6" />
        <span class="text-base ml-1">@yuxiao_he</span>
      </a>
    </div>
  </section>
  <section class="py-8 mx-auto">
    <div class="sheet inline-block mx-4 px-8 py-6 rounded-lg">
      <h2 class="text-xl font-bold text-center">
        Nogizaka-driven web developer
      </h2>
    </div>
  </section>
  <section class="flex flex-col items-center px-4 pt-4 pb-8">
    <h2 class="text-2xl font-bold hashtag-heading">BIO</h2>
    <div class="flex flex-wrap justify-center mt-4">
      <BioListCard
        heading="locations"
        items={[
          { text: 'Fuzhou, China', isHighlighted: false },
          { text: 'Shenyang, China', isHighlighted: false },
          { text: 'Nagoya, Japan', isHighlighted: false },
          { text: 'Tokyo, Japan', isHighlighted: true },
        ]}
        class="flex-1 m-2 h-full"
      />
      <BioListCard
        heading="education"
        items={[
          {
            text: 'Northeastern University (China),\nDigital Media',
            isHighlighted: false,
          },
          {
            text: 'Nagoya University,\nSociety and Media Studies',
            isHighlighted: false,
          },
          {
            text: 'University of Tokyo,\nComputer Graphics',
            isHighlighted: true,
          },
        ]}
        class="flex-1 m-2 h-full"
      />
      <BioListCard
        heading="companies"
        items={[
          {
            text: 'Eureka, Inc.\n(intern)',
            isHighlighted: false,
          },
          {
            text: 'SHOWROOM Inc.\n(intern)',
            isHighlighted: false,
          },
          {
            text: 'Eureka, Inc.',
            isHighlighted: true,
          },
        ]}
        class="flex-1 m-2 h-full"
      />
      <BioCard
        heading="hobbies"
        text="Nogizaka46, Genshin Impact, Karaoke"
        class="flex-1 m-2 h-full"
      />
    </div>
  </section>
  <section
    class="flex flex-col items-center px-4 py-8 bg-gray-100 dark:bg-gray-800"
  >
    <h2 class="text-2xl font-bold hashtag-heading">Works</h2>
    <div class="flex flex-wrap justify-center mt-4">
      <WorkCard
        heading="NOGILIB"
        description="A web application showing the information about Nogizaka46"
        image="/images/nogilib.png"
        href="https://nogilib.com"
        class="flex-1 mt-2 my-6 mx-6 h-full"
      />
      <WorkCard
        heading="Nogizaka46 News"
        description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
        image="/images/nogilib.png"
        href="https://twitter.com/n46_news"
        class="flex-1 mt-2 my-6 mx-6 h-full"
      />
    </div>
  </section>
  <section class="flex flex-col items-center px-4 py-8">
    <h2 class="text-2xl font-bold hashtag-heading">Contact</h2>
    <ul
      class="flex flex-wrap flex-col sm:flex-row items-center justify-center p-0 mt-4 list-none"
    >
      <li class="my-2 mx-4">
        <a href="https://twitter.com/yuxiao_he" target="_blank" rel="noopener">
          Twitter
        </a>
      </li>
      <li class="my-2 mx-4">
        <a
          href="https://www.facebook.com/usho.ka"
          target="_blank"
          rel="noopener"
        >
          Facebook
        </a>
      </li>
      <li class="my-2 mx-4">
        <a
          href="https://www.instagram.com/usho.ka/"
          target="_blank"
          rel="noopener"
        >
          Instagram
        </a>
      </li>
      <li class="my-2 mx-4">
        <a href="https://github.com/shawnrivers" target="_blank" rel="noopener">
          GitHub
        </a>
      </li>
    </ul>
  </section>
</div>
