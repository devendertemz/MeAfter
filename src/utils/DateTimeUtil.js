export const convertDateToDisplayFormat = (dateSel) => {
  const date = new Date(dateSel);
  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  // Return formatted date
  return `${day}-${month}-${year}`;
};
export const convertDateToAPIFormat = (dateSel) => {
  const date = new Date(dateSel);
  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  // Return formatted date
  return `${year}-${month}-${day}`;
};
export const videoCallFormatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00"; // Return '00:00' if the time is invalid or negative
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
};
