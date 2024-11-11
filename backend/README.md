# Backend README

## Technical Overview

The backend of the Giveathon Leaderboard project is built using Flask, a lightweight web framework for Python. It connects to Google Sheets to retrieve and store data related to the Giveathon event. The backend exposes several API endpoints that the frontend can use to fetch data.

### Technologies Used

- Flask: A web framework for building the backend API.
- Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS) to allow requests from the frontend.
- gspread: A Python library for interacting with Google Sheets.
- google-auth: A library for authenticating with Google APIs.

### Structure

The backend consists of the following main components:

- `app.py`: The main entry point of the backend application. It sets up the Flask app, configures CORS, and defines the API endpoints.
- `DataStore.py`: A module that handles data retrieval and caching from Google Sheets. It provides methods for fetching various types of data related to the Giveathon event.

## Setup

To set up the backend environment, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/shs-giveathon/giveathon.git
   cd giveathon/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the Google Sheets API credentials:
   - Obtain the `serviceAccount.json` file from the Google Cloud Console.
   - Place the `serviceAccount.json` file in the `backend` directory.

5. Run the Flask application:
   ```bash
   python app.py
   ```

## API Endpoints

The backend exposes the following API endpoints for retrieving data related to the Giveathon event:

- `POST /getTopPeople`: Retrieves the top people who have raised the most money.
- `POST /getTopAffiliations`: Retrieves the top affiliations that have raised the most money.
- `POST /getInfoByEmail`: Retrieves detailed information about a person based on their email.
- `POST /getInfoByAffiliation`: Retrieves detailed information about an affiliation.
- `POST /getUnregisteredEmails`: Retrieves a list of unregistered emails.
- `POST /getAffiliationlessEmails`: Retrieves a list of emails without affiliations.
- `POST /getTotalRaised`: Retrieves the total amount of money raised.
- `POST /getRecentDonations`: Retrieves the most recent donations.
