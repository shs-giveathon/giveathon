import gspread
from google.oauth2.service_account import Credentials

scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# Load credentials
creds = Credentials.from_service_account_file("serviceAccount.json", scopes=scopes)

# Authorize client
gc = gspread.authorize(creds)

# Open spreadsheet
sh = gc.open_by_url(
    "https://docs.google.com/spreadsheets/d/16Hnls_-qXFapfP3n-qeKCwWWQzD-1ftP05V0svHS70k/edit?usp=sharing"
)

worksheet = sh.sheet1
data = worksheet.get_all_records()
print(data)

"""
Example data:
Email	Period	Teacher	Money Raised
clin25	1	Mr Something	100
clin25	1	Mr Something	500
clin25	1	Mr Something	218
"""

total_money_raised = 0
for row in data:
    total_money_raised += int(row["Money Raised"])

print(total_money_raised)
