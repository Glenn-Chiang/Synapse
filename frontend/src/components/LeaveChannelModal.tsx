"use client"

import { CancelButton, SubmitButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { useState, useContext } from 'react';
import { UserContext } from "@/lib/UserContext";

export const LeaveChannelModal = ({ close }: { close: () => void }) => {
  const currentUserId = useContext(UserContext)?.id;
  const channelId = Number(useParams().channelId);
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleLeaveChannel = async () => {
    setIsPending(true);
    socket.emit("leave-channel", currentUserId, channelId, () => {
      router.push("/");
      router.refresh();
    });
  };

  return (
    <Modal>
      <h2>Are you sure you want to leave this channel?</h2>
      <div className="flex gap-4">
        <SubmitButton isPending={isPending} onClick={handleLeaveChannel}>
          Confirm
        </SubmitButton>
        <CancelButton onClick={close}/>
      </div>
    </Modal>
  );
};
