w**Project Name: HiLs-Dashboard**

## Introduction
The dashboard is a web application that provides data visualizations and user interactions with the HiL (Hardware-in-the-Loop) system. The backend is developed using Flask, and the frontend is implemented using React.js.

## Requirements
- Python 3.7 or higher
- Flask 2.3.2
- Flask-Cors 3.0.10
- Jinja2 3.1.2
- Node.js 18.12.0 or higher
- npm (Node Package Manager)

## Backend (Flask)
The backend is based on the Flask framework and provides API endpoints for the frontend.

### Project Structure
- app.py: The main file that starts the Flask server and defines the routes.
- db.py: This file represents the schema for the tables in the specified database.
- hils.sqlite: The database for the project.
- requirements.txt: Contains all the required libraries for the project.

### API Endpoints
- GET /hils: Returns all HiL names to be displayed on the main page.
- POST /hils: Adds a new HiL to the database.

## Frontend (React.js)
The frontend is developed using React.js and communicates with the backend through API endpoints.

### Project Structure
- src/: The main folder for the React code.
- src/components/: Contains reusable components such as charts or forms.
- public/: Contains the logo.png and index.html.

### Used Libraries
- React 17.0.2
- react-router-dom 5.2.0
- axios 0.21.1
  
## Installation
   - Clone the repository [Backend] `git clone https://atc.bmwgroup.net/bitbucket/scm/~qxz39wu/hil-dashboard-backend.git`
   - Clone the repository [Frontend] `git clone https://atc.bmwgroup.net/bitbucket/scm/~qxz39wu/hil_dashboard.git`
## Note:
  - both `hil_dashboard` and `hil-dashboard-backend` should be in the same Directory.

## Starting the Dashboard on BMW-Network

   - Navigate to the project directory: `cd hil_dashboard`.
   - click on the `install.bat`
   - click on the `start.bat`
   - if you got a flowtype error, close the command prompt and click again on `start.bat` file.

## Starting the Dashboard on Jenkins VM
   - click on the file  `the node-v20.9.0-x64.msi` and follow the Instuctions.
   - run the file from Jenkins-VM to setup the node js.
   - go to the next step *Starting the Dashboard*

## Known Issues