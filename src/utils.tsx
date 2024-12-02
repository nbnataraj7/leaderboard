import moment from "moment";

export const toMinutes = (timeInMilliseconds: number) => {
  //Show time in minutes and seconds conditionally
  const duration = moment.duration(timeInMilliseconds);
  const hours = duration.hours() > 0 ? `${duration.hours()} hours` : "";
  const minutes = duration.minutes() > 0 ? `${duration.minutes()} minutes` : "";
  const seconds = duration.seconds() > 0 ? `${duration.seconds()} seconds` : "";
  return `${hours} ${minutes} ${seconds}`;
};

export const toCompleted = (completed: boolean) => {
  return completed ? "Completed" : "Not Complete";
};

export const toCompleteClass = (completed: boolean) => {
  return completed ? "completed" : "not-completed";
};

export const toUnlocked = (unlocked: boolean, completed: boolean) => {
  if (completed) return "";
  return unlocked ? (
    <img src="/unlocked.png" alt="Unlocked" className="lock" />
  ) : (
    <img src="/lock.png" alt="Locked" className="lock" />
  );
};
