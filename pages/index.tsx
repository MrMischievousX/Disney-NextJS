import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Hero from "../components/Hero";
import Brands from "../components/Brands";
import MovieCollection from "../components/MovieCollection";
import ShowCollection from "../components/ShowCollection";

const Home = ({
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}: {
  popularMovies: any;
  popularShows: any;
  topRatedMovies: any;
  topRatedShows: any;
}) => {
  const [session] = useSession();
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header session={session} />
      {!session ? (
        <Hero />
      ) : (
        <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          <Slider />
          <Brands />
          <MovieCollection movies={popularMovies} title="Popular Movies" />
          <ShowCollection shows={popularShows} title="Popular Shows" />
          <MovieCollection movies={topRatedMovies} title="Top Rated Movies" />
          <ShowCollection shows={topRatedShows} title="Top Rated Shows" />
        </main>
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const apiKey = process.env.TMDB_API;

  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
    ),
  ]);

  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies?.results ?? [],
      popularShows: popularShows?.results ?? [],
      topRatedMovies: topRatedMovies?.results ?? [],
      topRatedShows: topRatedShows?.results ?? [],
    },
  };
}
