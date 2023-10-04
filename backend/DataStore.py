from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Tuple

from gspread import Worksheet, exceptions


class DataStore:
    money_sheet: Worksheet
    reg_sheet: Worksheet
    affiliation_cache: List[Tuple[str, float]]
    student_cache: List[Tuple[str, float]]
    cache_ttl: int
    last_cache_update: datetime

    def __init__(self, money_sheet: Worksheet, reg_sheet: Worksheet, cache_ttl: int):
        self.money_sheet = money_sheet
        self.reg_sheet = reg_sheet
        self.affiliation_cache = []
        self.student_cache = []
        self.cache_ttl = cache_ttl
        self.last_cache_update = datetime.min
        self.update_cache()

    def update_cache(self) -> None:
        self.affiliation_cache.clear()
        self.student_cache.clear()

        registered_emails: Dict[str, Dict[str, str]] = {}

        try:
            records = self.reg_sheet.get_all_records()
        except exceptions.APIError as e:
            if e.response.status_code == 403:
                raise Exception(
                    "Permission denied to access registration sheet. Please make sure you have access to the sheet."
                ) from e
            raise

        for registered_row in records:
            email = registered_row.get("Email")
            if not email:
                continue

            affiliation = self._get_affiliation_from_row(registered_row)  # type: ignore
            if not affiliation:
                continue

            registered_emails[email] = {  # type: ignore
                "Name": registered_row["Name"],
                "Affiliation": affiliation,
            }

        student_dict = defaultdict(float)
        affiliation_dict = defaultdict(float)

        for row in self.money_sheet.get_all_records():
            email = str(row.get("Email", ""))
            money_raised_str = str(row.get("Money Raised", ""))
            if (
                not email
                or "@" not in email
                or not money_raised_str.replace(".", "", 1).isdigit()
            ):
                continue

            money_raised = float(money_raised_str)
            if money_raised <= 0.0 or email not in registered_emails:
                continue

            current_reg = registered_emails[email]

            student_dict[email] += money_raised
            affiliation_dict[current_reg["Affiliation"]] += money_raised

        self.student_cache = sorted(
            student_dict.items(), key=lambda item: item[1], reverse=True
        )
        self.affiliation_cache = sorted(
            affiliation_dict.items(), key=lambda item: item[1], reverse=True
        )

    def _get_affiliation_from_row(self, row: Dict[str, str]) -> str:
        teacher = row.get("Teacher")
        period = row.get("Period")
        club = row.get("Club")

        if teacher and period and teacher != "N/A" and period != "N/A":
            return f"{teacher}'s {period} Period"
        elif club and club != "N/A":
            return club
        return ""

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

    def get_cache(self):
        self.try_updating_cache()
        return {
            "student_cache": self.student_cache,
            "affiliation_cache": self.affiliation_cache,
        }
