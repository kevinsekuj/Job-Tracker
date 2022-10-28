// TODO connect to mysql db

export default async function connect() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve("Connected to MySQL database.");
    }, 1000);
  });
}
