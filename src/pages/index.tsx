import Image from 'next/image';
import { TwitterIcon } from 'app/components/icons/TwitterIcon';
import { BioListCard } from 'app/components/pages/home/BioListCard';
import { BioCard } from 'app/components/pages/home/BioCard';
import { WorkCard } from 'app/components/pages/home/WorkCard';
import { Page } from 'app/components/shared/Page';
import type { NextPage } from 'next';
import AvatarImage from 'public/avatar.jpg';
import NogilibImage from 'public/nogilib.png';

const Home: NextPage = () => (
  <Page titlePre="Home" className="font-mono flex flex-col align-center">
    <section className="flex flex-col items-center justify-center sm:flex-row mx-4">
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
      <div className="text-center mt-4 sm:text-left sm:ml-4 sm:mt-0">
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
          className="flex align-center justify-center sm:justify-start mt-2 text-zinc-700 dark:text-zinc-300"
        >
          <TwitterIcon title="Twitter" className="fill-current" />
          <span className="text-base ml-1">@yuxiao_he</span>
        </a>
      </div>
    </section>
    <section className="py-8 mx-auto">
      <div className="sheet inline-block mx-4 px-8 py-6">
        <h2 className="text-xl font-bold text-center">
          Nogizaka-driven web developer
        </h2>
      </div>
    </section>
    <section className="flex flex-col items-center px-4 pt-4 pb-8">
      <h2 className="text-2xl font-bold hashtag-heading">BIO</h2>
      <div className="flex flex-wrap justify-center mt-4">
        <BioListCard
          heading="locations"
          items={[
            { text: 'Fuzhou, China', isHighlighted: false },
            { text: 'Shenyang, China', isHighlighted: false },
            { text: 'Nagoya, Japan', isHighlighted: false },
            { text: 'Tokyo, Japan', isHighlighted: true },
          ]}
          className="flex-1 m-2 h-full"
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
          className="flex-1 m-2 h-full"
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
          className="flex-1 m-2 h-full"
        />
        <BioCard
          heading="hobbies"
          text="Nogizaka46, Genshin Impact, Karaoke"
          className="flex-1 m-2 h-full"
        />
      </div>
    </section>
    <section className="flex flex-col items-center px-4 py-8 bg-zinc-100 dark:bg-zinc-800">
    <h2 className="text-2xl font-bold hashtag-heading">Works</h2>
      <div className="flex flex-wrap justify-center mt-4">
        <WorkCard
          heading="NOGILIB"
          description="A web application showing the information about Nogizaka46"
          image={NogilibImage}
          imagePriority
          to="https://nogilib.com"
          className="flex-1 mt-2 my-6 mx-6 h-full"
        />
        <WorkCard
          heading="Nogizaka46 News"
          description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
          image={NogilibImage}
          imagePriority
          to="https://twitter.com/n46_news"
          className="flex-1 mt-2 my-6 mx-6 h-full"
        />
      </div>
    </section>
    <section className="flex flex-col items-center px-4 py-8">
      <h2 className="text-2xl font-bold hashtag-heading">Contact</h2>
      <ul className="flex flex-wrap flex-col sm:flex-row items-center justify-center p-0 mt-4 list-none">
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
