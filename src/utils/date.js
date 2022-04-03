import dateFormat, { masks } from "dateformat";

export const epochToDate = (pattern, epoch) => {
  const date = new Date(0);
  date.setUTCSeconds(epoch);
  return dateFormat(date, pattern);
};
