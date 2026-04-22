import requests
import csv
import time

API_KEY = "cfece0664155a694a052806826cd"
BASE_URL = "https://api.rawg.io/api/games"

MAX_REQUESTS = 100
PAGE_SIZE = 40

FIELDS = [
    "id", "name", "released", "rating",
    "rating_top", "added", "updated",
    "parent_platforms", "genres", "tags"
]


def extract_list_names(items):
    if not items:
        return ""
    return ", ".join([i.get("name", "") for i in items if i.get("name")])


def transform(game):
    return {
        "id": game.get("id"),
        "name": game.get("name"),
        "released": game.get("released"),
        "rating": game.get("rating"),
        "rating_top": game.get("rating_top"),
        "added": game.get("added"),
        "updated": game.get("updated"),
        "parent_platforms": extract_list_names(
            [p.get("platform", {}) for p in game.get("parent_platforms", [])]
        ),
        "genres": extract_list_names(game.get("genres")),
        "tags": extract_list_names(game.get("tags")),
    }


def fetch(page):
    params = {
        "key": API_KEY,
        "page": page,
        "page_size": PAGE_SIZE,
        "ordering": "-added"
    }
    r = requests.get(BASE_URL, params=params)
    r.raise_for_status()
    return r.json()


def main():
    page = 1
    requests_used = 0
    total = 0

    with open("games.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()

        while requests_used < MAX_REQUESTS:
            print(f"Page {page} | Requests used: {requests_used}")

            data = fetch(page)
            requests_used += 1

            results = data.get("results", [])
            if not results:
                break

            for g in results:
                writer.writerow(transform(g))
                total += 1

            if not data.get("next"):
                break

            page += 1

            # small delay to avoid throttling
            time.sleep(0.2)

    print(f"Done. Games saved: {total}")
    print(f"Requests used: {requests_used}")


if __name__ == "__main__":
    main()