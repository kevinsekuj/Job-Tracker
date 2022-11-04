const SQL_RESPONSE_DELINEATOR = "T";

export default function formatDate(dateString) {
  const result = dateString?.split(SQL_RESPONSE_DELINEATOR)[0]?.split("-");

  if (result && Array.isArray(result)) {
    const [month, day, year] = result;
    return `${month}-${day}-${year}`;
  }

  return null;
}
