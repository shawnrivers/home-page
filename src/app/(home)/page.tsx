import { LinkedList } from '@/app/(home)/components/LinkedList';
import { Sheet } from '@/app/(home)/components/Sheet';
import { WorkCard } from '@/app/(home)/components/WorkCard';
import AvatarImage from '@/app/(home)/images/avatar.jpg';
import NogilibImage from '@/app/(home)/images/nogilib.png';
import ToGifImage from '@/app/(home)/images/to-gif.jpg';
import { HeadingAnchor } from '@/components/HeadingAnchor';
import { Twitter } from '@/components/icons/Twitter';
import { sharedMetadata } from '@/utils/meta';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Home | Usho',
  description: "Usho's home page",
  openGraph: {
    title: 'Home | Usho',
    description: "Usho's home page",
    type: 'website',
    url: 'https://usho.dev',
    images: {
      url: 'https://usho.dev/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's home page",
    },
  },
};

const bioList = [
  {
    heading: 'companies',
    items: [
      { text: 'Eureka, Inc.\n(intern)' },
      { text: 'SHOWROOM Inc.\n(intern)' },
      { text: 'Eureka, Inc.', highlighted: true },
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
    heading: 'locations',
    items: [
      { text: 'Fuzhou, China' },
      { text: 'Shenyang, China' },
      { text: 'Nagoya, Japan' },
      { text: 'Tokyo, Japan', highlighted: true },
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
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-1 text-gray-700 sm:justify-start dark:text-gray-300"
          >
            <Twitter title="Twitter" className="fill-current" />
            <span>@usho_ka</span>
          </a>
        </div>
      </section>
      <div className="mx-auto mt-8 inline-block max-w-lg space-y-2 overflow-hidden rounded-lg border-2 border-gray-900 p-4 text-base md:p-8 md:text-lg dark:border-white">
        <p>
          Hi, I{"'"}m Usho. I{"'"}m a Tokyo-based web developer at{' '}
          <a href="https://eure.jp/" target="_blank" rel="noreferrer">
            Eureka
          </a>
          . My primary focus is on <Emphasize>React</Emphasize> and{' '}
          <Emphasize>Typescript</Emphasize>.
        </p>
        <p>
          As an advocate for <Emphasize>web accessibility</Emphasize>, I{"'"}m
          passionate about creating inclusive and user-friendly websites.
        </p>
        <p>
          I speak <Emphasize>Chinese</Emphasize>,{' '}
          <Emphasize>Japanese</Emphasize>, and <Emphasize>English</Emphasize>.
        </p>
      </div>
      <section className="mt-8 flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          bio
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap items-start justify-center gap-4">
          {bioList.map(bio => (
            <Sheet
              key={bio.heading}
              heading={bio.heading}
              className="min-w-80 max-w-xs flex-1"
            >
              <LinkedList items={bio.items} />
            </Sheet>
          ))}
          <Sheet
            heading="hobbies"
            className="min-w-80 max-w-xs flex-1 text-center"
          >
            <p>Genshin Impact, Anime, Nogizaka46</p>
          </Sheet>
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          works
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          <WorkCard
            heading="NOGILIB"
            description="A web application showing the information about Nogizaka46"
            image={NogilibImage}
            to="https://nogilib.vercel.app/"
          />
          <WorkCard
            heading="Nogizaka46 News"
            description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
            image={NogilibImage}
            to="https://twitter.com/n46_news"
          />
          <WorkCard
            heading="To Gif"
            description="A simple web app that generates GIF from video file using FFmpeg WASM"
            image={ToGifImage}
            to="https://togif.vercel.app/"
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

const Emphasize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-bold uppercase">{children}</span>;
};
