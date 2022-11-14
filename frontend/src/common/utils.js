const SQL_RESPONSE_DELINEATOR = "T";

export function formatDate(dateString) {
  const result = dateString?.split(SQL_RESPONSE_DELINEATOR)[0]?.split("-");

  if (result && Array.isArray(result)) {
    const [month, day, year] = result;
    return `${month}-${day}-${year}`;
  }

  return null;
}

export function processSkills(skillsString) {
  // Split on comma and remove leading/trailing whitespace.
  const skillsArray = skillsString.split(",");
  skillsArray.forEach((skill, index) => {
    skillsArray[index] = skill.trim();
  });

  // Use hashset to remove duplicate entries
  return Array.from(new Set(skillsArray));
}
