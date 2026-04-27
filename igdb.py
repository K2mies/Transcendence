import requests
import json

CLIENT_ID = "swr04oe6iqhij8haxarelocbljg8on"
CLIENT_SECRET = "sn5r93x19fldeg8yniv6rpkojce"


def get_token():
    url = "https://id.twitch.tv/oauth2/token"
    params = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "client_credentials"
    }
    return requests.post(url, params=params).json()["access_token"]


def main():
    token = get_token()

    headers = {
        "Client-ID": CLIENT_ID,
        "Authorization": f"Bearer {token}"
    }

    query = """
        fields
            *,
            cover.*,
            genres.*,
            platforms.*,
            themes.*,
            involved_companies.*,
            release_dates.*;
        limit 5;
    """

    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers=headers,
        data=query
    )

    data = response.json()

    # ✅ SAVE TO FILE
    with open("igdb_sample1.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print("Saved to igdb_sample.json")


if __name__ == "__main__":
    main()