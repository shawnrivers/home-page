'use cache';

import type { Metadata } from 'next';
import Image from 'next/image';
import { LinkedList } from '@/app/(pages)/(home)/_components/LinkedList';
import { Sheet } from '@/app/(pages)/(home)/_components/Sheet';
import { SocialLink } from '@/app/(pages)/(home)/_components/SocialLink';
import AvatarImage from '@/app/(pages)/(home)/_images/avatar.jpg';
import { HeadingAnchor } from '@/components/HeadingAnchor';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { MediumIcon } from '@/components/icons/MediumIcon';
import { XIcon } from '@/components/icons/XIcon';
import { sharedMetadata } from '@/libs/utils/meta';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Home | Usho',
  description: "Usho's home page",
  openGraph: {
    title: 'Home | Usho',
    description: "Usho's home page",
    type: 'website',
    url: '/',
    images: {
      url: '/og-image.jpg',
      type: 'image/jpeg',
      width: 1280,
      height: 640,
      alt: "Usho's home page",
    },
  },
};

const BIO_LIST = [
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

export default async function Home() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 pb-8">
      <section className="mx-4 flex flex-col items-center justify-center sm:flex-row">
        <Image
          preload
          src={AvatarImage}
          width={160}
          height={160}
          alt=""
          role="presentation"
          placeholder="blur"
          className="rounded-full size-40 border-4 border-gray-800 object-cover dark:border-gray-100"
        />
        <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h1 className="text-3xl font-bold tracking-wide font-display">
            Usho Ka <span className="text-gray-400 dark:text-gray-600">/</span>
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
            <li className="flex">
              <SocialLink
                href="https://medium.com/@ushoka"
                icon={
                  <MediumIcon
                    title="Medium"
                    className="h-auto w-4 -translate-x-0.5 fill-current"
                  />
                }
                text="@ushoka"
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
          className="absolute -bottom-18 right-2 text-8xl font-mono font-bold select-none"
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
            When not coding, you{"'"}ll find me in{' '}
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
        <HeadingAnchor as="h2" className="text-2xl font-bold font-display">
          bio
        </HeadingAnchor>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          {BIO_LIST.map(bio => (
            <Sheet
              key={bio.heading}
              heading={bio.heading}
              className="flex-[1_1_100%] sm:flex-[1_0_20rem]"
            >
              <LinkedList items={bio.items} />
            </Sheet>
          ))}
        </div>
      </section>
    </div>
  );
}

const Emphasize: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-bold uppercase">{children}</span>;
};
