import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
};

export const SubmitButton = ({ children, isPending }: SubmitButtonProps) => {
  return (
    <button
      disabled={isPending}
      className={`bg-sky-500 shadow text-white rounded-md p-2 hover:shadow-sky-500 hover:shadow ${
        isPending && "cursor-not-allowed opacity-50"
      }`}
    >
      {isPending && <FontAwesomeIcon icon={faSpinner} />}
      {children}
    </button>
  );
};
