1\. Backend (Node.js server)

Setup:

Make sure you have Node.js installed (preferably v14+).



Steps:

Create a folder for your backend, e.g., backend.



Inside the folder, create a file named server.js with the backend code I shared.



Initialize Node.js and install dependencies:



cd backend

npm init -y

npm install express cors

Run the backend server:



node server.js

It will start and listen on http://localhost:5000



2\. Frontend (React app)

Setup:

Make sure you have Node.js and npm or yarn installed.



Steps:

Create a folder for your frontend, e.g., frontend.



Inside that folder, initialize a React app:



cd frontend

npx create-react-app .

Replace the content of src/App.js with the React frontend code I gave you.



Update the package.json if needed, but default CRA setup should work fine.



Run the React app:



npm start

This runs on http://localhost:3000 by default.



3\. Using the application

Open your browser and go to http://localhost:3000



You can register a new user or login with existing credentials.



After login, you can add, edit, and delete items.



The backend server on port 5000 handles API calls.

