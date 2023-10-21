export const formatDate = (datestring: string) => {
  const date = new Date(datestring).toLocaleTimeString();
  return date;
};
