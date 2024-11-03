from collections import defaultdict
from datetime import datetime
from typing import Any, Dict, List, Tuple

from gspread import Worksheet, exceptions


class DataStore:
    money_sheet: Worksheet
    reg_sheet: Worksheet
    affiliation_cache: List[Tuple[str, float]]
    # each entry is (email, {"MoneyRaised", "Name"})
    student_cache: List[Tuple[str, Dict[str, float | str]]]
    total_raised_cache: float
    cache_ttl: int
    last_cache_update: datetime

    raw_money_cache: List[Dict[Any, Any]]
    registrations_cache: Dict[str, Dict[str, str]]

    def __init__(self, money_sheet: Worksheet, reg_sheet: Worksheet, cache_ttl: int):
        self.money_sheet = money_sheet
        self.reg_sheet = reg_sheet
        self.affiliation_cache = []
        self.student_cache = []
        self.total_raised_cache = 0.0
        self.cache_ttl = cache_ttl
        self.last_cache_update = datetime.min
        self.raw_money_cache = []
        self.registrations_cache = {}
        self.update_cache()

    def update_cache(self) -> None:
        self.affiliation_cache.clear()
        self.student_cache.clear()
        self.total_raised_cache = 0.0

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

        self.registrations_cache = registered_emails
        self.raw_money_cache = self.money_sheet.get_all_records()

        student_dict: Dict[str, Dict[str, str | float]] = {}
        affiliation_dict = defaultdict(float)

        for row in self.raw_money_cache:
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

            self.total_raised_cache += money_raised

            current_reg = registered_emails[email]

            if email in student_dict:
                student_dict[email]["MoneyRaised"] += money_raised  # type: ignore
            else:
                student_dict[email] = {
                    "MoneyRaised": money_raised,
                    "Name": current_reg["Name"],
                }
            affiliation_dict[current_reg["Affiliation"]] += money_raised

        self.student_cache = sorted(
            student_dict.items(), key=lambda item: item[1]["MoneyRaised"], reverse=True
        )
        self.affiliation_cache = sorted(
            affiliation_dict.items(), key=lambda item: item[1], reverse=True
        )

    def _get_affiliation_from_row(self, row: Dict[str, str]) -> str:
        teacher = row.get("Teacher")
        period = row.get("Period")
        club = row.get("Club")
        choice = row.get("Choice")

        if choice == "Class Period":
            return f"{teacher}'s {period} Period"
        elif choice == "Club":
            return club
        return ""

    def try_updating_cache(self) -> None:
        if (datetime.now() - self.last_cache_update).seconds >= self.cache_ttl:
            self.update_cache()
            self.last_cache_update = datetime.now()

    def get_top_students(
        self, how_many: int, start: int
    ) -> List[Tuple[str, Dict[str, float | str]]]:
        self.try_updating_cache()
        max_index = len(self.student_cache)
        return self.student_cache[start : min(how_many + start, max_index)]

    def get_top_affiliations(
        self, how_many: int, start: int
    ) -> List[Tuple[str, float]]:
        self.try_updating_cache()
        max_index = len(self.affiliation_cache)
        return self.affiliation_cache[start : min(how_many + start, max_index)]

    def get_info_by_email(self, email: str) -> Dict[str, Any]:
        """
        Gets a detailed history of money raised by the given email,
        along with their affiliation and other details.

        Args:
        - email (str): The email of the student.

        Returns:
        - dict: A dictionary containing name, affiliation, and a history of money raised with timestamps.
        """
        self.try_updating_cache()

        # Check for a valid email
        if "@" not in email:
            raise ValueError("Invalid email provided.")

        # Search for the user's registration info
        user_info = self.registrations_cache.get(email)

        # If the user is not found in the registration records
        if not user_info:
            raise ValueError("Email not found in registration records.")

        affiliation = user_info["Affiliation"]  # type: ignore
        name = user_info["Name"]

        # Fetch all records from the money sheet
        money_records = self.raw_money_cache

        # Extract the user's money raising history
        history = [
            (record.get("Timestamp"), float(record.get("Money Raised")))  # type: ignore
            for record in money_records
            if record.get("Email") == email
            and record.get("Money Raised")
            and str(record.get("Money Raised")).replace(".", "", 1).isdigit()
        ]

        return {
            "Name": name,
            "Affiliation": affiliation,
            "History": history,
        }

    def get_cache(self):
        self.try_updating_cache()
        return {
            "student_cache": self.student_cache,
            "affiliation_cache": self.affiliation_cache,
        }

    def get_info_by_affiliation(
        self, affiliation: str
    ) -> Dict[str, float | List[Tuple[str, float, str]]]:
        """
        Gets a detailed history of money raised by the given affiliation.

        Args:
        - affiliation (str): The affiliation

        Returns:
        - dict: Total amount raised, and
        a list of [timestamp, how much they raised (that time), their name]
        """
        self.try_updating_cache()

        registered_emails = self.registrations_cache

        # Fetch all records from the money sheet
        money_records = self.raw_money_cache

        # Extract the affiliations's money raising history
        history = [
            (str(record.get("Timestamp")), float(record.get("Money Raised")), registered_emails.get(record.get("Email"))["Name"])  # type: ignore
            for record in money_records
            if "@" in str(record.get("Email"))
            and record.get("Email") in registered_emails
            and record.get("Money Raised")
            and str(record.get("Money Raised")).replace(".", "", 1).isdigit()
            and registered_emails.get(record.get("Email"))["Affiliation"] == affiliation  # type: ignore (email checked above)
        ]

        totalMoneyRaised: float = 0.0
        for h in history:
            totalMoneyRaised += h[1]

        history.reverse()  # Gets the newest stuff first

        return {"MoneyRaised": totalMoneyRaised, "History": history}

    def get_unregistered_emails(self) -> List[str]:
        """
        Gets a list of emails that are not registered in the registration sheet.

        Returns:
        - list: A list of emails that are not registered in the registration sheet.
        """
        self.try_updating_cache()

        registered_emails = self.registrations_cache

        # Fetch all records from the money sheet
        money_records = self.raw_money_cache

        # Extract the affiliations's money raising history
        unregistered_emails = [
            record.get("Email")
            for record in money_records
            if "@" in str(record.get("Email"))
            and record.get("Email") not in registered_emails
        ]

        return unregistered_emails

    def get_affiliationless_emails(self) -> List[str]:
        """
        Gets a list of emails from the registration sheet that have "N/A" for both teacher and club.

        Returns:
        - list: A list of emails from the registration sheet that have "N/A" for both teacher and club.
        """
        self.try_updating_cache()

        # List to store emails with "N/A" as both teacher and club
        affiliationless_emails = []

        # Go through each record to check if both teacher and club are "N/A"
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
            teacher = registered_row.get("Teacher")
            period = registered_row.get("Period")
            club = registered_row.get("Club")

            # Check if both teacher and club are "N/A"
            if email and (teacher == "N/A" or period == "N/A") and club == "N/A":
                affiliationless_emails.append(email)

        return affiliationless_emails

    def get_total_raised(self) -> float:
        self.try_updating_cache()
        return self.total_raised_cache
