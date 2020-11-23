import * as React from 'react';
import Header from '../components/header';
import homeStyles from '../styles/home.module.css';
import Image from 'next/image';

const Home: React.FC = () => (
  <>
    <Header titlePre="Home" />
    <div className={homeStyles.layout}>
      <Image
        src="/avatar.jpg"
        width="250"
        height="250"
        alt=""
        role="presentation"
        className={homeStyles.avatar}
      />
      <h1>Yuxiao He's Blog</h1>
      <h2>Writing about web front-end development.</h2>
    </div>
  </>
);

export default Home;
