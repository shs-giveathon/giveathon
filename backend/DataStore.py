from datetime import datetime
from enum import Enum
from typing import Dict, List, Tuple

from gspread import Worksheet


class DataStore:
    money_sheet: Worksheet
    reg_sheet: Worksheet

    # (full name, total_raised), is sorted
    affiliation_cache: List[Tuple[str, float]]
    # (affiliation, total_raised), is sorted
    student_cache: List[Tuple[str, float]]

    cache_ttl: int
    last_cache_update: datetime

    def __init__(self, money_sheet: Worksheet, reg_sheet: Worksheet, cache_ttl: int):
        self.money_sheet = money_sheet
        self.reg_sheet = reg_sheet
        self.affiliation_cache = []
        self.student_cache = []
        self.cache_ttl = cache_ttl

        self.update_cache()
        self.last_cache_update = datetime.now()

    def update_cache(self) -> None:
        self.affiliation_cache = []
        self.student_cache = []

        # Create a dictionary for registered emails for faster look-up
        registered_emails: Dict[str, Dict[str, str]] = {}
        for registered_row in self.reg_sheet.get_all_records():
            email = registered_row["Email"]
            if email not in registered_emails:
                # If the affiliation is with a class, then it will be "{teacher name}'s {period number} Period"
                # Otherwise, its just "{club_name}"
                if (
                    registered_row["Teacher"] != "N/A"
                    and registered_row["Period"] != "N/A"
                ):
                    affiliation = (
                        str(registered_row["Teacher"])
                        + "'s "
                        + str(registered_row["Period"])
                        + " Period"
                    )
                elif registered_row["Club"] != "N/A":
                    affiliation = registered_row["Club"]
                else:
                    continue
                    # you registered wrongly

                registered_emails[email] = {  # type: ignore
                    "Name": registered_row["Name"],
                    "Affiliation": affiliation,
                }

        current_data = self.money_sheet.get_all_records()

        # Temporary dictionaries
        student_dict: Dict[str, float] = {}
        affiliation_dict: Dict[str, float] = {}

        for row in current_data:
            if (
                "Email" not in row
                or "Money Raised" not in row
                or "@" not in str(row["Email"])
                or not str(row["Money Raised"]).replace(".", "", 1).isdigit()
                or float(row["Money Raised"]) <= 0.0  # checks if its a float
                or str(row["Email"]) not in registered_emails  # stop the horse play
            ):
                continue
                # Lets ignore this record

            email = str(row["Email"])
            current_reg = registered_emails[email]
            money_raised = float(row["Money Raised"])

            # Student tally
            if email in student_dict:
                student_dict[email] += money_raised
            else:
                student_dict[email] = money_raised

            # Affiliation tally
            affiliation = current_reg["Affiliation"]
            if affiliation in affiliation_dict:
                affiliation_dict[affiliation] += money_raised
            else:
                affiliation_dict[affiliation] = money_raised

        self.student_cache = sorted(
            student_dict.items(),
            key=lambda item: item[1],
            reverse=True,
        )
        self.affiliation_cache = sorted(
            affiliation_dict.items(),
            key=lambda item: item[1],
            reverse=True,
        )

    # If we have updated the cache before the cache_ttl seconds has passed,
    # this method won't do anything. Otherwise updates cache
    def try_updating_cache(self) -> None:
        if (datetime.now() - self.last_cache_update).seconds >= self.cache_ttl:
            self.update_cache()
            self.last_cache_update = datetime.now()

    def get_top_students(self, how_many: int) -> List[Tuple[str, float]]:
        self.try_updating_cache()
        return self.student_cache[:how_many]

    def get_top_affiliations(self, how_many: int) -> List[Tuple[str, float]]:
        self.try_updating_cache()
        return self.affiliation_cache[:how_many]