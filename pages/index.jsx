import Head from 'next/head';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';

import requests from '../utils/requests';

// Gets rendered on the client
const Home = ({ results }) => {
  console.log(results);

  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
};

export default Home;

// Gets rendered on the server before client's render
export const getServerSideProps = async context => {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.trending.url}`
  ).then(res => res.json());

  return {
    props: {
      results: request.results
    }
  };
};
