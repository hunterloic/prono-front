import dateFormat from "dateformat";

export const epochToDate = (pattern, epoch) => {
  const date = new Date(0);
  date.setUTCSeconds(epoch);
  return dateFormat(date, pattern);
};

export const dateToEpoch = (date) => {
  return Math.round(date.getTime() / 1000);
};
