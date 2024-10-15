import moment from "moment";

export const toMinutes = (timeInMilliseconds: number) => {
  //Show time in minutes and seconds conditionally
  const duration = moment.duration(timeInMilliseconds);
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return duration.asMilliseconds() > 0
    ? `${minutes} minutes ${seconds} seconds`
    : "Not Started";
};

export const toCompleted = (completed: boolean) => {
  return completed ? "Completed" : "Not Complete";
};

export const toCompleteClass = (completed: boolean) => {
  return completed ? "completed" : "not-completed";
};

export const toUnlocked = (unlocked: boolean) => {
  return unlocked ? (
    <img src="/unlocked.png" alt="Unlocked" className="lock" />
  ) : (
    <img src="/lock.png" alt="Locked" className="lock" />
  );
};
