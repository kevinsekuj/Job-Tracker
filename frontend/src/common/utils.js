const SQL_RESPONSE_DELINEATOR = "T";

export default function formatDate(dateString) {
  const [year, month, day] = dateString
    ?.split(SQL_RESPONSE_DELINEATOR)[0]
    ?.split("-");

  return `${month}-${day}-${year}`;
}
