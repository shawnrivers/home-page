import { LinkedList } from '@/app/(home)/components/LinkedList';
import { Sheet } from '@/app/(home)/components/Sheet';
import { SocialLink } from '@/app/(home)/components/SocialLink';
import { WorkCard } from '@/app/(home)/components/WorkCard';
import AvatarImage from '@/app/(home)/images/avatar.jpg';
import NogilibImage from '@/app/(home)/images/nogilib.png';
import ToGifImage from '@/app/(home)/images/to-gif.jpg';
import { HeadingAnchor } from '@/components/HeadingAnchor';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { XIcon } from '@/components/icons/XIcon';
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
    heading: 'locations',
    items: [
      { text: 'Fuzhou, China' },
      { text: 'Shenyang, China' },
      { text: 'Nagoya, Japan' },
      { text: 'Tokyo, Japan', highlighted: true },
    ],
  },
  {
    heading: 'companies',
    items: [
      { text: 'Eureka, Inc. (intern)' },
      { text: 'SHOWROOM Inc. (intern)' },
      { text: 'Eureka, Inc.', highlighted: true },
    ],
  },
  {
    heading: 'education',
    items: [
      { text: 'Northeastern University (China), Digital Media' },
      { text: 'Nagoya University, Society and Media Studies' },
      { text: 'University of Tokyo, Computer Graphics', highlighted: true },
    ],
  },
] satisfies {
  heading: string;
  items: { text: string; highlighted?: boolean }[];
}[];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 pb-8 font-mono">
      <section className="mx-4 flex flex-col items-center justify-center sm:flex-row">
        <Image
          priority
          src={AvatarImage}
          width="128"
          height="128"
          alt=""
          role="presentation"
          placeholder="blur"
          className="rounded-full border-4 border-gray-800 object-cover dark:border-gray-100"
        />
        <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h1 className="text-2xl font-bold">
            Usho Ka |
            <br />
            Yuxiao He
          </h1>
          <ul className="mt-2 flex flex-col gap-1">
            <li className="flex">
              <SocialLink
                href="https://twitter.com/usho_ka"
                icon={
                  <XIcon
                    title="X(Twitter)"
                    className="h-auto w-4 fill-current"
                  />
                }
                text="@usho_ka"
              />
            </li>
            <li className="flex">
              <SocialLink
                href="https://github.com/shawnrivers"
                icon={
                  <GitHubIcon
                    title="GitHub"
                    className="h-auto w-4 fill-current"
                  />
                }
                text="@shawnrivers"
              />
            </li>
          </ul>
        </div>
      </section>
      <div className="relative">
        <span
          aria-hidden
          className="absolute -top-8 left-2 font-sans text-8xl font-bold"
        >
          &ldquo;
        </span>
        <span
          aria-hidden
          className="absolute bottom-[-4.5rem] right-2 font-sans text-8xl font-bold"
        >
          &rdquo;
        </span>
        <div className="space-y-4 rounded-lg border-2 border-dashed border-gray-900 p-4 text-base md:p-8 md:text-lg dark:border-white">
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
      </div>
      <section className="flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          bio
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap items-stretch justify-center gap-4">
          {bioList.map(bio => (
            <Sheet
              key={bio.heading}
              heading={bio.heading}
              className="flex-[1_1_16rem]"
            >
              <LinkedList items={bio.items} />
            </Sheet>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          works
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          <WorkCard
            heading="To Gif"
            description="A simple web app that generates GIF from video file using FFmpeg WASM"
            image={ToGifImage}
            to="https://togif.vercel.app/"
            className="flex-[1_1_20rem]"
          />
          <WorkCard
            heading="NOGILIB"
            description="A web application showing the information about Nogizaka46"
            image={NogilibImage}
            to="https://nogilib.vercel.app/"
            className="flex-[1_1_20rem]"
          />
        </div>
      </section>
    </div>
  );
}

const Emphasize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-bold uppercase">{children}</span>;
};
