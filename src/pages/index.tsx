import Image from 'next/image';
import { TwitterIcon } from 'app/components/icons/TwitterIcon';
import { BioListCard } from 'app/components/pages/home/BioListCard';
import { BioCard } from 'app/components/pages/home/BioCard';
import { WorkCard } from 'app/components/pages/home/WorkCard';
import { Page } from 'app/components/shared/Page';
import type { NextPage } from 'next';
import AvatarImage from 'public/avatar.jpg';
import NogilibImage from 'public/nogilib.png';
import { HeadingWithAnchor } from 'app/components/shared/HeadingWithAnchor';

const Home: NextPage = () => (
  <Page titlePre="Home" className="align-center flex flex-col font-mono">
    <section className="mx-4 flex flex-col items-center justify-center sm:flex-row">
      <div className="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-zinc-800">
        <Image
          src={AvatarImage}
          width="128"
          height="128"
          priority
          alt=""
          role="presentation"
        />
      </div>
      <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h1 className="text-2xl font-bold">
          Usho Ka /
          <br />
          Yuxiao He
        </h1>
        <a
          href="https://twitter.com/yuxiao_he"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter: @yuxiao_he"
          className="align-center mt-2 flex justify-center text-zinc-700 dark:text-zinc-300 sm:justify-start"
        >
          <TwitterIcon title="Twitter" className="fill-current" />
          <span className="ml-1 text-base">@yuxiao_he</span>
        </a>
      </div>
    </section>
    <section className="mx-auto py-8">
      <div className="sheet mx-4 inline-block px-8 py-6">
        <h2 className="text-center text-xl font-bold">
          Nogizaka-driven web developer
        </h2>
      </div>
    </section>
    <section className="flex flex-col items-center px-4 pt-4 pb-8">
      <HeadingWithAnchor as="h2" level={1} className="text-2xl font-bold">
        BIO
      </HeadingWithAnchor>
      <div className="mt-4 flex flex-wrap justify-center">
        <BioListCard
          heading="locations"
          items={[
            { text: 'Fuzhou, China', isHighlighted: false },
            { text: 'Shenyang, China', isHighlighted: false },
            { text: 'Nagoya, Japan', isHighlighted: false },
            { text: 'Tokyo, Japan', isHighlighted: true },
          ]}
          className="m-2 h-full flex-1"
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
          className="m-2 h-full flex-1"
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
          className="m-2 h-full flex-1"
        />
        <BioCard
          heading="hobbies"
          text="Nogizaka46, Genshin Impact, Karaoke"
          className="m-2 h-full flex-1"
        />
      </div>
    </section>
    <section className="flex flex-col items-center bg-zinc-100 px-4 py-8 dark:bg-zinc-800">
      <HeadingWithAnchor as="h2" level={1} className="text-2xl font-bold">
        Works
      </HeadingWithAnchor>
      <div className="mt-4 flex flex-wrap justify-center">
        <WorkCard
          heading="NOGILIB"
          description="A web application showing the information about Nogizaka46"
          image={NogilibImage}
          imagePriority
          to="https://nogilib.com"
          className="my-6 mx-6 mt-2 h-full flex-1"
        />
        <WorkCard
          heading="Nogizaka46 News"
          description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
          image={NogilibImage}
          imagePriority
          to="https://twitter.com/n46_news"
          className="my-6 mx-6 mt-2 h-full flex-1"
        />
      </div>
    </section>
    <section className="flex flex-col items-center px-4 py-8">
      <HeadingWithAnchor as="h2" level={1} className="text-2xl font-bold">
        Contact
      </HeadingWithAnchor>
      <ul className="mt-4 flex list-none flex-col flex-wrap items-center justify-center p-0 sm:flex-row">
        <li className="my-2 mx-4">
          <a
            href="https://twitter.com/yuxiao_he"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li className="my-2 mx-4">
          <a
            href="https://www.facebook.com/usho.ka"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li className="my-2 mx-4">
          <a
            href="https://www.instagram.com/usho.ka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
        <li className="my-2 mx-4">
          <a
            href="https://github.com/shawnrivers"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </section>
  </Page>
);

export default Home;
