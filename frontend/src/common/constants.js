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

export const NAV_BUTTON_THEME = {
  palette: {
    primary: {
      main: "#EDF2F4",
      contrastText: "black",
    },
  },
};

export const SETTINGS = ["Logout"];

export const JOB_FORM_ITEMS = ["Company", "Position", "Skills", "Contacts"];

export const USERS_ENDPOINT_URL = process.env.REACT_APP_USERS_ENDPOINT_URL;

export const JOBS_ENDPOINT_URL = process.env.REACT_APP_JOBS_ENDPOINT_URL;

export const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;

export const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
