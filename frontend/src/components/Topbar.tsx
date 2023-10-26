"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useRef, useEffect } from "react";
import { AvatarIcon } from "./AvatarIcon";
import { UserContext } from "@/lib/UserContext";

export const Topbar = () => {
  const currentUser = useContext(UserContext);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hideMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.addEventListener("click", hideMenu);
    } else {
      document.removeEventListener("click", hideMenu);
    }

    return () => document.removeEventListener("click", hideMenu);
  }, [menuIsOpen]);

  return (
    <nav className="z-10 bg-slate-950 w-screen h-16 shadow p-4 fixed top-0 left-0 font-medium flex items-center justify-between">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image
          src={"https://static.thenounproject.com/png/40466-200.png"}
          alt=""
          width={40}
          height={40}
          className="invert"
        />
        <h1>Synapse</h1>
      </Link>
      <button
        onClick={() => setMenuIsOpen((prev) => !prev)}
        className="p-2 relative z-20"
      >
        <AvatarIcon url={currentUser?.avatarUrl} />
        {menuIsOpen && (
          <div ref={menuRef} className="z-20">
            <ProfileMenu />
          </div>
        )}
      </button>
    </nav>
  );
};

const ProfileMenu = () => {
  const currentUser = useContext(UserContext);

  return (
    <div className="absolute -bottom-20 right-4 flex flex-col w-max rounded-md bg-slate-900 z-20">
      <Link
        className="hover:bg-slate-800 p-2 flex gap-2 items-center rounded-t-md"
        href={`/profile/${currentUser?.id}`}
      >
        <FontAwesomeIcon icon={faUserCircle} />
        My Profile
      </Link>
      <Link className="hover:bg-slate-800 p-2 flex gap-2 items-center rounded-b-md" href={"/logout"}>
        <FontAwesomeIcon icon={faSignOut} />
        Logout
      </Link>
    </div>
  );
};
