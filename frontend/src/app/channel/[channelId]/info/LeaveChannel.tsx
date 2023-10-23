"use client";

import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { LeaveChannelModal } from "@/components/LeaveChannelModal";

const LeaveChannel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setModalIsOpen(true)}
        className="flex gap-2 items-center justify-center bg-slate-900 hover:bg-slate-800 w-40 p-2 rounded-md"
      >
        <FontAwesomeIcon icon={faSignOut} />
        Leave channel
      </button>
      {modalIsOpen && <LeaveChannelModal close={() => setModalIsOpen(false)} />}
    </section>
  );
};

export { LeaveChannel };

