from DataStore import DataStore
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from google.oauth2.service_account import Credentials
from gspread import authorize

# Set up the Flask app
app = Flask(__name__)
cors = CORS(app, origins=["*"])

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
moneyWorksheet = sh.worksheet("MoneyForm")
registrationWorksheet = sh.worksheet("RegistrationForm")
print("Successfully connected to the spreadsheet!")

datastore = DataStore(moneyWorksheet, registrationWorksheet, 1)


@app.route("/getTopPeople", methods=["GET"])
@cross_origin()
def index():
    # Set the default parameters
    limit = 10

    try:
        json = request.get_json()
    except:
        json = {}
    if json.get("limit") is not None:
        limit = int(json["limit"])

    try:
        data = datastore.get_top_students(limit)
    except Exception as e:
        return jsonify({"error": str(e)})

    return jsonify(data)


@app.route("/getTopAffiliations", methods=["GET"])
@cross_origin()
def affIndex():
    # Set the default parameters
    limit = 10

    try:
        json = request.get_json()
    except:
        json = {}
    if json.get("limit") is not None:
        limit = int(json["limit"])

    try:
        data = datastore.get_top_affiliations(limit)
    except Exception as e:
        return jsonify({"error": str(e)})

    return jsonify(data)


@app.route('/debug', methods=["GET"])
def debug():
    return jsonify(datastore.get_cache())


if __name__ == "__main__":
    app.run(debug=True)
