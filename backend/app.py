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

CACHE_DELAY = 60  # in seconds
datastore = DataStore(moneyWorksheet, registrationWorksheet, CACHE_DELAY)


@app.route("/getTopPeople", methods=["POST"])
@cross_origin()
def index():
    # Set the default parameters
    limit = 10
    start = 0

    try:
        json = request.get_json()
    except:
        json = {}
    if json.get("limit") is not None:
        limit = int(json["limit"])
    if json.get("start") is not None:
        start = int(json["start"])

    try:
        data = datastore.get_top_students(limit, start)
    except Exception as e:
        return jsonify({"error": str(e)})

    return jsonify(data)


@app.route("/getTopAffiliations", methods=["POST"])
@cross_origin()
def affIndex():
    # Set the default parameters
    limit = 10
    start = 0

    try:
        json = request.get_json()
    except:
        json = {}
    if json.get("limit") is not None:
        limit = int(json["limit"])
    if json.get("start") is not None:
        start = int(json["start"])

    try:
        data = datastore.get_top_affiliations(limit, start)
    except Exception as e:
        return jsonify({"error": str(e)})

    return jsonify(data)


@app.route("/getInfoByEmail", methods=["POST"])
@cross_origin()
def getInfoByEmail():
    try:
        json = request.get_json()
    except:
        json = {}
    email = json.get("email")
    if email is None:
        return jsonify({"error": "No email provided."})
    try:
        data = datastore.get_info_by_email(email)
    except Exception as e:
        return jsonify({"error": str(e)})
    return jsonify(data)


@app.route("/getInfoByAffiliation", methods=["POST"])
@cross_origin()
def getInfoByAff():
    try:
        json = request.get_json()
    except:
        json = {}
    affiliation = json.get("affiliation")
    if affiliation is None:
        return jsonify({"error": "No affiliation provided."})
    try:
        data = datastore.get_info_by_affiliation(affiliation)
    except Exception as e:
        return jsonify({"error": str(e)})
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)