"use client";

import { joinChannel } from "@/api/channels";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JoinChannel = () => {
  const [isPending, setIsPending] = useState(false);

  const currentUserId = getCurrentUser()
  const channelId = Number(useParams().channelId)
  const router = useRouter()

  const handleClick = async () => {
    setIsPending(true);

    await joinChannel(channelId, currentUserId)
    // socket.emit("join-channel", currentUserId, channelId, () => {
    //   console.log('joined channel')
    //   router.refresh()
    // })
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
