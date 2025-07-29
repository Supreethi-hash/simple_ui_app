**1\. Backend (Node.js server)**

Setup:

Make sure you have Node.js installed (preferably v14+).

Steps:

1\. Inside the folder backend,Initialize Node.js and install dependencies:

        cd backend

        npm install 

2\. Run the backend server:

        node server.js

**It will start and listen on http://localhost:5000**


**2\. Frontend (React app)**

Setup:


Make sure you have Node.js and npm installed.

Steps:

1\. Inside that frontend folder, install npm and start react client:

        cd frontend

        npm install

*Update the package.json if needed, but default CRA setup should work fine.*

2\. Run the React app:

        npm start

**This runs on http://localhost:3000 by default.**


**3\. Using the application**

Open your browser and go to **http://localhost:3000**

You can register a new user or login with existing credentials. After login, you can add, edit, and delete items.

The backend server on port 5000 handles API calls.

---

**4\. Running Playwright UI Tests**

1. Install Playwright (if not already installed):

        npm install --save-dev @playwright/test

2. Install concurrently package as dev dependency:

        npm.cmd install --save-dev concurrently

3. Run the tests from the project root (make sure both backend and frontend servers are running):

        npx playwright test --ui