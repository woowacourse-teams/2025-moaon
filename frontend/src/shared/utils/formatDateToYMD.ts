const formatDateToYMD = (date: string) => {
  const newDate = new Date(date);

  const formattedDate = `${newDate.getFullYear()}. ${
    newDate.getMonth() + 1
  }. ${newDate.getDate()}`;

  return formattedDate;
};

export default formatDateToYMD;
