export const formatDateToRoumanian = (dateInput, hasDay = true) => {
  const date = new Date(dateInput);

  const dayMonthYearOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const monthYearOptions = { year: "numeric", month: "long" };
  const options = hasDay ? dayMonthYearOptions : monthYearOptions;

  return new Intl.DateTimeFormat("ro-RO", options).format(date);
};

export const formatPostDate = (timestamp) => {
  const postDate = new Date(timestamp);
  const today = new Date();

  const todayDay = today.getDate();
  const postDay = postDate.getDate();

  const hours = postDate.getHours();
  const minutes = postDate.getMinutes();

  const addZeroBefore = (number) => (number < 10 ? "0" + number : number);

  if (postDay === todayDay) {
    return `Azi la ${addZeroBefore(hours)}:${addZeroBefore(minutes)}`;
  } else if (postDay === todayDay - 1) {
    return `Ieri la ${addZeroBefore(hours)}:${addZeroBefore(minutes)}`;
  } else {
    return formatDateToRoumanian(postDate);
  }
};
