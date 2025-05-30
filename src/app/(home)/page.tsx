import { LinkedList } from '@/app/(home)/_components/LinkedList';
import { Sheet } from '@/app/(home)/_components/Sheet';
import { SocialLink } from '@/app/(home)/_components/SocialLink';
import { WorkCard } from '@/app/(home)/_components/WorkCard';
import AvatarImage from '@/app/(home)/_images/avatar.jpg';
import NogilibImage from '@/app/(home)/_images/nogilib.png';
import ToGifImage from '@/app/(home)/_images/to-gif.jpg';
import { HeadingAnchor } from '@/components/HeadingAnchor';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { XIcon } from '@/components/icons/XIcon';
import { sharedMetadata } from '@/libs/utils/meta';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';

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

const BIO_LIST = [
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
      {
        text: (
          <>
            <span className="font-bold">Eureka</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Front-end Engineer (intern)
            </span>
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold">SHOWROOM</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Front-end Engineer (intern)
            </span>
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold">Eureka</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Front-end Engineer
            </span>
            <br />
            <span className="font-bold">Alumnote</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Front-end Engineer (contractor)
            </span>
          </>
        ),
        highlighted: true,
      },
    ],
  },
  {
    heading: 'education',
    items: [
      {
        text: (
          <>
            <span className="font-bold">Northeastern University (China)</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Digital Media
            </span>
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold">Nagoya University</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Society and Media Studies
            </span>
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold">University of Tokyo</span>:
            <br />
            <span className="text-gray-600 dark:text-gray-300">
              Computer Graphics
            </span>
          </>
        ),
        highlighted: true,
      },
    ],
  },
] satisfies {
  heading: string;
  items: React.ComponentProps<typeof LinkedList>['items'];
}[];

const WORK_LIST = [
  {
    heading: 'NOGILIB',
    description: 'A web application showing the information about Nogizaka46',
    image: NogilibImage,
    to: 'https://nogilib.vercel.app/',
  },
  {
    heading: 'To Gif',
    description:
      'A simple web app that generates GIF from video file using FFmpeg WASM',
    image: ToGifImage,
    to: 'https://togif.vercel.app/',
  },
] satisfies {
  heading: string;
  description: string;
  image: StaticImageData;
  to: string;
}[];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 pb-8">
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
          <h1 className="text-2xl font-bold tracking-wide font-serif">
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
          className="absolute -top-8 left-2 text-8xl font-bold font-mono select-none"
        >
          &ldquo;
        </span>
        <span
          aria-hidden
          className="absolute bottom-[-4.5rem] right-2 text-8xl font-mono font-bold select-none"
        >
          &rdquo;
        </span>
        <div className="space-y-4 rounded-lg border-2 border-dashed border-gray-900 p-4 md:p-8 md:text-lg dark:border-white tracking-wide">
          <p>Hey there! I{"'"}m Usho, a web front-end engineer in Tokyo.</p>
          <p>
            My primary focus is on <Emphasize>React</Emphasize>,{' '}
            <Emphasize>Typescript</Emphasize>, and{' '}
            <Emphasize>Accessibility</Emphasize>. I{"'"}m passionate about
            creating inclusive and user-friendly websites.
          </p>
          <p>
            When not coding, you'll find me in{' '}
            <a
              href="https://genshin.hoyoverse.com/en/home"
              target="_blank"
              rel="noreferrer"
            >
              <Emphasize>Teyvat</Emphasize>
            </a>
            .
          </p>
        </div>
      </div>
      <section className="flex flex-col items-center">
        <HeadingAnchor as="h2" className="text-2xl font-bold">
          bio
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap items-stretch justify-center gap-4">
          {BIO_LIST.map(bio => (
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
          {WORK_LIST.map(work => (
            <WorkCard
              key={work.heading}
              heading={work.heading}
              description={work.description}
              image={work.image}
              to={work.to}
              className="flex-[1_1_20rem] z-0 rotate-0 scale-100 hover:scale-110 hover:odd:-rotate-3 hover:even:rotate-3 duration-300 hover:z-10"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const Emphasize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-bold uppercase">{children}</span>;
};
