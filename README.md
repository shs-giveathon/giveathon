# Giveathon Leaderboard

A leaderboard to track money raised for the SHS Giveathon event.

## Project setup

Frontend

`cd client && npm run dev`

Backend

`cd backend && python app.py`

Quick start

`./run.sh`

## Contributing

Fork this repository and make a pull request with your changes. Please make sure to lint and format your code before submitting a pull request. For more information, refer to the corresponding READMEs.

## Technical Overview

The Giveathon Leaderboard project is a web application that tracks and displays the money raised for the SHS Giveathon event. It consists of a backend built with Flask and a frontend built with Next.js. The backend handles data retrieval and processing, while the frontend provides a user interface for viewing the leaderboard and other related information.

### Backend

The backend of the Giveathon Leaderboard project is built using Flask, a lightweight web framework for Python. It connects to Google Sheets to retrieve and store data related to the Giveathon event. The backend exposes several API endpoints that the frontend can use to fetch data.

#### Technologies Used

- Flask: A web framework for building the backend API.
- Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS) to allow requests from the frontend.
- gspread: A Python library for interacting with Google Sheets.
- google-auth: A library for authenticating with Google APIs.

#### Structure

The backend consists of the following main components:

- `app.py`: The main entry point of the backend application. It sets up the Flask app, configures CORS, and defines the API endpoints.
- `DataStore.py`: A module that handles data retrieval and caching from Google Sheets. It provides methods for fetching various types of data related to the Giveathon event.

### Frontend

The frontend of the Giveathon Leaderboard project is built using Next.js, a React framework for building server-side rendered and statically generated web applications. It provides a responsive and interactive user interface for viewing the leaderboard and other related information.

#### Technologies Used

- Next.js: A React framework for building the frontend application.
- Axios: A library for making HTTP requests from the frontend to the backend API.
- Tailwind CSS: A utility-first CSS framework for styling the frontend components.

#### Structure

The frontend consists of the following main components:

- `pages`: A directory containing the main pages of the application, such as the leaderboard and user profile pages.
- `components`: A directory containing reusable UI components used throughout the application.
- `lib`: A directory containing utility functions and configuration files.
