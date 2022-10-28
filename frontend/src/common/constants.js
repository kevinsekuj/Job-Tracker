export const NAVBAR_ITEM_TITLES = ["Logo", "Jobs", "Contacts", "Skills"];

// TODO: Delete, replaced by APPLICATION FIELDS
export const TABLE_HEADER_NAMES = [
  "Company",
  "Position",
  "Date",
  "Skills",
  "Contacts",
  "Status",
];

export const APPLICATION_FIELDS = {
  id: "ID",
  company: "Company",
  position: "Position",
  date: "Date Applied",
  status: "Status",
  skills: "Skills",
  contacts: "Contacts",
};

export const APPLICATION_STATUSES = {
  applied: "Applied",
  oa: "Online Assessment",
  phone: "Phone Interview",
  onsite: "Onsite Interview",
  behavioral: "Behavioral Interview",
  final: "Final Interview",
  offer: "Offer",
  accepted: "Accepted Offer",
  bye: "Rejected Offer",
  withdrawn: "Withdrawn",
  rip: "Rejected",
};

export const JOBS_ENDPOINT_URL =
  process.env.JOBS_ENDPOINT_URL || "http://localhost:5000/jobs";
