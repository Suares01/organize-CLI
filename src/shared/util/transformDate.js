const transformDate = (dateWithTime = "") => {
  const date = dateWithTime.split("T")[0];

  const separateDate = date.split("-");

  const day = separateDate[2];
  const month = separateDate[1];
  const year = separateDate[0];

  return `${month}/${day}/${year}`;
};

module.exports = transformDate;
