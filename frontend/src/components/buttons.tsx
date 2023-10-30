"use client";

import {
  faArrowLeft,
  faEllipsisV,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
  onClick?: () => void;
};

export const SubmitButton = ({
  onClick,
  children,
  isPending,
}: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={`bg-sky-500 shadow text-white text-center rounded-md p-2 px-4 hover:bg-sky-400 hover:shadow-sky-500 hover:shadow flex gap-2 justify-center items-center min-w-max ${
        isPending && "cursor-not-allowed opacity-50"
      }`}
    >
      {isPending && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      )}
      {children}
    </button>
  );
};


export const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-slate-500 hover:text-sky-500"
    >
      Cancel
    </button>
  );
};


export const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="rounded-full hover:bg-slate-800 w-10 h-10 flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export const ActionButton = ({onClick}: {onClick?: () => void}) => {
  return (
    <button onClick={onClick} className="rounded-full hover:bg-slate-800 w-10 h-10">
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
};
