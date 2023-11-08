"use client";

import { useRouter } from "next/navigation";

export const Searchbar = () => {
  const router = useRouter();

  const handleKeydown:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter") return; // Fire on enter
    const searchTerm = event.currentTarget.value;
    if (!searchTerm) return; // don't send empty input

    router.push(`/users?search=${searchTerm}`)
  }

  return (
    <div className="">
      <input
      onKeyDown={handleKeydown}
        placeholder="Search for a user..."
        className="border-b border-slate-500 rounded-none w-full"
      />
    </div>
  );
};
