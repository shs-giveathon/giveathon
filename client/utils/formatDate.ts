export const formatDate = (inputDate: string) => {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);
  const timeDifference = (currentDate.getTime() - inputDateTime.getTime()) / 1000;

  if (timeDifference < 60) {
    return `${Math.floor(timeDifference)}s ago`;
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)}m ago`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)}h ago`;
  } else if (timeDifference < 604800) {
    return `${Math.floor(timeDifference / 86400)}d ago`;
  } else if (timeDifference < 2419200) {
    return `${Math.floor(timeDifference / 604800)}w ago`;
  } else {
    return `${Math.floor(timeDifference / 2419200)}mo ago`;
  }
};
