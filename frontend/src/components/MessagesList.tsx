import { MessageItem } from "@/components/MessageItem";
import { Message } from "@/lib/types";

const MessagesList = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="py-4 mb-10 flex flex-col gap-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

export { MessagesList };
