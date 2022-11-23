import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

export const PORT = process.env.PORT || 5000;
export const CONTACT_FK = "contactId";

export const APPLICATION_STATUSES = [
  "Applied",
  "Online Assessment",
  "Phone Interview",
  "Onsite Interview",
  "Behavioral Interview",
  "Final Interview",
  "Offer (Pending)",
  "Offer (Accepted)",
  "Offer (Rejected)",
  "Withdrawn",
  "Rejected",
];

export const DUMMY_TABLE_DATA = [
  {
    id: 0,
    company: "Buds LLC",
    position: "IT Guy (In Test)",
    date: "10-24-2022",
    skills: "C#, .NET, MS SQL Server 2005",
    contacts: "Thomas Timpson",
    jobStatus: "Offer (Accepted)",
  },
  {
    id: 1,
    company: "CodePath",
    position: "Mentor",
    date: "10-25-2022",
    skills: "DFS, single letter variable names",
    contacts: "Leslie Ivanov",
    jobStatus: "Phone Interview",
  },
  {
    id: 2,
    company: "Google Cloud Platform",
    position: "Programmer",
    date: "10-26-2022",
    skills: "Go, Docker, Kubernetes",
    contacts: "Nathan Perkins",
    jobStatus: "Offer (Rejected)",
  },
  {
    id: 3,
    company: "Amazon",
    position: "Software Development Engineer",
    date: "10-25-2022",
    skills: "AWS, React, Java",
    contacts: "Alex Deatherage",
    jobStatus: "Applied",
  },
];
