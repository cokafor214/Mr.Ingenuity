#!/usr/bin/env python3
import os, urllib.request, json
repo = os.getenv("GITHUB_REPOSITORY", "cokafor214/Mr.Ingenuity")
url = f"https://api.github.com/repos/{repo}"
req = urllib.request.Request(url, headers={"User-Agent":"python-urllib"})
resp = urllib.request.urlopen(req); data = json.load(resp)
print(json.dumps(data, indent=2))
