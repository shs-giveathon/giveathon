import unittest

import requests


class TestApp(unittest.TestCase):
    def test_get_top_affiliations(self):
        url = "http://localhost:5000/getTopAffiliations"
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

    def test_get_top_affiliations_with_limit(self):
        url = "http://localhost:5000/getTopAffiliations"
        response = requests.get(url, json={"limit": 1})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)

    def test_get_top_people(self):
        url = "http://localhost:5000/getTopPeople"
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

    def test_get_top_people_with_limit(self):
        url = "http://localhost:5000/getTopPeople"
        response = requests.get(url, json={"limit": 1})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)


if __name__ == "__main__":
    unittest.main()
