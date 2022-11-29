# Job Tracker

A bookkeeping web app to aid in your job search.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/69094063/204513342-e8832377-5de7-4d83-978a-a3ee346bdb8f.png">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/69094063/204513503-f337275d-79fd-440f-971d-d4839e357f3c.png">


## Live Link

https://job-tracker-delta.vercel.app/


## Features

- Account registration and authentication with Auth0/Google
- Create, Read, Update, and Delete (CRUD) functionality for job applications and contacts
- Analytics for the top frequently-noted skills on job applications, displayed in text and graphs
- Attractive, minimalist UI with slide-out drawer forms and snackbar notifications
- Dark/Light mode toggle


## Technologies

### Backend
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [AWS RDS](https://aws.amazon.com/rds/)

### Frontend
- [Auth0](https://auth0.com/)
- [React.js](https://reactjs.org/)
- [React Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)


## Installation

### Prerequisites

- [PostgreSQL](https://www.postgresql.org/) database instance, such as one running on [AWS RDS](https://aws.amazon.com/rds/postgresql/)
- [Auth0](https://auth0.com/) account with access to [Application Keys](https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0)
- [Node.js](https://nodejs.org/en/) (recommend 18.12.0 LTS)

---

1. Clone the repository
2. Switch to stable branch: `$ git checkout remotes/origin/final-stable`
3. Set up and configure server
    - From root directory:  
   `$ cd backend/`
    - Install dependencies:  
   `$ npm i`
    - **Important**: Create environmental variables (database credentials):  
      `$ touch .env`
      - Enter your PostgreSQL database credentials into `.env` and save:
        ```
        DB_PORT=${YOUR_POSTGRES_DB_PORT}
        DB_NAME=${YOUR_POSTGRES_DB_NAME}
        DB_USER=${YOUR_POSTGRES_DB_USERNAME}
        DB_PASS=${YOUR_POSTGRES_DB_PASSWORD}
        DB_HOST=${YOUR_POSTGRES_DB_HOST}
        DB_DIALECT="postgres"
        NODE_ENV="production"
        ```
      - **Note**: By default, the server will run on port **3000**. Change this as needed based on the callback URLs you provided to Auth0.
4. Set up, configure, and build React app
    - From root directory:  
    `$ cd frontend/`
    - Install dependencies:  
    `$ npm i`
    - **Important**: Create environmental variables (Auth0 credentials local API endpoints):  
      `$ touch .env`
      - Enter the following into .env and save:
        ```
        REACT_APP_AUTH0_DOMAIN=${YOUR_AUTH0_DOMAIN}
        REACT_APP_AUTH0_CLIENT_ID=${YOUR_AUTH0_CLIENT_ID}
        REACT_APP_JOBS_ENDPOINT_URL='http://localhost:3000/api/jobs'
        REACT_APP_CONTACTS_ENDPOINT_URL='http://localhost:3000/api/contacts'
        ```
      - **Note**: If you changed the server port in step 3 above, change the `REACT_APP_JOBS_ENDPOINT_URL` and `REACT_APP_CONTACTS_ENDPOINT_URL` accordingly.
    - Build React app:  
      `$ npm run build`


## Quick Start

1. Start the server:
    - From root directory:  
      `$ cd backend/`  
      `$ npm start`
2. Access the React app views in your web browser by visiting `http://localhost:3000/`
    - **Note**: Change port as needed if modified during [installation](#installation).


## Reporting Issues
Feel free to report any problems you experience or any suggestions using the [Issues](https://github.com/kevinsekuj/Job-Tracker/issues) tab. Please provide as many details as possible in your report.

## License

[MIT](LICENSE)
