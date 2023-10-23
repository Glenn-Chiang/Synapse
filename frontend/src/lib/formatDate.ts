export const formatDate = (datestring: string, short: boolean = false) => {
  const date = new Date(datestring);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate =
    date < today
      ? short
        ? date.toLocaleDateString()
        : date.toLocaleString(undefined, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
          })
      : date.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        });
  return formattedDate;
};
