import json
import time
import requests

with open("public/data.json", "r", encoding="utf-8") as f:
    users_dict = json.load(f)

def fetch_history(user):
    """AtCoderのレーティング履歴を取得"""
    url = f"https://atcoder.jp/users/{user}/history/json"
    res = requests.get(url)
    time.sleep(1)
    res.raise_for_status()
    return res.json()

results = {}

for color, ids in users_dict.items():
    for id in ids:
        try:
            history_data = fetch_history(id)
            new_rating_data = [contest_data["NewRating"] for contest_data in history_data]
            results[id] = new_rating_data
        except Exception as e:
            print(f"[ERROR] {id} のデータ取得中にエラー: {e}")

with open("public/results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)