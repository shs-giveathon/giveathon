import gspread
from flask import Flask, jsonify, request
from google.oauth2.service_account import Credentials

app = Flask(__name__)

# Set up the connection to Google Sheets
scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]
creds = Credentials.from_service_account_file("serviceAccount.json", scopes=scopes)
gc = gspread.authorize(creds)
sh = gc.open_by_url(
    "https://docs.google.com/spreadsheets/d/16Hnls_-qXFapfP3n-qeKCwWWQzD-1ftP05V0svHS70k/edit?usp=sharing"
)
moneyWorksheet = sh.worksheet("MoneyData")
registrationWorksheet = sh.worksheet("RegistrationData")


@app.route("/getTopPeople", methods=["GET"])
def index():
    json = request.get_json()
    if json.get("peopleCount") is not None:
        people_count = int(json["peopleCount"])
    else:
        people_count = 10

    data = moneyWorksheet.get_all_records()

    # Create a dictionary for registered emails for faster look-up
    registered_emails = {}
    for registered_row in registrationWorksheet.get_all_records():
        email = registered_row["Email"]
        if email not in registered_emails:
            affiliation = (
                str(registered_row["Teacher"]) + ":" + str(registered_row["Period"])
                if registered_row["Teacher"] != "N/A"
                else registered_row["Club"]
            )
            registered_emails[email] = {
                "Name": registered_row["Name"],
                "Affiliation": affiliation,
                "Money Raised": 0,
            }

    for row in data:
        email = row.get("Email")
        money_raised = int(row.get("Money Raised", 0))

        if email in registered_emails:
            registered_emails[email]["Money Raised"] += money_raised

    # Sort the dictionary by Money Raised
    sorted_money_data = dict(
        sorted(
            registered_emails.items(),
            key=lambda item: item[1]["Money Raised"],
            reverse=True,
        )
    )

    # Limit the top people count
    top_money_data = dict(list(sorted_money_data.items())[:people_count])

    return jsonify(top_money_data)


if __name__ == "__main__":
    app.run(debug=True)
