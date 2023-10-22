import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      className={`bg-sky-500 shadow text-white text-center rounded-md p-2 hover:shadow-sky-500 hover:shadow flex gap-2 justify-center items-center w-20 min-w-max ${
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
