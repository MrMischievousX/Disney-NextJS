import React from "react";
import MovieThumbnail from "./MovieThumbnail";

const MovieCollection = ({ movies, title }: { movies: any; title: string }) => {
  return (
    <section className="relative flex-col flex space-y-2 my-10 px-8 max-w-[1400px]">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {movies?.map((item: any, index: number) => {
          return <MovieThumbnail key={item?.id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default MovieCollection;
