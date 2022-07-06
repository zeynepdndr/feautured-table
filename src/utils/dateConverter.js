import firebase from "firebase/app";

export const firestoreTimestampToDate = (timestamp) => {
  if (!timestamp) return false;
  return new Date(timestamp.seconds * 1000);
};

export const dataToFirestoreTimestamp = (currentDate) => {
  if (!currentDate) return false;

  let date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentDate);
  return date;
};