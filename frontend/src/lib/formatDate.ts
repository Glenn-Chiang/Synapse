export const formatDate = (datestring: string, short: boolean = false) => {
  const date = new Date(datestring);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate =
    date < today
      ? short
        ? date.toLocaleDateString() // if message was sent before today, show full datetime in message but only show date in preview
        : date.toLocaleString(undefined, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
          })
      : date.toLocaleTimeString(undefined, { // if message was sent today, show time without date
          hour: "numeric",
          minute: "2-digit",
        });
  return formattedDate;
};
