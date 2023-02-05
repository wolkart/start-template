function getTime(seconds) {
  const date = new Date(seconds * 1000);
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  if (mm < 10) mm = `0${mm}`;
  if (ss < 10) ss = `0${ss}`;

  return `${mm}:${ss}`;
}

export default getTime;
