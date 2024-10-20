const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getUTCDate();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const decimalMinutes = (minutes / 60).toFixed(2).slice(1);

  return `${year} ${month} ${day} at ${hours}${decimalMinutes}`;
};

export default formatTimestamp;
