// Utility Functions for Dates
export function getTimeCreated(date) {
  if (date) {
    const today = new Date();
    const created_date = new Date(date);
    const year_diff = today.getFullYear() - created_date.getFullYear();
    const month_diff = today.getMonth() - created_date.getMonth();
    const days_diff = today.getDay() - created_date.getDay();
    const hours_diff = today.getHours() - created_date.getHours();
    const minutes_diff = today.getMinutes() - created_date.getMinutes();
    const seconds_diff = today.getSeconds() - created_date.getSeconds();
    switch (true) {
      case year_diff > 0:
        return `${year_diff} Year`;
        break;
      case month_diff > 0:
        return `${month_diff} Month`;
        break;
      case days_diff > 0:
        return `${days_diff} Days`;
        break;
      case hours_diff > 0:
        return `${hours_diff} Hours`;
        break;
      case minutes_diff > 0:
        return `${minutes_diff} Minutes`;
        break;
      case seconds_diff > 0:
        return `${seconds_diff} Seconds`;
        break;
    }
  }
}
export function getvalidDateDMY(date) {
  const resdate = new Date(date);
  const year = resdate.getFullYear();
  const month =
    (resdate.getMonth() + 1).toString().length === 1
      ? "0" + (resdate.getMonth() + 1)
      : (resdate.getMonth() + 1).toString();
  const day =
    resdate.getDate().toString().length === 1
      ? "0" + resdate.getDate()
      : resdate.getDate().toString();
  return day + "-" + month + "-" + year;
}

export function getTimeFromDate(date) {
  const resdate = new Date(date);
  const hours = resdate.getHours();
  const zone = hours >= 12 ? "PM" : "AM";
  return `${resdate.getHours()}:${resdate.getMinutes()} ${zone}`;
}

export function getvalidDateDMMMY(date) {
  const resdate = new Date(date);
  const year = resdate.getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months.find((month, i) => i === resdate.getMonth());
  const day =
    resdate.getDate().toString().length === 1
      ? "0" + resdate.getDate()
      : resdate.getDate().toString();
  return day + " " + month + " " + year;
}

export function getvalidDateDMonthY(date) {
  const resdate = new Date(date);
  const year = resdate.getFullYear();
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months.find((month, i) => i === resdate.getMonth());
  const day =
    resdate.getDate().toString().length === 1
      ? "0" + resdate.getDate()
      : resdate.getDate().toString();
  return day + " " + month + ", " + year;
}
export function getvalidDateYMD(date) {
  const resdate = new Date(date);
  const year = resdate.getFullYear();
  const month =
    (resdate.getMonth() + 1).toString().length === 1
      ? "0" + (resdate.getMonth() + 1)
      : (resdate.getMonth() + 1).toString();
  const day =
    resdate.getDate().toString().length === 1
      ? "0" + resdate.getDate()
      : resdate.getDate().toString();
  return year + "-" + month + "-" + day;
}
