export const formatDate = (datestring: string, short: boolean = false) => {
  const date = new Date(datestring);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate =
    date < today
      ? short
        ? date.toLocaleDateString()
        : date.toLocaleString()
      : date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'});
  return formattedDate;
};
