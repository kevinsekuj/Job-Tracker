export const APPLICATION_FIELDS = {
  id: "ID",
  company: "Company",
  position: "Position",
  date: "Date Applied",
  jobStatus: "Status",
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
  offer: "Offer (Pending)",
  accepted: "Offer (Accepted)",
  bye: "Offer (Rejected)",
  withdrawn: "Withdrawn",
  rip: "Rejected",
};

export const JOB_TABLE_COLUMN_STYLES = {
  CELL_SM: 200,
  CELL_MD: 300,
  CELL_LG: 400,
};

export const NAVBAR_ITEMS = [
  {
    item: "Jobs",
    url: "/",
  },
  {
    item: "Contacts",
    url: "/contacts",
  },
  {
    item: "Skills",
    url: "/skills",
  },
];

export const SETTINGS = ["Logout"];

export const JOB_FORM_ITEMS = ["Company", "Position", "Skills", "Contacts"];

export const JOBS_ENDPOINT_URL =
  process.env.JOBS_ENDPOINT_URL || "http://localhost:5000/jobs";
