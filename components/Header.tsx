import Image from "next/image";
import React from "react";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { signIn, signout } from "next-auth/client";
import { useRouter } from "next/router";

function Header({ session }: { session: any }) {
  const router = useRouter();

  return (
    <header className="sticky bg-[#040714] h-[72px] top-0 z-10 flex items-center px-10 md:px-12">
      <Image
        alt="logo"
        src={"/images/logo.svg"}
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      {session && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a>
        </div>
      )}
      {!session ? (
        <button
          onClick={() => signIn()}
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
        >
          Login
        </button>
      ) : (
        <img
          // src="https://thumbs.dreamstime.com/b/beautiful-face-young-woman-clean-skin-fresh-isolated-white-38897486.jpg"
          src={session?.user?.image ?? ""}
          onClick={() => signout()}
          alt="user"
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
        />
      )}
    </header>
  );
}

export default Header;
