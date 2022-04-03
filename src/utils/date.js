import format from "date-format";

export const epochToDate = (pattern, epoch) => {
  const date = new Date(0);
  date.setUTCSeconds(epoch);
  return format(pattern, date);
};
