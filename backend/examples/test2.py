from enum import Enum
from typing import Dict

from gspread import Worksheet


class DataStore:
    money_sheet: Worksheet
    reg_sheet: Worksheet

    affiliation_cache: Dict[str, float]
    student_cache: Dict[str, float]

    def __init__(self, money_sheet: Worksheet, reg_sheet: Worksheet, cache_ttl: int):
        self.money_sheet = money_sheet
        self.reg_sheet = reg_sheet
        self.affiliation_cache = {}
        self.student_cache = {}
        self.cache_ttl = cache_ttl

    def update_cache(self):
        self.affiliation_cache = {}
        self.student_cache = {}

        # Create a dictionary for registered emails for faster look-up
        registered_emails = {}
        for registered_row in self.reg_sheet.get_all_records():
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

        current_data = self.money_sheet.get_all_records()

        for row in current_data:
            if "Email" not in row or "Money Raised" not in row:
                continue
            email = str(row["Email"])
            student_reg = self.reg_sheet.find(email)
            if student_reg is None or "Email" not in student_reg.row:
                continue
            student_reg = student_reg.row

            # Student tally
            if email in self.student_cache:
                self.student_cache[email] += float(row["Money Raised"])
            else:
                self.student_cache[email] = float(row["Money Raised"])

            # Affiliation tally
            # If the affiliation is with a class, then it will be {teacher name}:{period number}
            # Otherwise, its just {club_name}
            if student_reg["Club"] == "N/A":
                affiliation = student_reg["Teacher"] + ":" + student_reg["Period"]
            else:
                affiliation = student_reg["Club"]
            
            if affiliation in self.affiliation_cache:
                self.affiliation_cache[affiliation] += float(row["Money Raised"])
            else:
                self.affiliation_cache[affiliation] = float(row["Money Raised"])

        # TODO: sort the dictionary