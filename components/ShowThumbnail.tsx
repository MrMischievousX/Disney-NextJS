import Image from "next/image";
import { useRouter } from "next/router";

function ShowThumbnail({ item }: { item: any }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  return (
    <div
      className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
      onClick={() => router.push(`/show/${item.id}`)}
    >
      <Image
        src={
          `${BASE_URL}${item.backdrop_path || item.poster_path}` ||
          `${BASE_URL}${item.poster_path}`
        }
        width={330}
        height={210}
        objectFit="cover"
        className="rounded-lg"
        alt="show"
      />
    </div>
  );
}

export default ShowThumbnail;
