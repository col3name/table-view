export const formatDate = (date: Date, delimiter: string = ".") => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${delimiter}${month}${delimiter}${day}`;
};
