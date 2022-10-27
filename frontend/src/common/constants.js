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

export const DUMMY_TABLE_DATA = [
  {
    id: 0,
    company: "Buds LLC",
    position: "IT Guy (In Test)",
    date: "10-24-2022",
    skills: "C#, .NET, MS SQL Server 2005",
    contacts: "Thomas Timpson",
    status: "Accepted Offer",
  },
  {
    id: 1,
    company: "CodePath",
    position: "Mentor",
    date: "10-25-2022",
    skills: "DFS, single letter variable names",
    contacts: "Leslie Ivanov",
    status: "Phone Interview",
  },
  {
    id: 2,
    company: "Google Cloud Platform",
    position: "Programmer",
    date: "10-26-2022",
    skills: "Go, Docker, Kubernetes",
    contacts: "Nathan Perkins",
    status: "Rejected Offer",
  },
  {
    id: 3,
    company: "Amazon",
    position: "Software Development Engineer",
    date: "10-25-2022",
    skills: "AWS, React, Java",
    contacts: "Alex Deatherage",
    status: "Applied",
  },
];
