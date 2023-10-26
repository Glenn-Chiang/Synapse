import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-rose-500 p-2 rounded-md flex gap-2 items-center">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {children}
    </div>
  );
};
