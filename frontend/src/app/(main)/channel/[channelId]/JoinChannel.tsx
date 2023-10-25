"use client";

import { UserContext } from "@/lib/UserContext";
import { socket } from "@/lib/socket";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from 'react';

const JoinChannel = () => {
  const [isPending, setIsPending] = useState(false);

  const currentUserId = useContext(UserContext)?.id;
  const channelId = Number(useParams().channelId);
  const router = useRouter();

  const handleClick = async () => {
    setIsPending(true);

    socket.emit("join-channel", currentUserId, channelId, () => {
      router.refresh();
    });
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center fixed top-1/2 inset-x-0">
      {isPending ? (
        <>
          <FontAwesomeIcon icon={faSpinner} className="text-4xl animate-spin" />
          Joining channel...
        </>
      ) : (
        <>
          Join channel to start chatting!
          <button
            onClick={handleClick}
            className="bg-sky-600 p-2 rounded-md w-20 shadow-sky-600 shadow font-medium hover:bg-sky-500"
          >
            JOIN
          </button>
        </>
      )}
    </section>
  );
};

export { JoinChannel };

