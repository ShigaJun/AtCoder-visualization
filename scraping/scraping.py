import requests
from bs4 import BeautifulSoup
import json

rating_lower_bound = [[400, '茶'], [800, '緑'], [1200, '水'], [1600, '青']]
data = {}

for lower_rating, color in rating_lower_bound:
    # スクレイピング対象のURL
    url = f"https://atcoder.jp/ranking?f.RatingLowerBound={lower_rating}&f.RatingUpperBound={lower_rating + 399}&contestType=algo"  # ←ここをスクレイピングしたいURLに置き換えてください

    # リクエストを送信
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/115.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)

    ids = []

    # ステータスコード確認
    if response.status_code == 200:
        # BeautifulSoupでHTML解析
        soup = BeautifulSoup(response.text, "html.parser")
        
        table = soup.find('table', class_='table table-bordered table-striped th-center')
        tbody = table.find('tbody')
        for tr in tbody.find_all('tr'):
            a = tr.find('a', class_='username')
            username = a.find('span').get_text()
            ids.append(username)
    else:
        print(f"ページ取得失敗: {response.status_code}")

    data[color] = ids

with open("public/data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)