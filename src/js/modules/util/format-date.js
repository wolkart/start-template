export const formatDate = (date, separator = '.') => {
  const today = new Date(date);
  const yyyy = today.getFullYear();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return Number.isNaN(+dd) ? '' : dd + separator + mm + separator + yyyy;
}