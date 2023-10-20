import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode
  isPending: boolean
}

export const SubmitButton = ({ children, isPending }: SubmitButtonProps) => {
  return (
    <button className="bg-sky-500 shadow text-white rounded-md p-2 hover:shadow-sky-500 hover:shadow">
      {children}
    </button>
  );
};
