import { LinkedList } from '@/app/(home)/components/LinkedList';
import { Sheet } from '@/app/(home)/components/Sheet';
import { WorkCard } from '@/app/(home)/components/WorkCard';
import AvatarImage from '@/app/(home)/images/avatar.jpg';
import NogilibImage from '@/app/(home)/images/nogilib.png';
import { HeadingAnchor } from '@/components/HeadingAnchor';
import { Twitter } from '@/components/icons/Twitter';
import Image from 'next/image';

const bioList = [
  {
    heading: 'locations',
    items: [
      { text: 'Fuzhou, China' },
      { text: 'Shenyang, China' },
      { text: 'Nagoya, Japan' },
      { text: 'Tokyo, Japan', highlighted: true },
    ],
  },
  {
    heading: 'education',
    items: [
      { text: 'Northeastern University (China),\nDigital Media' },
      { text: 'Nagoya University,\nSociety and Media Studies' },
      { text: 'University of Tokyo,\nComputer Graphics', highlighted: true },
    ],
  },
  {
    heading: 'companies',
    items: [
      { text: 'Eureka, Inc.\n(intern)' },
      { text: 'SHOWROOM Inc.\n(intern)' },
      { text: 'Eureka, Inc.', highlighted: true },
    ],
  },
] satisfies {
  heading: string;
  items: { text: string; highlighted?: boolean }[];
}[];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="mx-4 flex flex-col items-center justify-center sm:flex-row">
        <Image
          priority
          src={AvatarImage}
          width="128"
          height="128"
          alt=""
          role="presentation"
          placeholder="blur"
          className="rounded-full border-4 border-gray-800 object-cover"
        />
        <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h1 className="text-2xl font-bold">
            Usho Ka /
            <br />
            Yuxiao He
          </h1>
          <a
            href="https://twitter.com/usho_ka"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300 sm:justify-start"
          >
            <Twitter title="Twitter" className="fill-current" />
            <span>@usho_ka</span>
          </a>
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          bio
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap items-start justify-center gap-4">
          {bioList.map(bio => (
            <Sheet
              key={bio.heading}
              heading={bio.heading}
              className="min-w-[20rem]  max-w-xs flex-1"
            >
              <LinkedList items={bio.items} />
            </Sheet>
          ))}
          <Sheet
            heading="hobbies"
            className="min-w-[20rem] max-w-xs flex-1 text-center"
          >
            <p>Genshin Impact, Anime, Nogizaka46</p>
          </Sheet>
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          works
        </HeadingAnchor>
        <div className="mt-2 flex flex-wrap justify-center gap-8">
          <WorkCard
            heading="NOGILIB"
            description="A web application showing the information about Nogizaka46"
            image={NogilibImage}
            to="https://nogilib.com"
          />
          <WorkCard
            heading="Nogizaka46 News"
            description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
            image={NogilibImage}
            to="https://twitter.com/n46_news"
          />
        </div>
      </section>
      <section className="mt-12 flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          contact
        </HeadingAnchor>
        <ul className="mt-4 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          <li>
            <a
              href="https://twitter.com/usho_ka"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/usho.ka"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://github.com/shawnrivers"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
