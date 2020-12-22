import * as React from 'react';
import Header from '../components/header';
import Image from 'next/image';

const Home: React.FC = () => (
  <>
    <Header titlePre="Home" />
    <div className="text-center">
      <div className="inline-block overflow-hidden rounded-full border-4 border-gray-800">
        <Image
          src="/avatar.jpg"
          width="250"
          height="250"
          alt=""
          role="presentation"
        />
      </div>
      <div className="mx-auto mt-8">
        <h1>Usho Ka / Yuxiao He</h1>
        <div className="inline-block mt-4 p-8 rounded-lg shadow bg-gray-200 text-gray-800">
          <h2>Nogizaka-driven web developer</h2>
        </div>
      </div>
    </div>
  </>
);

export default Home;
