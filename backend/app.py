from DataStore import DataStore
from flask import Flask, jsonify, request
from google.oauth2.service_account import Credentials
from gspread import authorize

app = Flask(__name__)

# Set up the connection to Google Sheets
scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]
creds = Credentials.from_service_account_file("serviceAccount.json", scopes=scopes)
gc = authorize(creds)
sh = gc.open_by_url(
    "https://docs.google.com/spreadsheets/d/16Hnls_-qXFapfP3n-qeKCwWWQzD-1ftP05V0svHS70k/edit?usp=sharing"
)
moneyWorksheet = sh.worksheet("MoneyData")
registrationWorksheet = sh.worksheet("RegistrationData")
print("Successfully connected to the spreadsheet!")

datastore = DataStore(moneyWorksheet, registrationWorksheet, 1)


@app.route("/getTopPeople", methods=["GET"])
def index():
    json = request.get_json()
    if json.get("peopleCount") is not None:
        people_count = int(json["peopleCount"])
    else:
        people_count = 10

    data = datastore.get_top_students(people_count)

    return jsonify(data)


@app.route("/getTopAffiliations", methods=["GET"])
def affIndex():
    json = request.get_json()
    if json.get("affiliationsCount") is not None:
        affiliations_count = int(json["affiliationsCount"])
    else:
        affiliations_count = 10

    data = datastore.get_top_affiliations(affiliations_count)

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
