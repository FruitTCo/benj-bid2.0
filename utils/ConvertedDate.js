export default function ConvertDate(originalDate) {
  const date = new Date(originalDate);

  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);
  const seconds = ("0" + date.getUTCSeconds()).slice(-2);
  const milliseconds = ("00" + date.getUTCMilliseconds()).slice(-3);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
}
