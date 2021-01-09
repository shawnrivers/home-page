import * as React from 'react';
import { Header } from '../components/utils/Header';
import Image from 'next/image';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { BioListCard } from '../components/pages/home/BioListCard';
import { BioCard } from '../components/pages/home/BioCard';
import { WorkCard } from '../components/pages/home/WorkCard';

const Home: React.FC = () => (
  <>
    <Header titlePre="Home" />
    <div className="font-mono flex flex-col align-center">
      <section className="flex flex-col items-center justify-center sm:flex-row mx-4">
        <div className="next-image-wrapper inline-block overflow-hidden rounded-full border-4 border-gray-800">
          <Image
            src="/avatar.jpg"
            width="128"
            height="128"
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
            rel="noopener"
            className="flex align-center justify-center sm:justify-start mt-2"
          >
            <TwitterIcon className="fill-current" />
            <span className="text-base text-gray-700 ml-1">@yuxiao_he</span>
          </a>
        </div>
      </section>
      <section className="mt-8 mx-auto">
        <div className="inline-block mx-4 px-8 py-6 rounded-lg shadow bg-gray-200">
          <h2 className="text-xl font-bold text-center">
            Nogizaka-driven web developer
          </h2>
        </div>
      </section>
      <section className="flex flex-col items-center mt-8 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold">#BIO</h2>
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
            text="Nogizaka46, web dev, UI design, covering, Karaoke"
            className="flex-1 m-2 h-full"
          />
        </div>
      </section>
      <section className="flex flex-col items-center mt-8 p-4">
        <h2 className="text-2xl font-bold">#Works</h2>
        <div className="flex flex-wrap justify-center mt-4">
          <WorkCard
            heading="NOGILIB"
            description="A web application showing the information about Nogizaka46"
            image="/nogilib.png"
            to="https://nogilib.com"
            className="flex-1 mt-2 my-6 mx-6 h-full"
          />
          <WorkCard
            heading="Nogizaka46 News"
            description="A Twitter bot that retweets Nogizaka46 news and tweets members' schedules"
            image="/nogilib.png"
            to="https://twitter.com/n46_news"
            className="flex-1 mt-2 my-6 mx-6 h-full"
          />
        </div>
      </section>
      <section className="flex flex-col items-center mt-8 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold">#Contact</h2>
        <ul className="flex flex-wrap items-center justify-center p-0 mt-4 list-none">
          <li className="my-2 mx-4">
            <a
              href="https://twitter.com/yuxiao_he"
              rel="noopener"
              className="text-gray-800"
            >
              Twitter
            </a>
          </li>
          <li className="my-2 mx-4">
            <a
              href="https://www.facebook.com/usho.ka"
              rel="noopener"
              className="text-gray-800"
            >
              Facebook
            </a>
          </li>
          <li className="my-2 mx-4">
            <a
              href="https://www.instagram.com/usho.ka/"
              rel="noopener"
              className="text-gray-800"
            >
              Instagram
            </a>
          </li>
          <li className="my-2 mx-4">
            <a
              href="https://github.com/shawnrivers"
              rel="noopener"
              className="text-gray-800"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </div>
  </>
);

export default Home;
